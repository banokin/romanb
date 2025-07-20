'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false 
}: AnimatedButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  let buttonClasses = `${sizeClasses[size]} rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`;
  
  // Добавляем стили вариантов
  if (variant === 'primary') {
    buttonClasses += ' bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl border-0';
  } else if (variant === 'secondary') {
    buttonClasses += ' bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-md';
  } else if (variant === 'ghost') {
    buttonClasses += ' text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-2 border-white border-opacity-30';
  }
  
  buttonClasses += ` ${className}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      <span>{children}</span>
    </button>
  );
} 