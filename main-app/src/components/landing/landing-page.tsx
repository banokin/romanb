'use client';

import React from 'react';
import { LandingHeader } from './landing-header';
import { HeroSection } from './sections/hero-section';
import { StatsSection } from './sections/stats-section';
import { FeaturesSection } from './sections/features-section';
import { LessonsSection } from './sections/lessons-section';
import { CTASection } from './sections/cta-section';
import { LandingFooter } from './sections/landing-footer';

export const LandingPage: React.FC = () => {
  const handleStartLearning = () => {
    alert('🚀 Добро пожаловать в Freddy English!\n\nВ демо-версии вы можете:\n• Общаться с AI-репетитором\n• Проходить интерактивные уроки\n• Отслеживать свой прогресс\n\nВ продакшене здесь будет переход к чату с Freddy.');
  };

  const handleViewLessons = () => {
    alert('📚 Каталог уроков Freddy English!\n\nДоступные курсы:\n• Базовая грамматика (12 уроков)\n• Разговорная практика (20 уроков)\n• Бизнес английский (15 уроков)\n• Произношение (18 уроков)\n• Словарный запас (25 уроков)\n• Подготовка к экзаменам (30 уроков)\n\nВ продакшене здесь будет переход к каталогу уроков.');
  };

  const handleContactUs = () => {
    alert('📧 Свяжитесь с нами!\n\nEmail: support@freddyenglish.com\nTelegram: @freddyenglish\n\nМы всегда готовы помочь с любыми вопросами по изучению английского языка.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <LandingHeader onStartLearning={handleStartLearning} />

      {/* Hero Section */}
      <HeroSection
        onStartLearning={handleStartLearning}
        onViewLessons={handleViewLessons}
      />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Lessons Section */}
      <LessonsSection />

      {/* CTA Section */}
      <CTASection
        onStartLearning={handleStartLearning}
        onContactUs={handleContactUs}
      />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}; 