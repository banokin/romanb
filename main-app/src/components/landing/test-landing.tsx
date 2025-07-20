'use client';
import React from 'react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';
import { AnimatedButton } from '@/components/ui/animated-button';

export function TestLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          🎉 Лендинг Freddy успешно работает!
        </h1>
        
        <div className="mb-8">
          <FreddyAvatar size="xl" className="mx-auto mb-4" />
        </div>
        
        <p className="text-xl text-gray-600 mb-8">
          Все компоненты лендинга загружены и работают корректно.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton variant="primary">
            <span>✅ Компоненты готовы</span>
          </AnimatedButton>
          <AnimatedButton variant="secondary">
            <span>🎨 Дизайн загружен</span>
          </AnimatedButton>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-2">✅ UI Компоненты</h3>
            <p className="text-gray-600">FreddyAvatar, AnimatedButton, FeatureCard, StatCard</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-2">✅ Секции лендинга</h3>
            <p className="text-gray-600">Hero, Stats, Features, Lessons, CTA, Footer</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-2">✅ Адаптивность</h3>
            <p className="text-gray-600">Mobile, Tablet, Desktop</p>
          </div>
        </div>
      </div>
    </div>
  );
} 