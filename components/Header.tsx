import React from 'react';
import { Mail, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 flex items-center justify-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/30">
            <Mail size={28} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-900 leading-none">
              مولد البريد الذكي
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              أداة التسلسل التلقائي للعناوين
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
          <Zap size={16} className="fill-blue-600" />
          <span>يدعم Gmail, Outlook, ProtonMail</span>
        </div>
      </div>
    </header>
  );
};