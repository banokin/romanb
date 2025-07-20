'use client';

import React from 'react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Логотип и описание */}
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <FreddyAvatar size="md" isActive />
            <div>
              <h3 className="text-xl font-bold text-white">
                Freddy English
              </h3>
              <p className="text-gray-400 text-sm">
                Персональный AI-репетитор английского языка
              </p>
            </div>
          </div>

          {/* Копирайт */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2024 Freddy English Tutor. Все права защищены.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Создано с ❤️ для изучения английского языка
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}; 