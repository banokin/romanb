'use client';

import { useState, useEffect } from 'react';

interface Stats {
  totalDocuments: number;
  totalChunks: number;
  totalTokens: number;
  lastUpdated: string;
  searchQueries: number;
  averageResponseTime: number;
}

export function KnowledgeBaseStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка статистики...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8 text-gray-500">Статистика недоступна</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Статистика базы знаний</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Документы</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalDocuments}</p>
          <p className="text-sm text-gray-500">Всего загружено</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Фрагменты</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalChunks.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Обработано фрагментов</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Токены</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalTokens.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Всего токенов</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Поисковые запросы</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.searchQueries.toLocaleString()}</p>
          <p className="text-sm text-gray-500">За последние 30 дней</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Время ответа</h3>
          <p className="text-3xl font-bold text-red-600">{stats.averageResponseTime}ms</p>
          <p className="text-sm text-gray-500">Среднее время</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Последнее обновление</h3>
          <p className="text-lg font-semibold text-gray-700">
            {new Date(stats.lastUpdated).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(stats.lastUpdated).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Информация о базе знаний</h3>
        <p className="text-blue-700">
          База знаний содержит {stats.totalDocuments} документов, разделенных на {stats.totalChunks.toLocaleString()} фрагментов. 
          Общий объем данных составляет {stats.totalTokens.toLocaleString()} токенов. 
          Система обрабатывает в среднем {stats.searchQueries} поисковых запросов в месяц.
        </p>
      </div>
    </div>
  );
} 