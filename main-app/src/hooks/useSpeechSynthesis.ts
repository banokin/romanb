'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { SpeechOptions } from '@/types/speech'

export function useSpeechSynthesis() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [error, setError] = useState<string | null>(null)

  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Check support and initialize
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true)
      synthRef.current = window.speechSynthesis
      
      // Load voices
      const loadVoices = () => {
        const availableVoices = synthRef.current?.getVoices() || []
        setVoices(availableVoices)
      }

      // Voices might load asynchronously
      loadVoices()
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = loadVoices
      }
    }
  }, [])

  // Monitor speaking state
  useEffect(() => {
    if (!synthRef.current) return

    const checkSpeaking = () => {
      if (synthRef.current) {
        setIsPlaying(synthRef.current.speaking && !synthRef.current.paused)
        setIsPaused(synthRef.current.paused)
      }
    }

    const interval = setInterval(checkSpeaking, 100)
    return () => clearInterval(interval)
  }, [])

  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    if (!synthRef.current || !isSupported) {
      options.onError?.('Speech synthesis is not supported')
      return
    }

    if (!text.trim()) {
      options.onError?.('No text provided to speak')
      return
    }

    // Stop any current speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel()
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text)
      utteranceRef.current = utterance

      // Set voice
      if (options.voice) {
        utterance.voice = options.voice
      } else if (voices.length > 0) {
        // Try to find an English voice
        const englishVoice = voices.find(voice => 
          voice.lang.includes('en') && voice.localService
        ) || voices.find(voice => voice.lang.includes('en'))
        
        if (englishVoice) {
          utterance.voice = englishVoice
        }
      }

      // Set speech parameters
      utterance.rate = options.rate || 1
      utterance.pitch = options.pitch || 1
      utterance.volume = options.volume || 1

      // Event handlers
      utterance.onstart = () => {
        setIsPlaying(true)
        setIsPaused(false)
        setError(null)
        options.onStart?.()
      }

      utterance.onend = () => {
        setIsPlaying(false)
        setIsPaused(false)
        options.onEnd?.()
      }

      utterance.onerror = (event) => {
        setIsPlaying(false)
        setIsPaused(false)
        const errorMessage = 'Speech synthesis failed'
        setError(errorMessage)
        options.onError?.(errorMessage)
      }

      utterance.onpause = () => {
        setIsPaused(true)
        options.onPause?.()
      }

      utterance.onresume = () => {
        setIsPaused(false)
        options.onResume?.()
      }

      // Start speaking
      synthRef.current.speak(utterance)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start speech synthesis'
      setError(errorMessage)
      options.onError?.(errorMessage)
    }
  }, [isSupported, voices])

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsPlaying(false)
      setIsPaused(false)
    }
  }, [])

  const pause = useCallback(() => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.pause()
      setIsPaused(true)
    }
  }, [])

  const resume = useCallback(() => {
    if (synthRef.current && synthRef.current.paused) {
      synthRef.current.resume()
      setIsPaused(false)
    }
  }, [])

  return {
    speak,
    stop,
    pause,
    resume,
    isPlaying,
    isPaused,
    isSupported,
    voices,
    error,
  }
}