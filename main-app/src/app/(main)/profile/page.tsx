'use client';

import React, { useState } from 'react';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit, Camera, ChevronRight } from 'lucide-react';
import { FreddyAvatar } from '@/components/ui/freddy-avatar';
import { AnimatedButton } from '@/components/ui/animated-button';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: string;
  joinDate: string;
  totalLessons: number;
  totalTime: number;
  currentStreak: number;
  achievements: number;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'achievements'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Александр Петров',
    email: 'alexander.petrov@example.com',
    avatar: '',
    level: 'Intermediate',
    joinDate: '15 марта 2024',
    totalLessons: 89,
    totalTime: 2840,
    currentStreak: 7,
    achievements: 12
  });

  const settings = [
    {
      id: 'notifications',
      title: 'Уведомления',
      description: 'Настройки уведомлений и напоминаний',
      icon: Bell,
      action: () => alert('Настройки уведомлений')
    },
    {
      id: 'privacy',
      title: 'Конфиденциальность',
      description: 'Управление настройками приватности',
      icon: Shield,
      action: () => alert('Настройки конфиденциальности')
    },
    {
      id: 'help',
      title: 'Помощь и поддержка',
      description: 'FAQ, контакты и документация',
      icon: HelpCircle,
      action: () => alert('Помощь и поддержка')
    }
  ];

  const achievements = [
    { id: 1, title: 'Первые шаги', description: 'Завершите первый урок', earned: true, date: '16 марта 2024', icon: '🎯' },
    { id: 2, title: 'Неделя обучения', description: 'Занимайтесь 7 дней подряд', earned: true, date: '22 марта 2024', icon: '🔥' },
    { id: 3, title: 'Грамматик', description: 'Завершите курс грамматики', earned: true, date: '5 апреля 2024', icon: '📚' },
    { id: 4, title: 'Оратор', description: 'Практикуйте речь 10 часов', earned: false, date: null, icon: '🎤' },
    { id: 5, title: 'Словарный запас', description: 'Изучите 1000 слов', earned: false, date: null, icon: '📖' },
    { id: 6, title: 'Экзаменатор', description: 'Подготовьтесь к экзамену', earned: false, date: null, icon: '📝' }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Профиль обновлен!');
  };

  const handleLogout = () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
      alert('Выход из системы...');
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}ч ${mins}м` : `${mins}м`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <FreddyAvatar size="lg" isActive />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Профиль</h1>
              <p className="text-gray-600">Управляйте своим аккаунтом и настройками</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 mb-8 shadow-lg">
          {[
            { id: 'profile', label: 'Профиль', icon: User },
            { id: 'settings', label: 'Настройки', icon: Settings },
            { id: 'achievements', label: 'Достижения', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg flex-1 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <FreddyAvatar size="xl" isActive />
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-600">{profile.email}</p>
                    <p className="text-sm text-gray-500">Участник с {profile.joinDate}</p>
                  </div>
                </div>
                <AnimatedButton
                  variant="secondary"
                  size="sm"
                  icon={Edit}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Отмена' : 'Редактировать'}
                </AnimatedButton>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      onClick={handleSaveProfile}
                    >
                      Сохранить
                    </AnimatedButton>
                    <AnimatedButton
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                    >
                      Отмена
                    </AnimatedButton>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{profile.totalLessons}</div>
                    <div className="text-sm text-gray-600">Уроков завершено</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{formatTime(profile.totalTime)}</div>
                    <div className="text-sm text-gray-600">Время обучения</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">{profile.currentStreak}</div>
                    <div className="text-sm text-gray-600">Дней подряд</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-600">{profile.achievements}</div>
                    <div className="text-sm text-gray-600">Достижений</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Настройки аккаунта</h2>
              </div>
              <div className="p-6 space-y-4">
                {settings.map((setting) => {
                  const Icon = setting.icon;
                  return (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={setting.action}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-500" />
                        <div>
                          <h3 className="font-medium text-gray-900">{setting.title}</h3>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Аккаунт</h2>
              </div>
              <div className="p-6">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full p-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Выйти из аккаунта</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Достижения</h2>
                <p className="text-gray-600">Ваши достижения в изучении английского языка</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-green-500 mt-1">
                              Получено {achievement.date}
                            </p>
                          )}
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
        )}
      </div>
    </div>
  );
}