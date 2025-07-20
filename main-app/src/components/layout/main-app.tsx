'use client';

import React from 'react';
import { MainNavigation } from './main-navigation';
import { HeroSection } from './hero-section';

export function MainApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <MainNavigation />
      <HeroSection />
      
      {/* Тестовый элемент для проверки стилей */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-500 text-white p-4 rounded-lg text-center mb-8">
          ✅ Если это красное - Tailwind CSS работает правильно!
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Чат с Freddy</h3>
            <p className="text-gray-600 mb-4">Общайтесь с AI-репетитором в реальном времени</p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
              Начать чат
            </button>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Уроки</h3>
            <p className="text-gray-600 mb-4">Интерактивные уроки по грамматике и лексике</p>
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
              Смотреть уроки
            </button>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Прогресс</h3>
            <p className="text-gray-600 mb-4">Отслеживайте свои достижения в изучении</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
              Посмотреть прогресс
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 