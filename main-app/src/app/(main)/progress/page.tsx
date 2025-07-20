'use client';

import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, Award, BookOpen, Clock, Star } from 'lucide-react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';
import { AnimatedButton } from '@/components/ui/animated-button';

interface ProgressData {
  totalLessons: number;
  completedLessons: number;
  totalTime: number;
  currentStreak: number;
  longestStreak: number;
  averageScore: number;
  level: string;
  nextLevel: string;
  progressToNextLevel: number;
}

interface WeeklyActivity {
  date: string;
  lessons: number;
  time: number;
  score: number;
}

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const progressData: ProgressData = {
    totalLessons: 156,
    completedLessons: 89,
    totalTime: 2840,
    currentStreak: 7,
    longestStreak: 21,
    averageScore: 87,
    level: 'Intermediate',
    nextLevel: 'Advanced',
    progressToNextLevel: 65
  };

  const weeklyActivity: WeeklyActivity[] = [
    { date: 'Пн', lessons: 3, time: 45, score: 92 },
    { date: 'Вт', lessons: 2, time: 30, score: 88 },
    { date: 'Ср', lessons: 4, time: 60, score: 95 },
    { date: 'Чт', lessons: 1, time: 15, score: 85 },
    { date: 'Пт', lessons: 3, time: 45, score: 90 },
    { date: 'Сб', lessons: 2, time: 30, score: 87 },
    { date: 'Вс', lessons: 0, time: 0, score: 0 }
  ];

  const achievements = [
    { id: 1, title: 'Первые шаги', description: 'Завершите первый урок', earned: true, icon: '🎯' },
    { id: 2, title: 'Неделя обучения', description: 'Занимайтесь 7 дней подряд', earned: true, icon: '🔥' },
    { id: 3, title: 'Грамматик', description: 'Завершите курс грамматики', earned: true, icon: '📚' },
    { id: 4, title: 'Оратор', description: 'Практикуйте речь 10 часов', earned: false, icon: '🎤' },
    { id: 5, title: 'Словарный запас', description: 'Изучите 1000 слов', earned: false, icon: '📖' }
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}ч ${mins}м` : `${mins}м`;
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
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
              <h1 className="text-3xl font-bold text-gray-900">Мой прогресс</h1>
              <p className="text-gray-600">Отслеживайте свои достижения в изучении английского</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Завершенные уроки</p>
                <p className="text-2xl font-bold text-gray-900">{progressData.completedLessons}</p>
                <p className="text-sm text-gray-500">из {progressData.totalLessons}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Общее время</p>
                <p className="text-2xl font-bold text-gray-900">{formatTime(progressData.totalTime)}</p>
                <p className="text-sm text-gray-500">обучения</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Текущая серия</p>
                <p className="text-2xl font-bold text-gray-900">{progressData.currentStreak}</p>
                <p className="text-sm text-gray-500">дней подряд</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Средний балл</p>
                <p className="text-2xl font-bold text-gray-900">{progressData.averageScore}%</p>
                <p className="text-sm text-gray-500">по урокам</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Уровень прогресса</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(progressData.level)}`}>
              {progressData.level}
            </span>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Прогресс до следующего уровня</span>
              <span>{progressData.progressToNextLevel}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressData.progressToNextLevel}%` }}
              />
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            Следующий уровень: <span className="font-medium">{progressData.nextLevel}</span>
          </p>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Активность за неделю</h2>
            <div className="flex space-x-2">
              {(['week', 'month', 'year'] as const).map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period === 'week' ? 'Неделя' : period === 'month' ? 'Месяц' : 'Год'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-600 mb-2">{day.date}</div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="text-lg font-semibold text-gray-900">{day.lessons}</div>
                  <div className="text-xs text-gray-500">уроков</div>
                  {day.time > 0 && (
                    <>
                      <div className="text-sm font-medium text-gray-700 mt-1">{day.time}м</div>
                      <div className="text-xs text-gray-500">время</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900">Достижения</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.earned
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.earned ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}