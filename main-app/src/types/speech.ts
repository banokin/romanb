// Speech Recognition Types
// Note: Global declarations moved to global.d.ts to avoid conflicts

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

export interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

export interface SpeechRecognitionResult {
  isFinal: boolean
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
}

export interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

// Speech Recognition Options (used in hooks)
export interface SpeechRecognitionOptions {
  continuous?: boolean
  interimResults?: boolean
  language?: string
  maxAlternatives?: number
}

// Speech Synthesis Options (used in hooks)
export interface SpeechOptions {
  voice?: SpeechSynthesisVoice
  rate?: number
  pitch?: number
  volume?: number
  onStart?: () => void
  onEnd?: () => void
  onError?: (error: string) => void
  onPause?: () => void
  onResume?: () => void
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  serviceURI: string
  
  start(): void
  stop(): void
  abort(): void
  
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
}

export interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
  prototype: SpeechRecognition
}

// Speech Synthesis Types
export interface SpeechSynthesisVoice {
  voiceURI: string
  name: string
  lang: string
  localService: boolean
  default: boolean
}

export interface SpeechSynthesisUtterance extends EventTarget {
  text: string
  lang: string
  voice: SpeechSynthesisVoice | null
  volume: number
  rate: number
  pitch: number
  
  onstart: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
  onend: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
  onerror: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
  onpause: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
  onresume: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
  onmark: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
  onboundary: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null
}

export interface SpeechSynthesis extends EventTarget {
  speaking: boolean
  pending: boolean
  paused: boolean
  
  speak(utterance: SpeechSynthesisUtterance): void
  cancel(): void
  pause(): void
  resume(): void
  getVoices(): SpeechSynthesisVoice[]
  
  onvoiceschanged: ((this: SpeechSynthesis, ev: Event) => any) | null
}

// Voice Chat Types
export interface VoiceChatSettings {
  autoSpeak?: boolean
  language?: string
  voice?: string
  rate?: number
  pitch?: number
  volume?: number
}

export interface VoiceChatState {
  isListening: boolean
  isPlaying: boolean
  transcript: string
  isInitialized: boolean
  isSupported: boolean
  error: string | null
  voices: SpeechSynthesisVoice[]
}

export interface VoiceChatActions {
  startListening: () => void
  stopListening: () => void
  speak: (text: string, options?: {
    onStart?: () => void
    onEnd?: () => void
    onError?: (error: string) => void
  }) => void
  stopSpeaking: () => void
  clearTranscript: () => void
}

export interface VoiceChatUtils {
  canListen: boolean
  canSpeak: boolean
  isBusy: boolean
}

export type VoiceChatHook = VoiceChatState & VoiceChatActions & VoiceChatUtils 