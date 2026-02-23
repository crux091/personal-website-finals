import 'reflect-metadata'
import { NextRequest, NextResponse } from 'next/server'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/nest/app.module'
import { GuestbookService } from '@/nest/guestbook/guestbook.service'

// Cache the service across warm serverless invocations
let guestbookService: GuestbookService | undefined

async function getService(): Promise<GuestbookService> {
  if (!guestbookService) {
    const app = await NestFactory.createApplicationContext(AppModule, { logger: false })
    guestbookService = app.get(GuestbookService)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return guestbookService!
}

/**
 * GET /api/guestbook
 * Nest.js GuestbookService fetches comments from Supabase
 */
export async function GET() {
  try {
    const service = await getService()
    const comments = await service.findAll()
    return NextResponse.json(comments)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch comments'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * POST /api/guestbook
 * Nest.js GuestbookService creates a comment in Supabase
 * Body: { name: string, message: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json()
    const service = await getService()
    const comment = await service.create(name, message)
    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create comment'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
