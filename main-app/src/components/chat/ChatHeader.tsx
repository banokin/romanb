'use client'

import { useState } from 'react'
import { Mic, MicOff, Settings, Volume2, VolumeX } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ChatHeaderProps {
  isVoiceEnabled: boolean
  onVoiceToggle: () => void
  onSettingsClick: () => void
}

export function ChatHeader({ 
  isVoiceEnabled, 
  onVoiceToggle, 
  onSettingsClick 
}: ChatHeaderProps) {
  const [isMuted, setIsMuted] = useState(false)

  return (
    <header className="header-beautiful">
      <div className="container-beautiful">
        <div className="flex items-center justify-between py-4">
          {/* Left side - Freddy info */}
          <div className="flex items-center space-x-4">
            {/* Freddy Avatar */}
            <div className="relative">
              <div className="avatar-freddy">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1">
                <div className="status-online"></div>
              </div>
            </div>

            {/* Freddy info */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gradient font-display">
                Freddy English Tutor
              </h1>
              <p className="text-gray-600 font-medium">
                AI-powered English learning assistant
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="status-online"></div>
                <span className="text-sm font-medium text-success-600">Онлайн</span>
              </div>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center space-x-3">
            {/* Voice toggle button */}
            <Button
              onClick={onVoiceToggle}
              variant="ghost"
              size="icon"
              className={`btn-icon ${
                isVoiceEnabled 
                  ? 'text-freddy-600 hover:text-freddy-700 hover:bg-freddy-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title={isVoiceEnabled ? 'Отключить голос' : 'Включить голос'}
            >
              {isVoiceEnabled ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>

            {/* Mute/Unmute button */}
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="ghost"
              size="icon"
              className={`btn-icon ${
                isMuted 
                  ? 'text-error-600 hover:text-error-700 hover:bg-error-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title={isMuted ? 'Включить звук' : 'Отключить звук'}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>

            {/* Settings button */}
            <Button
              onClick={onSettingsClick}
              variant="ghost"
              size="icon"
              className="btn-icon text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              title="Настройки"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}