'use client';

import React from 'react';
import { Play, BookOpen } from 'lucide-react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';
import { AnimatedButton } from '@/components/ui/animated-button';

interface HeroSectionProps {
  onStartLearning: () => void;
  onViewLessons: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onViewLessons
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Floating элементы */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-pink-400/20 rounded-full animate-pulse delay-2000" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-cyan-400/20 rounded-full animate-pulse delay-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          {/* Freddy Avatar */}
          <div className="flex justify-center">
            <FreddyAvatar
              size="xl"
              isActive
              isSpeaking
              className="animate-bounce"
            />
          </div>

          {/* Заголовок */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Изучайте английский
              </span>
              <br />
              <span className="text-gray-900">с Freddy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Персональный AI-помощник для изучения английского языка. 
              Практикуйтесь в разговоре, улучшайте грамматику и расширяйте словарный запас.
            </p>
          </div>

          {/* CTA кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton
              variant="primary"
              size="lg"
              icon={Play}
              onClick={onStartLearning}
            >
              Начать обучение
            </AnimatedButton>
            
            <AnimatedButton
              variant="secondary"
              size="lg"
              icon={BookOpen}
              onClick={onViewLessons}
            >
              Уроки
            </AnimatedButton>
          </div>

          {/* Дополнительная информация */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Бесплатный доступ</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>24/7 доступность</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Персональный подход</span>
            </div>
          </div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent" />
    </section>
  );
}; 