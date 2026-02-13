import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { portfolioContext, systemPrompt } from '@/lib/portfolioContext'
import { generateLocalResponse } from '@/lib/localAI'

const hasGoogleAI = !!process.env.GOOGLE_AI_API_KEY
const genAI = hasGoogleAI ? new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!) : null

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const lastUserMessage = messages[messages.length - 1]?.content || ''

    if (!hasGoogleAI || !genAI) {
      const localResponse = generateLocalResponse(lastUserMessage)
      return NextResponse.json({ message: localResponse })
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
      
      const conversationHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => 
          `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join('\n')

      const fullPrompt = `${systemPrompt}\n\nPortfolio Information:\n${portfolioContext}\n\n${conversationHistory ? `Previous conversation:\n${conversationHistory}\n\n` : ''}User: ${lastUserMessage}\n\nAssistant:`

      const result = await model.generateContent(fullPrompt)
      const response = await result.response
      const assistantMessage = response.text() || generateLocalResponse(lastUserMessage)

      return NextResponse.json({ message: assistantMessage })
    } catch (googleError) {
      const errorMessage = googleError instanceof Error ? googleError.message : 'Unknown error'
      console.warn('Google AI unavailable, using local fallback:', errorMessage)
      const localResponse = generateLocalResponse(lastUserMessage)
      return NextResponse.json({ message: localResponse })
    }
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { message: "I'm having trouble responding right now. Please try again later." },
      { status: 500 }
    )
  }
}
