'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { 
  SpeechRecognitionOptions, 
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent
} from '@/types/speech'

export function useSpeechRecognition(options: SpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [finalTranscript, setFinalTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if speech recognition is supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      setIsSupported(!!SpeechRecognition)
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
      }
    }
  }, [])

  // Setup speech recognition
  useEffect(() => {
    if (!recognitionRef.current) return

    const recognition = recognitionRef.current

    // Configure recognition options
    recognition.continuous = options.continuous ?? true
    recognition.interimResults = options.interimResults ?? true
    recognition.lang = options.language || 'en-US'
    recognition.maxAlternatives = options.maxAlternatives || 1

    // Handle results
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = ''
      let final = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const text = result[0].transcript

        if (result.isFinal) {
          final += text
        } else {
          interim += text
        }
      }

      setInterimTranscript(interim)
      
      if (final) {
        setFinalTranscript(prev => prev + final)
        setTranscript(prev => prev + final)
        
        // Reset interim transcript when we get final results
        setInterimTranscript('')
      }

      // Auto-stop after silence (for non-continuous mode)
      if (!options.continuous && final) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          recognition.stop()
        }, 1000)
      }
    }

    // Handle start
    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    // Handle end
    recognition.onend = () => {
      setIsListening(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    // Handle errors
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error)
      setIsListening(false)
      
      // Auto-restart on network errors (if continuous)
      if (event.error === 'network' && options.continuous && isListening) {
        setTimeout(() => {
          if (recognitionRef.current && !isListening) {
            try {
              recognitionRef.current.start()
            } catch (err) {
              console.warn('Failed to restart speech recognition:', err)
            }
          }
        }, 1000)
      }
    }

    // Handle no speech detected
    recognition.onnomatch = () => {
      setError('No speech was detected')
    }

    // Handle audio start/end
    recognition.onaudiostart = () => {
      setError(null)
    }

    recognition.onaudioend = () => {
      // Audio input has ended
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [options.continuous, options.interimResults, options.language, options.maxAlternatives, isListening])

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) {
      setError('Speech recognition is not supported')
      return
    }

    if (isListening) {
      return // Already listening
    }

    try {
      // Clear previous transcripts
      setTranscript('')
      setInterimTranscript('')
      setFinalTranscript('')
      setError(null)

      recognitionRef.current.start()
    } catch (err) {
      setError('Failed to start speech recognition')
      console.error('Speech recognition error:', err)
    }
  }, [isSupported, isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [isListening])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
    setFinalTranscript('')
  }, [])

  const abortListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }
    setIsListening(false)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isListening])

  return {
    isListening,
    transcript,
    interimTranscript,
    finalTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    abortListening,
    
    // Computed properties
    hasTranscript: transcript.length > 0,
    hasInterimResults: interimTranscript.length > 0,
    
    // Browser capabilities
    browserSupportsSpeechRecognition: isSupported,
  }
}