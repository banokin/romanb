'use client';

import React from 'react';
import { MessageCircle, BookOpen, Target } from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Чат',
      description: 'Общайтесь с Freddy в реальном времени. Задавайте вопросы, практикуйте разговорную речь и получайте мгновенные ответы на любые темы.',
      gradient: 'blue-cyan' as const
    },
    {
      icon: BookOpen,
      title: 'Интерактивные уроки',
      description: 'Изучайте грамматику, лексику и произношение через увлекательные интерактивные уроки, адаптированные под ваш уровень.',
      gradient: 'purple-pink' as const
    },
    {
      icon: Target,
      title: 'Персональный подход',
      description: 'Freddy анализирует ваш прогресс и создает индивидуальную программу обучения, которая поможет достичь ваших целей быстрее.',
      gradient: 'green-blue' as const
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Инновационные технологии для эффективного изучения языка
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Freddy использует передовые AI-технологии, чтобы сделать изучение английского 
            языка увлекательным, эффективным и персонализированным
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 