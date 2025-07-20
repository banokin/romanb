export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  status?: 'sending' | 'sent' | 'error'
  sources?: RAGSource[]
  metadata?: {
    grammarCorrections?: string[]
    vocabularySuggestions?: string[]
    pronunciationTips?: string[]
    [key: string]: any
  }
}

export interface RAGSource {
  id: string
  title: string
  url?: string
  content: string
  score: number
  type: 'document' | 'webpage' | 'database'
  metadata?: Record<string, any>
}

export interface ChatSettings {
  voiceEnabled: boolean
  avatarEnabled: boolean
  ragEnabled: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  topics: string[]
  personalityType?: 'encouraging' | 'strict' | 'casual' | 'professional'
  language?: string
  autoSpeak?: boolean
}

export interface Conversation {
  id: string
  title: string
  userId: string
  messages: Message[]
  settings: ChatSettings
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface ChatStats {
  totalMessages: number
  totalConversations: number
  averageResponseTime: number
  mostUsedTopics: string[]
  learningProgress: {
    grammarScore: number
    vocabularyScore: number
    pronunciationScore: number
    overallScore: number
  }
}