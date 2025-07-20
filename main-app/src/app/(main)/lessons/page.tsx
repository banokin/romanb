'use client';

import React, { useState } from 'react';
import { BookOpen, Play, Clock, Star, ChevronRight, Filter } from 'lucide-react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';
import { AnimatedButton } from '@/components/ui/animated-button';

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  lessons: number;
  rating: number;
  completed: boolean;
  progress: number;
  category: string;
}

export default function LessonsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Базовая грамматика',
      description: 'Изучите основы английской грамматики: времена, артикли, предлоги',
      level: 'beginner',
      duration: 45,
      lessons: 12,
      rating: 4.8,
      completed: false,
      progress: 0,
      category: 'grammar'
    },
    {
      id: '2',
      title: 'Разговорная практика',
      description: 'Практикуйте разговорную речь в реальных ситуациях',
      level: 'intermediate',
      duration: 60,
      lessons: 20,
      rating: 4.9,
      completed: false,
      progress: 25,
      category: 'conversation'
    },
    {
      id: '3',
      title: 'Бизнес английский',
      description: 'Специализированный курс для бизнес-коммуникации',
      level: 'advanced',
      duration: 90,
      lessons: 15,
      rating: 4.7,
      completed: false,
      progress: 0,
      category: 'business'
    },
    {
      id: '4',
      title: 'Произношение',
      description: 'Улучшите произношение и интонацию',
      level: 'beginner',
      duration: 30,
      lessons: 18,
      rating: 4.6,
      completed: true,
      progress: 100,
      category: 'pronunciation'
    },
    {
      id: '5',
      title: 'Словарный запас',
      description: 'Расширьте активный словарный запас',
      level: 'intermediate',
      duration: 40,
      lessons: 25,
      rating: 4.8,
      completed: false,
      progress: 60,
      category: 'vocabulary'
    },
    {
      id: '6',
      title: 'Подготовка к экзаменам',
      description: 'Подготовка к IELTS, TOEFL и другим экзаменам',
      level: 'advanced',
      duration: 120,
      lessons: 30,
      rating: 4.9,
      completed: false,
      progress: 0,
      category: 'exam'
    }
  ];

  const levels = [
    { id: 'all', label: 'Все уровни', color: 'bg-gray-100 text-gray-800' },
    { id: 'beginner', label: 'Начинающий', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', label: 'Средний', color: 'bg-blue-100 text-blue-800' },
    { id: 'advanced', label: 'Продвинутый', color: 'bg-purple-100 text-purple-800' }
  ];

  const categories = [
    { id: 'all', label: 'Все категории' },
    { id: 'grammar', label: 'Грамматика' },
    { id: 'conversation', label: 'Разговорная речь' },
    { id: 'business', label: 'Бизнес' },
    { id: 'pronunciation', label: 'Произношение' },
    { id: 'vocabulary', label: 'Словарный запас' },
    { id: 'exam', label: 'Экзамены' }
  ];

  const filteredLessons = lessons.filter(lesson => {
    const levelMatch = selectedLevel === 'all' || lesson.level === selectedLevel;
    const categoryMatch = selectedCategory === 'all' || lesson.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const handleLessonClick = (lesson: Lesson) => {
    alert(`Начинаем урок: ${lesson.title}\n\nВ продакшене здесь будет переход к интерактивному уроку с Freddy.`);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <FreddyAvatar size="lg" isActive />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Уроки английского</h1>
              <p className="text-gray-600">Выберите курс и начните обучение с Freddy</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Фильтры:</span>
            </div>
            
            {/* Level filters */}
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedLevel === level.id
                      ? level.color
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
              onClick={() => handleLessonClick(lesson)}
            >
              {/* Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{lesson.rating}</span>
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {lesson.description}
                </p>

                {/* Level Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
                    {lesson.level === 'beginner' ? 'Начинающий' : 
                     lesson.level === 'intermediate' ? 'Средний' : 'Продвинутый'}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{lesson.duration} мин</span>
                  </div>
                </div>

                {/* Progress */}
                {lesson.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Прогресс</span>
                      <span>{lesson.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {lesson.lessons} уроков
                  </span>
                  <div className="flex items-center space-x-2">
                    {lesson.completed ? (
                      <span className="text-green-600 text-sm font-medium">Завершен</span>
                    ) : (
                      <AnimatedButton
                        variant="primary"
                        size="sm"
                        icon={Play}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        Начать
                      </AnimatedButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Уроки не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить фильтры</p>
          </div>
        )}
      </div>
    </div>
  );
}