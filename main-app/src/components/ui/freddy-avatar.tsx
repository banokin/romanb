'use client';

import React from 'react';

interface FreddyAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isActive?: boolean;
  isSpeaking?: boolean;
  isListening?: boolean;
}

export function FreddyAvatar({ 
  size = 'md', 
  className = '', 
  isActive = false,
  isSpeaking = false,
  isListening = false 
}: FreddyAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-20 h-20 text-3xl'
  };

  let avatarClasses = `relative ${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${className}`;
  
  // Добавляем градиентный фон
  avatarClasses += ' bg-gradient-to-br from-blue-500 to-purple-600';
  
  // Добавляем состояния
  if (isActive) avatarClasses += ' scale-110';
  if (isSpeaking) avatarClasses += ' animate-pulse';
  if (isListening) avatarClasses += ' ring-4 ring-blue-300 ring-opacity-50';

  return (
    <div className={avatarClasses}>
      <div>F</div>
      {isActive && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
} 