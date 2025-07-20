import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { OpenAIService } from '@/lib/openai/service'
import { RAGService } from '@/lib/langchain/rag-service'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { message, conversationId, settings } = body

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Initialize services
    const openaiService = new OpenAIService()
    const ragService = new RAGService()

    let ragContext = ''
    let sources: any[] = []

    // Use RAG if enabled
    if (settings?.ragEnabled) {
      try {
        const ragResults = await ragService.searchKnowledgeBase(message)
        if (ragResults.results.length > 0) {
          ragContext = ragResults.results
            .map(result => result.pageContent)
            .join('\n\n')
          sources = ragResults.results.map(result => ({
            title: result.metadata.title || 'Unknown',
            content: result.pageContent.substring(0, 200) + '...',
            source: result.metadata.source || 'Knowledge Base',
            score: result.metadata.score || 0
          }))
        }
      } catch (error) {
        console.error('RAG search failed:', error)
        // Continue without RAG if it fails
      }
    }

    // Generate AI response
    const systemPrompt = `You are Freddy, an enthusiastic and supportive AI English tutor. Your goal is to help users improve their English through natural conversation, grammar correction, pronunciation guidance, and personalized feedback.

Key characteristics:
- Be encouraging and patient
- Provide constructive feedback on grammar and usage
- Explain concepts clearly with examples
- Adapt your language level to the user's proficiency
- Make learning engaging and fun
- Ask follow-up questions to keep the conversation flowing

User's level: ${settings?.difficulty || 'intermediate'}
Topics of interest: ${settings?.topics?.join(', ') || 'general conversation'}

${ragContext ? `
Relevant context from knowledge base:
${ragContext}

Use this context to provide more accurate and detailed responses when relevant.
` : ''}

Always be helpful, encouraging, and focus on improving the user's English skills.`

    const response = await openaiService.generateChatResponse({
      message,
      systemPrompt,
      conversationId,
      userId,
      settings
    })

    return NextResponse.json({
      message: response.content,
      sources,
      usage: response.usage,
      conversationId
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    status: 'Chat API is running',
    timestamp: new Date().toISOString(),
    userId
  })
}