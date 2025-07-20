'use client';

import React from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';

interface Course {
  title: string;
  level: string;
  lessons: number;
  description: string;
}

export const LessonsSection: React.FC = () => {
  const courses: Course[] = [
    {
      title: 'Базовая грамматика',
      level: 'Начинающий',
      lessons: 12,
      description: 'Основы английской грамматики для начинающих'
    },
    {
      title: 'Разговорная практика',
      level: 'Средний',
      lessons: 20,
      description: 'Практика разговорной речи в реальных ситуациях'
    },
    {
      title: 'Бизнес английский',
      level: 'Продвинутый',
      lessons: 15,
      description: 'Специализированный курс для бизнес-коммуникации'
    },
    {
      title: 'Произношение',
      level: 'Все уровни',
      lessons: 18,
      description: 'Улучшение произношения и интонации'
    },
    {
      title: 'Словарный запас',
      level: 'Средний',
      lessons: 25,
      description: 'Расширение активного словарного запаса'
    },
    {
      title: 'Подготовка к экзаменам',
      level: 'Продвинутый',
      lessons: 30,
      description: 'Подготовка к IELTS, TOEFL и другим экзаменам'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Начинающий':
        return 'bg-green-100 text-green-800';
      case 'Средний':
        return 'bg-blue-100 text-blue-800';
      case 'Продвинутый':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCourseClick = (course: Course) => {
    alert(`Вы выбрали курс: ${course.title}\nУровень: ${course.level}\nКоличество уроков: ${course.lessons}`);
  };

  return (
    <section id="lessons" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Выберите свой курс
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Разнообразные курсы для всех уровней подготовки. 
            Начните с основ или углубите свои знания в специализированных программах.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              onClick={() => handleCourseClick(course)}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm">
                {course.description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <span className="text-sm text-gray-500">
                  {course.lessons} уроков
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <AnimatedButton
            variant="primary"
            size="lg"
            icon={BookOpen}
            onClick={() => alert('Переход к полному каталогу курсов')}
          >
            Все курсы
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}; 