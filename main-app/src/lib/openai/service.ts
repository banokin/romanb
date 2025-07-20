import OpenAI from 'openai'

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  content: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface ChatRequest {
  message: string
  systemPrompt?: string
  conversationId?: string
  userId?: string
  settings?: any
}

export class OpenAIService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async generateChatResponse(request: ChatRequest): Promise<ChatResponse> {
    const { message, systemPrompt, settings } = request

    const messages: ChatMessage[] = []

    // Add system prompt if provided
    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt
      })
    }

    // Add user message
    messages.push({
      role: 'user',
      content: message
    })

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })

      const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

      return {
        content: response,
        usage: completion.usage
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error('Failed to generate response from OpenAI')
    }
  }

  async generateGrammarCorrection(text: string): Promise<string> {
    const systemPrompt = `You are an English grammar expert. Correct any grammar, spelling, or punctuation errors in the user's text. Provide the corrected version and briefly explain the changes made.`

    const response = await this.generateChatResponse({
      message: text,
      systemPrompt
    })

    return response.content
  }

  async generateVocabularySuggestions(text: string, level: string = 'intermediate'): Promise<string> {
    const systemPrompt = `You are an English vocabulary expert. Analyze the user's text and suggest ${level}-level vocabulary improvements. Provide alternative words or phrases that would make the text more natural and varied.`

    const response = await this.generateChatResponse({
      message: text,
      systemPrompt
    })

    return response.content
  }

  async generatePronunciationGuide(word: string): Promise<string> {
    const systemPrompt = `You are an English pronunciation expert. Provide a clear pronunciation guide for the given word, including phonetic transcription and tips for correct pronunciation.`

    const response = await this.generateChatResponse({
      message: word,
      systemPrompt
    })

    return response.content
  }
}