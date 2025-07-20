'use client';

import React, { useState } from 'react';
import { Play, Menu, X } from 'lucide-react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';
import { AnimatedButton } from '@/components/ui/animated-button';

export function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleStartLearning = () => {
    alert('Переход на страницу чата /chat');
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <FreddyAvatar size="md" isActive={true} />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Freddy English</h1>
              <p className="text-xs text-gray-600">AI-репетитор</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Возможности
            </button>
            <button 
              onClick={() => scrollToSection('lessons')} 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Уроки
            </button>
            <button 
              onClick={() => scrollToSection('stats')} 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Результаты
            </button>
            <AnimatedButton onClick={handleStartLearning}>
              <Play size={16} />
              <span>Начать обучение</span>
            </AnimatedButton>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <button 
              onClick={() => scrollToSection('features')} 
              className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              Возможности
            </button>
            <button 
              onClick={() => scrollToSection('lessons')} 
              className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              Уроки
            </button>
            <button 
              onClick={() => scrollToSection('stats')} 
              className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              Результаты
            </button>
            <div className="pt-2">
              <AnimatedButton onClick={handleStartLearning} className="w-full justify-center">
                <Play size={16} />
                <span>Начать обучение</span>
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 