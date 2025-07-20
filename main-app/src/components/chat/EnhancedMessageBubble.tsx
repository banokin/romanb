'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Copy, 
  Check, 
  Volume2, 
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  BookOpen,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Message } from '@/types/chat'

interface EnhancedMessageBubbleProps {
  message: Message
  onCopy?: (text: string) => void
  onSpeak?: (text: string) => void
  onFeedback?: (messageId: string, feedback: 'positive' | 'negative') => void
  onReply?: (messageId: string) => void
  onViewSources?: (sources: any[]) => void
  className?: string
  showAvatar?: boolean
  showActions?: boolean
  isPlaying?: boolean
  muted?: boolean
}

export function EnhancedMessageBubble({
  message,
  onCopy,
  onSpeak,
  onFeedback,
  onReply,
  onViewSources,
  className,
  showAvatar = true,
  showActions = true,
  isPlaying = false,
  muted = false
}: EnhancedMessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const [showSources, setShowSources] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      onCopy?.(message.content)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const handleSpeak = () => {
    onSpeak?.(message.content)
  }

  const handleFeedback = (feedback: 'positive' | 'negative') => {
    onFeedback?.(message.id, feedback)
  }

  const handleReply = () => {
    onReply?.(message.id)
  }

  const handleViewSources = () => {
    if (message.sources && message.sources.length > 0) {
      setShowSources(!showSources)
      onViewSources?.(message.sources)
    }
  }

  const isUser = message.role === 'user'

  return (
    <div className={cn(
      'flex gap-3 mb-4',
      isUser ? 'flex-row-reverse' : 'flex-row',
      className
    )}>
      {/* Avatar */}
      {showAvatar && (
        <Avatar className={cn(
          'w-8 h-8 flex-shrink-0',
          isUser ? 'order-2' : 'order-1'
        )}>
          {isUser ? (
            <>
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                U
              </AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/images/freddy-avatar.jpg" alt="Freddy" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-xs">
                F
              </AvatarFallback>
            </>
          )}
        </Avatar>
      )}

      {/* Message Content */}
      <div className={cn(
        'flex-1 max-w-[80%]',
        isUser ? 'order-1' : 'order-2'
      )}>
        <Card className={cn(
          'p-4',
          isUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-white dark:bg-gray-800 border'
        )}>
          {/* Message Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {isUser ? 'You' : 'Freddy'}
              </span>
              <Badge 
                variant="secondary" 
                className={cn(
                  'text-xs',
                  isUser ? 'bg-blue-400 text-white' : 'bg-gray-100 text-gray-700'
                )}
              >
                {message.role}
              </Badge>
              {message.timestamp && (
                <span className={cn(
                  'text-xs',
                  isUser ? 'text-blue-100' : 'text-gray-500'
                )}>
                  {typeof window !== 'undefined' 
                    ? new Date(message.timestamp).toLocaleTimeString()
                    : new Date(message.timestamp).toISOString()
                  }
                </span>
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="prose prose-sm max-w-none">
            <p className={cn(
              'whitespace-pre-wrap',
              isUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'
            )}>
              {message.content}
            </p>
          </div>

          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className={cn(
                  'text-xs font-medium',
                  isUser ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
                )}>
                  Sources ({message.sources.length})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleViewSources}
                  className={cn(
                    'h-6 px-2 text-xs',
                    isUser ? 'text-blue-100 hover:bg-blue-400' : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  {showSources ? 'Hide' : 'View'}
                </Button>
              </div>
              
              {showSources && (
                <div className="mt-2 space-y-2">
                  {message.sources.map((source, index) => (
                    <div 
                      key={index}
                      className={cn(
                        'p-2 rounded text-xs',
                        isUser ? 'bg-blue-400/20' : 'bg-gray-100 dark:bg-gray-700'
                      )}
                    >
                      <div className="font-medium">{source.title}</div>
                      <div className="text-gray-600 dark:text-gray-400 truncate">
                        {source.url}
                      </div>
                      <div className="text-gray-500 dark:text-gray-500 mt-1">
                        {source.snippet}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {showActions && (
            <div className={cn(
              'flex items-center gap-1 mt-3 pt-3 border-t',
              isUser ? 'border-blue-400' : 'border-gray-200 dark:border-gray-700'
            )}>
              {/* Copy */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={cn(
                  'h-6 px-2 text-xs',
                  isUser ? 'text-blue-100 hover:bg-blue-400' : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {copied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>

              {/* Speak (only for assistant messages) */}
              {!isUser && onSpeak && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSpeak}
                  className={cn(
                    'h-6 px-2 text-xs',
                    'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {muted ? (
                    <VolumeX className="w-3 h-3" />
                  ) : (
                    <Volume2 className="w-3 h-3" />
                  )}
                </Button>
              )}

              {/* Reply */}
              {onReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReply}
                  className={cn(
                    'h-6 px-2 text-xs',
                    isUser ? 'text-blue-100 hover:bg-blue-400' : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <MessageSquare className="w-3 h-3" />
                </Button>
              )}

              {/* Feedback (only for assistant messages) */}
              {!isUser && onFeedback && (
                <div className="flex gap-1 ml-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeedback('positive')}
                    className="h-6 px-2 text-xs text-green-600 hover:bg-green-100"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeedback('negative')}
                    className="h-6 px-2 text-xs text-red-600 hover:bg-red-100"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
} 