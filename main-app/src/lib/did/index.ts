// DID API utilities and types

export interface DIDTalk {
  id: string
  status: 'created' | 'started' | 'done' | 'error'
  result_url?: string
  error?: string
  created_at?: string
  modified_at?: string
}

export interface DIDTalkRequest {
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
  source_url: string
}

export interface DIDVoice {
  id: string
  name: string
  language: string
  gender: 'male' | 'female'
  provider: string
}

// API functions
export async function createTalk(request: DIDTalkRequest): Promise<DIDTalk> {
  const response = await fetch('/api/did/talks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    throw new Error(`Failed to create talk: ${response.statusText}`)
  }

  return response.json()
}

export async function getTalkStatus(talkId: string): Promise<DIDTalk> {
  const response = await fetch(`/api/did/talks/${talkId}`)
  
  if (!response.ok) {
    throw new Error(`Failed to get talk status: ${response.statusText}`)
  }

  return response.json()
}

export async function deleteTalk(talkId: string): Promise<void> {
  const response = await fetch(`/api/did/talks/${talkId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error(`Failed to delete talk: ${response.statusText}`)
  }
}

export async function getVoices(): Promise<DIDVoice[]> {
  const response = await fetch('/api/did/voices')
  
  if (!response.ok) {
    throw new Error(`Failed to get voices: ${response.statusText}`)
  }

  return response.json()
} 