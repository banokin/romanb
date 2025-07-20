'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  className?: string;
}

export function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  className = '' 
}: StatCardProps) {
  return (
    <div className={`text-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 ${className}`}>
      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-blue-600 font-medium">{label}</div>
    </div>
  );
} 