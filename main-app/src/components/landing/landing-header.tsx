'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';
import { AnimatedButton } from '@/components/ui/animated-button';

interface LandingHeaderProps {
  onStartLearning: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onStartLearning }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'features', label: 'Возможности' },
    { id: 'lessons', label: 'Уроки' },
    { id: 'stats', label: 'Статистика' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center space-x-3">
            <FreddyAvatar size="sm" isActive />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Freddy English
              </h1>
              <p className="text-xs text-gray-500">AI Репетитор</p>
            </div>
          </div>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA кнопка */}
          <div className="hidden md:block">
            <AnimatedButton
              variant="primary"
              size="sm"
              onClick={onStartLearning}
            >
              Начать обучение
            </AnimatedButton>
          </div>

          {/* Мобильное меню кнопка */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4">
                <AnimatedButton
                  variant="primary"
                  size="sm"
                  onClick={onStartLearning}
                  className="w-full"
                >
                  Начать обучение
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}; 