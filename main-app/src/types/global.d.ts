// Global type declarations

declare global {
  // Speech Recognition
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }

  // Speech Synthesis
  interface Window {
    speechSynthesis: SpeechSynthesis
  }

  // DID API types
  interface DIDTalk {
    id: string
    status: 'created' | 'started' | 'done' | 'error'
    result_url?: string
    error?: string
    created_at?: string
    modified_at?: string
  }

  interface DIDTalkRequest {
    script: {
      type: 'text'
      input: string
      ssml?: boolean
    }
    config: {
      fluent?: boolean
      pad_audio?: number
      stitch?: boolean
    }
    presenter_id: string
    driver?: 'text' | 'audio'
  }

  // Convex types
  interface ConvexError {
    message: string
    code?: string
    data?: any
  }

  // Environment variables
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CONVEX_URL: string
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
      CLERK_SECRET_KEY: string
      OPENAI_API_KEY: string
      DID_API_KEY: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}