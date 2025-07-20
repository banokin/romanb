'use client'

import { Button } from '@/components/ui/button'
import { MicOff, Square } from 'lucide-react'

interface RecordingIndicatorProps {
  onStopRecording: () => void
  recordingDuration?: number
  className?: string
}

export function RecordingIndicator({ 
  onStopRecording, 
  recordingDuration = 0,
  className 
}: RecordingIndicatorProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`freddy-recording-banner ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-freddy-sm">
          <div className="freddy-recording-dot" />
          <span className="freddy-text-sm font-freddy-medium text-freddy-text-primary">
            Запись голоса
          </span>
          {recordingDuration > 0 && (
            <span className="freddy-text-xs text-freddy-text-secondary">
              {formatDuration(recordingDuration)}
            </span>
          )}
        </div>
        
        <Button
          onClick={onStopRecording}
          className="freddy-button-stop"
          size="sm"
        >
          <Square className="h-3 w-3 mr-1" />
          Остановить
        </Button>
      </div>
    </div>
  )
} 