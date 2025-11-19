import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
      <p>© {new Date().getFullYear()} مولد البريد الإلكتروني الذكي. جميع الحقوق محفوظة.</p>
    </footer>
  );
};