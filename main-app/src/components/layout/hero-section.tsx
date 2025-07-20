'use client';

import React from 'react';
import { Play, BookOpen } from 'lucide-react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';
import { AnimatedButton } from '@/components/ui/animated-button';

export function HeroSection() {
  const handleStartLearning = () => {
    alert('Переход на страницу чата /chat');
  };

  const handleViewLessons = () => {
    alert('Переход на страницу уроков /lessons');
  };

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Аватар */}
          <div className="mb-8">
            <FreddyAvatar size="xl" className="mx-auto mb-6 animate-bounce" isActive={true} />
          </div>
          
          {/* Заголовок с градиентом */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Изучайте английский с{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Freddy
            </span>
          </h1>
          
          {/* Описание */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Персональный AI-помощник для изучения английского языка. 
            Практикуйтесь в разговоре, улучшайте грамматику и расширяйте словарный запас.
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton onClick={handleStartLearning} className="text-lg px-8 py-4">
              <Play size={20} />
              <span>Начать обучение</span>
            </AnimatedButton>
            <AnimatedButton variant="secondary" onClick={handleViewLessons} className="text-lg px-8 py-4">
              <BookOpen size={20} />
              <span>Уроки</span>
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
      </div>
    </section>
  );
} 