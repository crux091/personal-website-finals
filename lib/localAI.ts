// Simple AI response generator using keyword matching
export function generateLocalResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  // Greetings
  if (message.match(/^(hi|hello|hey|greetings|kumusta|kamusta)/)) {
    return "Hello! I'm RAIDA, Rick's AI Digital Assistant. I can tell you about Rick's 2+ years of experience, 4+ projects, tech stack of 15+ technologies, and much more. What would you like to know?"
  }

  // About/Experience
  if (message.includes('about') || message.includes('who') || message.includes('background') || message.includes('sino')) {
    return "Rick Francis Cruz is a Full Stack Developer with 2+ years of experience. He specializes in React, Next.js, TypeScript, and Tailwind CSS. Rick is currently a student at Asia Pacific College and an active member of JISSA, MSC, and JPCS. He focuses on building performant, accessible, and user-centric applications."
  }

  // Skills
  if (message.includes('skill') || message.includes('technolog') || message.includes('stack') || message.includes('tools') || message.includes('ano')) {
    return "Rick's tech stack includes:\n\nFrontend: React 18, Next.js 13, TypeScript 5.5, Tailwind CSS 3.4, Framer Motion\n\nBackend: Node.js, Flask, REST APIs, AI Integration (Google Gemini, OpenAI)\n\nTools: Git, GitHub, VS Code, npm\n\nCore: Performance optimization, accessibility (WCAG), SEO, responsive design\n\nScroll to the Skills section to see everything!"
  }

  // Projects
  if (message.includes('project') || message.includes('work') || message.includes('built') || message.includes('made')) {
    return "Rick has completed 4+ projects:\n\n1. Student Portal - Flask-based management system\n2. Gym Log - Fitness tracking with Python & Tailwind\n3. JYPTIC - Cinema ticketing with React & AI chatbot\n4. This Portfolio - Next.js 13 with animations & AI assistant\n\nAll feature clean UI, modern tech, and are live/on GitHub. Check the Projects section!"
  }

  // Specific project queries
  if (message.includes('student portal') || message.includes('school')) {
    return "Student Portal is a comprehensive management system built with Flask, Python, and SQLAlchemy. It features role-based access, grade management, analytics dashboard, and real-time updates. Live at: https://student-monitor-admin-teacher-portal.onrender.com/"
  }

  if (message.includes('gym') || message.includes('fitness')) {
    return "Gym Log is a fitness tracking app with workout logging, progress visualization, and personal records. Built with Flask, Tailwind CSS, and Chart.js for beautiful data visualization. Check it on GitHub: https://github.com/gelolaus/gymlogv2"
  }

  if (message.includes('jyptic') || message.includes('cinema') || message.includes('ticket')) {
    return "JYPTIC is a modern cinema ticketing system with AI-powered recommendations. Built with React, TypeScript, and Tailwind CSS. Features real-time seat selection and customer support chatbot. Live demo: https://jypsis-cinema-ticketing-system-pi.vercel.app/"
  }

  // Experience/Timeline
  if (message.includes('experience') || message.includes('timeline') || message.includes('career') || message.includes('year')) {
    return "Rick has 2+ years of development experience and is currently a student at Asia Pacific College (2025-Present). He's an active member of JISSA, MSC, and JPCS, focusing on modern web development with React and Next.js. Visit the Experience Timeline to see his journey!"
  }

  // Contact
  if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('hire') || message.includes('linkedin') || message.includes('github')) {
    return "You can reach Rick at:\n\nEmail: kikorickcruz@gmail.com\nLinkedIn: linkedin.com/in/rick-francis-cruz\nGitHub: github.com/crux091\n\nOr scroll to the Contact section to send a message directly!"
  }

  // Gallery
  if (message.includes('gallery') || message.includes('photo') || message.includes('image')) {
    return "The Gallery section showcases visual highlights from Rick's work and experiences. Scroll down to check it out!"
  }

  // This portfolio
  if (message.includes('this site') || message.includes('this website') || message.includes('this portfolio')) {
    return "This portfolio is built with Next.js 13 App Router, TypeScript, Tailwind CSS, and Framer Motion. It features smooth animations, comprehensive SEO, AI chat assistant (that's me!), and is fully responsive. The code is on GitHub: https://github.com/crux091/Portfolio"
  }

  // React/Next.js specific
  if (message.includes('react') || message.includes('next')) {
    return "Rick is highly proficient in React 18 and Next.js 13, building modern web apps with server-side rendering, optimal performance, and excellent SEO. This portfolio itself is built with Next.js App Router!"
  }

  // AI/RAIDA
  if (message.includes('you') || message.includes('raida') || message.includes('ai') || message.includes('chatbot')) {
    return "I'm RAIDA (Rick's AI Digital Assistant), powered by Google's Gemini 2.5 Flash model with a local fallback system. I'm here to answer your questions about Rick's portfolio, experience, skills, and projects. I can respond in both English and Filipino!"
  }

  // Default response with suggestions
  return "I can help you learn about Rick's portfolio! Try asking:\n\n• What projects has Rick built?\n• What are Rick's technical skills?\n• How can I contact Rick?\n• Tell me about Rick's experience\n\nWhat would you like to know?"
}

// Suggested questions for users
export const suggestedQuestions = [
  "What projects has Rick built?",
  "What are Rick's technical skills?",
  "Tell me about Rick's experience",
  "How can I contact Rick?"
]
