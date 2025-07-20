'use client'

import { useState, useCallback } from 'react'

export interface DIDAvatarSettings {
  presenterId?: string
  voiceId?: string
  backgroundUrl?: string
  driver?: 'text' | 'audio'
}

export function useDIDAvatar(settings: DIDAvatarSettings = {}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isTalking, setIsTalking] = useState(false)

  const startTalk = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError('No text provided for avatar')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/did/talks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script: {
            type: 'text',
            input: text,
            ssml: false
          },
          config: {
            fluent: true,
            pad_audio: 0.5,
            stitch: true
          },
          source_url: settings.backgroundUrl || '/images/freddy-avatar.jpg'
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to create talk: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Poll for completion
      const pollInterval = setInterval(async () => {
        const statusResponse = await fetch(`/api/did/talks/${data.id}`)
        const statusData = await statusResponse.json()
        
        if (statusData.status === 'done') {
          clearInterval(pollInterval)
          setAvatarUrl(statusData.result_url)
          setIsTalking(true)
          setIsLoading(false)
          
          // Stop talking after a delay
          setTimeout(() => {
            setIsTalking(false)
          }, 5000)
        } else if (statusData.status === 'error') {
          clearInterval(pollInterval)
          setError('Failed to generate avatar video')
          setIsLoading(false)
        }
      }, 1000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start avatar talk')
      setIsLoading(false)
    }
  }, [settings])

  const stopTalk = useCallback(() => {
    setIsTalking(false)
    setIsLoading(false)
  }, [])

  const reset = useCallback(() => {
    setAvatarUrl(null)
    setIsLoading(false)
    setError(null)
    setIsTalking(false)
  }, [])

  return {
    avatarUrl,
    isLoading,
    error,
    isTalking,
    startTalk,
    stopTalk,
    reset
  }
} 