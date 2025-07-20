'use client';

import React from 'react';
import { Play, Mail } from 'lucide-react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';
import { AnimatedButton } from '@/components/ui/animated-button';

interface CTASectionProps {
  onStartLearning: () => void;
  onContactUs: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onStartLearning,
  onContactUs
}) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Freddy Avatar */}
          <div className="flex justify-center">
            <FreddyAvatar
              size="lg"
              isActive
              isSpeaking
              className="animate-bounce"
            />
          </div>

          {/* Заголовок и описание */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Готовы начать изучение?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам студентов, которые уже улучшили свой английский с Freddy. 
              Начните бесплатно прямо сейчас!
            </p>
          </div>

          {/* CTA кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton
              variant="secondary"
              size="lg"
              icon={Play}
              onClick={onStartLearning}
            >
              Попробовать бесплатно
            </AnimatedButton>
            
            <AnimatedButton
              variant="ghost"
              size="lg"
              icon={Mail}
              onClick={onContactUs}
              className="text-white hover:text-white hover:bg-white/10"
            >
              Связаться с нами
            </AnimatedButton>
          </div>

          {/* Дополнительная информация */}
          <div className="text-blue-100 text-sm">
            <p>✨ Бесплатный доступ • 🚀 Мгновенный старт • 📱 Работает на всех устройствах</p>
          </div>
        </div>
      </div>
    </section>
  );
}; 