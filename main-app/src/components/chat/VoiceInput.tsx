'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'

interface VoiceInputProps {
  onTranscript: (transcript: string) => void
  isListening: boolean
  onStartListening: () => void
  onStopListening: () => void
  disabled?: boolean
  className?: string
}

export function VoiceInput({
  onTranscript,
  isListening,
  onStartListening,
  onStopListening,
  disabled = false,
  className
}: VoiceInputProps) {
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    transcript,
    isListening: speechIsListening,
    startListening,
    stopListening,
    isSupported: speechSupported,
    error: speechError
  } = useSpeechRecognition({
    continuous: true,
    interimResults: true,
    language: 'en-US'
  })

  useEffect(() => {
    setIsSupported(speechSupported)
  }, [speechSupported])

  useEffect(() => {
    setError(speechError)
  }, [speechError])

  useEffect(() => {
    if (transcript && !isListening) {
      onTranscript(transcript)
    }
  }, [transcript, isListening, onTranscript])

  const handleToggleListening = () => {
    if (isListening) {
      stopListening()
      onStopListening()
    } else {
      startListening()
      onStartListening()
    }
  }

  if (!isSupported) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className={className}
        title="Speech recognition not supported in this browser"
      >
        <MicOff className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant={isListening ? "destructive" : "outline"}
        size="sm"
        onClick={handleToggleListening}
        disabled={disabled}
        className={`relative ${isListening ? 'animate-pulse' : ''}`}
      >
        {isListening ? (
          <>
            <Mic className="w-4 h-4" />
            <span className="ml-2 text-xs">Listening...</span>
          </>
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </Button>

      {error && (
        <div className="text-xs text-red-500">
          {error}
        </div>
      )}

      {isListening && transcript && (
        <div className="text-xs text-muted-foreground max-w-xs truncate">
          "{transcript}"
        </div>
      )}
    </div>
  )
}
