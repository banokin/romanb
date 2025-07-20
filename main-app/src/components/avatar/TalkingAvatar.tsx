'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { useDIDAvatar } from '@/hooks/useDIDAvatar'

interface TalkingAvatarProps {
  message?: string
  isPlaying?: boolean
  onPlay?: () => void
  onPause?: () => void
  onStop?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showControls?: boolean
  autoPlay?: boolean
}

export function TalkingAvatar({
  message,
  isPlaying = false,
  onPlay,
  onPause,
  onStop,
  className,
  size = 'md',
  showControls = true,
  autoPlay = false
}: TalkingAvatarProps) {
  const [isLocalPlaying, setIsLocalPlaying] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const {
    avatarUrl,
    isLoading,
    error,
    isTalking,
    startTalk,
    stopTalk,
    reset
  } = useDIDAvatar()

  const isActuallyPlaying = isPlaying || isLocalPlaying || isTalking

  useEffect(() => {
    if (autoPlay && message && !isActuallyPlaying) {
      handlePlay()
    }
  }, [autoPlay, message])

  useEffect(() => {
    if (avatarUrl && videoRef.current) {
      videoRef.current.src = avatarUrl
      videoRef.current.load()
    }
  }, [avatarUrl])

  const handlePlay = async () => {
    if (!message) return

    setIsLocalPlaying(true)
    onPlay?.()

    try {
      await startTalk(message)
    } catch (error) {
      console.error('Failed to start avatar talk:', error)
      setIsLocalPlaying(false)
      onStop?.()
    }
  }

  const handlePause = () => {
    setIsLocalPlaying(false)
    stopTalk()
    onPause?.()
  }

  const handleStop = () => {
    setIsLocalPlaying(false)
    stopTalk()
    reset()
    onStop?.()
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-32 h-32'
      case 'lg':
        return 'w-96 h-96'
      default:
        return 'w-64 h-64'
    }
  }

  const getAvatarSize = () => {
    switch (size) {
      case 'sm':
        return 'h-32 w-32'
      case 'lg':
        return 'h-96 w-96'
      default:
        return 'h-64 w-64'
    }
  }

  return (
    <Card className={`relative overflow-hidden ${getSizeClasses()} ${className}`}>
      <CardContent className="p-0 h-full">
        {/* Avatar Video/Image */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
          {avatarUrl ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop={false}
              muted
              playsInline
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Avatar className={getAvatarSize()}>
                <AvatarImage src="/images/freddy-avatar.jpg" alt="Freddy" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-green-500 text-white">
                  F
                </AvatarFallback>
              </Avatar>
            </div>
          )}

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="flex items-center gap-2 text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-sm">Generating avatar...</span>
              </div>
            </div>
          )}

          {/* Error Overlay */}
          {error && (
            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
              <div className="flex items-center gap-2 text-red-600 bg-white/90 rounded-lg p-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs">Avatar error</span>
              </div>
            </div>
          )}

          {/* Status Badge */}
          {isActuallyPlaying && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" className="animate-pulse">
                <Volume2 className="w-3 h-3 mr-1" />
                Speaking
              </Badge>
            </div>
          )}

          {/* Settings Button */}
          {showControls && (
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Controls */}
        {showControls && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-1 bg-white/90 rounded-lg p-1">
              {!isActuallyPlaying ? (
                <Button
                  size="sm"
                  onClick={handlePlay}
                  disabled={!message || isLoading}
                  className="h-8 w-8 p-0"
                >
                  <Play className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePause}
                  className="h-8 w-8 p-0"
                >
                  <Pause className="w-4 h-4" />
                </Button>
              )}
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleStop}
                disabled={!isActuallyPlaying}
                className="h-8 w-8 p-0"
              >
                <VolumeX className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && showControls && (
          <div className="absolute top-12 right-2 bg-white rounded-lg shadow-lg p-3 min-w-48">
            <h4 className="font-medium text-sm mb-2">Avatar Settings</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge variant={isActuallyPlaying ? "default" : "secondary"} className="text-xs">
                  {isActuallyPlaying ? "Active" : "Idle"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Loading:</span>
                <Badge variant={isLoading ? "default" : "secondary"} className="text-xs">
                  {isLoading ? "Yes" : "No"}
                </Badge>
              </div>
              {error && (
                <div className="text-red-500 text-xs">
                  Error: {error}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}