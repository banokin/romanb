'use client';

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Clock } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';

export const StatsSection: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    improvement: 0,
    availability: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        students: 10000,
        improvement: 95,
        availability: 24
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: Users,
      value: `${(animatedStats.students / 1000).toFixed(1)}K+`,
      label: 'Активных студентов'
    },
    {
      icon: TrendingUp,
      value: `${animatedStats.improvement}%`,
      label: 'Улучшение навыков'
    },
    {
      icon: Clock,
      value: `${animatedStats.availability}/7`,
      label: 'Доступность'
    }
  ];

  return (
    <section id="stats" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Почему выбирают Freddy?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам студентов, которые уже улучшили свой английский с Freddy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 