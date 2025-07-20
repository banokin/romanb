'use client'

import { Check, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'freddy'
  timestamp: Date
  status?: 'sending' | 'sent' | 'delivered' | 'read'
  isTyping?: boolean
}

interface MessageBubbleProps {
  message: Message
  className?: string
}

export function MessageBubble({ message, className }: MessageBubbleProps) {
  const isUser = message.sender === 'user'
  const isTyping = message.isTyping

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <div className="w-3 h-3 border-2 border-gray-300 border-t-freddy-500 rounded-full animate-spin" />
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case 'read':
        return <CheckCheck className="w-3 h-3 text-freddy-500" />
      default:
        return null
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  if (isTyping) {
    return (
      <div className={cn("flex", isUser ? "justify-end" : "justify-start", className)}>
        <div className="message-typing">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start", className)}>
      <div className={cn(
        "relative group",
        isUser ? "message-user" : "message-freddy"
      )}>
        {/* Message content */}
        <div className="relative z-10">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Timestamp and status */}
        <div className={cn(
          "flex items-center justify-end space-x-1 mt-2 text-xs",
          isUser ? "text-white/80" : "text-gray-500"
        )}>
          <span className="font-medium">
            {formatTime(message.timestamp)}
          </span>
          {isUser && getStatusIcon()}
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-200 bg-black" />
      </div>
    </div>
  )
}

// Enhanced message bubble with avatar
export function MessageBubbleWithAvatar({ message, className }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={cn("flex items-end space-x-3", isUser ? "flex-row-reverse space-x-reverse" : "", className)}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="avatar-user">
            <span className="text-white font-semibold text-sm">U</span>
          </div>
        ) : (
          <div className="avatar-freddy">
            <span className="text-white font-bold text-lg">F</span>
          </div>
        )}
      </div>

      {/* Message bubble */}
      <div className="flex-1 max-w-md">
        <MessageBubble message={message} />
      </div>
    </div>
  )
}

// Message group component for multiple messages from the same sender
export function MessageGroup({ messages, className }: { messages: Message[], className?: string }) {
  if (messages.length === 0) return null

  const firstMessage = messages[0]
  const isUser = firstMessage.sender === 'user'

  return (
    <div className={cn("space-y-2", className)}>
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          className={cn(
            index === 0 ? "" : "mt-1",
            index === messages.length - 1 ? "" : "mb-1"
          )}
        />
      ))}
    </div>
  )
}