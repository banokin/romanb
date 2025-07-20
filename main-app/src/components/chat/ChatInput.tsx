'use client'

import { useState, useRef } from 'react'
import { Send, Mic, Paperclip, StopCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onStartRecording: () => void
  onStopRecording: () => void
  isRecording: boolean
  disabled?: boolean
}

export function ChatInput({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  isRecording,
  disabled = false
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleVoiceToggle = () => {
    if (isRecording) {
      onStopRecording()
    } else {
      onStartRecording()
    }
  }

  return (
    <div className="bg-glass backdrop-blur-md border-t border-white/20 p-4">
      <div className="container-beautiful">
        <div className="flex items-center space-x-3">
          {/* Attachment button */}
          <Button
            variant="ghost"
            size="icon"
            className="btn-icon text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            title="Прикрепить файл"
            disabled={disabled}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          {/* Voice button */}
          <Button
            onClick={handleVoiceToggle}
            variant="ghost"
            size="icon"
            className={`btn-icon ${
              isRecording 
                ? 'voice-btn-recording' 
                : 'voice-btn-inactive'
            }`}
            title={isRecording ? 'Остановить запись' : 'Начать запись голоса'}
            disabled={disabled}
          >
            {isRecording ? (
              <StopCircle className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>

          {/* Message input */}
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введите сообщение..."
              className="input-beautiful pr-12"
              disabled={disabled || isRecording}
            />
          </div>

          {/* Send button */}
          <Button
            onClick={handleSend}
            variant="ghost"
            size="icon"
            className={`send-btn ${
              !message.trim() || disabled || isRecording
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={!message.trim() || disabled || isRecording}
            title="Отправить сообщение"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <div className="mt-3 recording-banner">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="recording-dot"></div>
                <span className="font-medium">Запись голоса...</span>
              </div>
              <Button
                onClick={onStopRecording}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-xl"
              >
                Остановить
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
