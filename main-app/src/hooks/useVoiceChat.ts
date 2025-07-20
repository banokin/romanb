'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import type { VoiceChatSettings, SpeechSynthesisVoice } from '@/types/speech'

export function useVoiceChat(settings: VoiceChatSettings = {}) {
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    isListening: speechIsListening,
    transcript: speechTranscript,
    startListening: speechStartListening,
    stopListening: speechStopListening,
    isSupported: speechSupported,
    error: speechError
  } = useSpeechRecognition({
    continuous: true,
    interimResults: true,
    language: settings.language || 'en-US'
  })

  const {
    speak: speechSpeak,
    stop: speechStop,
    isPlaying: speechIsPlaying,
    isSupported: synthesisSupported,
    voices,
    error: synthesisError
  } = useSpeechSynthesis()

  // Update local state based on speech recognition
  useEffect(() => {
    setIsListening(speechIsListening)
    setTranscript(speechTranscript)
  }, [speechIsListening, speechTranscript])

  // Update local state based on speech synthesis
  useEffect(() => {
    setIsPlaying(speechIsPlaying)
  }, [speechIsPlaying])

  // Handle errors
  useEffect(() => {
    if (speechError) {
      setError(`Speech recognition error: ${speechError}`)
    } else if (synthesisError) {
      setError(`Speech synthesis error: ${synthesisError}`)
    } else {
      setError(null)
    }
  }, [speechError, synthesisError])

  // Initialize when both APIs are supported
  useEffect(() => {
    if (speechSupported && synthesisSupported) {
      setIsInitialized(true)
    }
  }, [speechSupported, synthesisSupported])

  const startListening = useCallback(() => {
    if (!speechSupported) {
      setError('Speech recognition is not supported in this browser')
      return
    }
    
    setError(null)
    speechStartListening()
  }, [speechSupported, speechStartListening])

  const stopListening = useCallback(() => {
    speechStopListening()
  }, [speechStopListening])

  const speak = useCallback((text: string, options?: {
    onStart?: () => void
    onEnd?: () => void
    onError?: (error: string) => void
  }) => {
    if (!synthesisSupported) {
      options?.onError?.('Speech synthesis is not supported in this browser')
      return
    }

    if (!text.trim()) {
      options?.onError?.('No text provided to speak')
      return
    }

    // Find the preferred voice
    let selectedVoice: SpeechSynthesisVoice | undefined
    if (settings.voice && voices.length > 0) {
      selectedVoice = voices.find((voice: SpeechSynthesisVoice) => 
        voice.name === settings.voice || voice.lang.includes(settings.language || 'en')
      )
    }

    speechSpeak(text, {
      voice: selectedVoice,
      rate: settings.rate || 1,
      pitch: settings.pitch || 1,
      volume: settings.volume || 1,
      onStart: options?.onStart,
      onEnd: options?.onEnd,
      onError: options?.onError
    })
  }, [synthesisSupported, voices, settings, speechSpeak])

  const stopSpeaking = useCallback(() => {
    speechStop()
  }, [speechStop])

  const clearTranscript = useCallback(() => {
    setTranscript('')
  }, [])

  const isSupported = speechSupported && synthesisSupported

  return {
    // State
    isListening,
    isPlaying,
    transcript,
    isInitialized,
    isSupported,
    error,
    voices,

    // Actions
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    clearTranscript,

    // Utils
    canListen: speechSupported && !isPlaying,
    canSpeak: synthesisSupported && !isListening,
    isBusy: isListening || isPlaying,
  }
}