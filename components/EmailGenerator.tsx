import React, { useState, useEffect, useCallback } from 'react';
import { AtSign, Hash, Copy, Check, RefreshCw, Plus, Trash2, AlertCircle } from 'lucide-react';
import { GeneratedEmail } from '../types';

export const EmailGenerator: React.FC = () => {
  // State
  const [username, setUsername] = useState('');
  const [domain, setDomain] = useState('');
  const [counter, setCounter] = useState<number>(1);
  const [history, setHistory] = useState<GeneratedEmail[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle Username input change (auto-split logic)
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setError(null);

    if (val.includes('@')) {
      const parts = val.split('@');
      setUsername(parts[0]);
      if (parts.length > 1 && parts[1]) {
        setDomain(parts[1]);
      }
    } else {
      setUsername(val);
    }
  };

  // Generate logic
  const generateEmail = useCallback(() => {
    if (!username.trim()) {
      setError('يرجى إدخال اسم المستخدم');
      return;
    }
    if (!domain.trim()) {
      setError('يرجى إدخال النطاق (Domain)');
      return;
    }

    // Clean username of existing plus signs if necessary, to avoid double pluses
    // But users might want existing pluses, so we strictly append +number at the end.
    // Strategy: Append +number to the username provided.
    
    const newEmailString = `${username.trim()}+${counter}@${domain.trim()}`;
    
    const newEntry: GeneratedEmail = {
      id: crypto.randomUUID(),
      fullEmail: newEmailString,
      username: username.trim(),
      counter: counter,
      domain: domain.trim(),
      timestamp: new Date(),
    };

    setHistory(prev => [newEntry, ...prev]);
    setCounter(prev => prev + 1);
    setError(null);
  }, [username, domain, counter]);

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Reset
  const resetAll = () => {
    setUsername('');
    setDomain('');
    setCounter(1);
    setError(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const latestEmail = history.length > 0 ? history[0] : null;

  return (
    <div className="space-y-6">
      
      {/* Input Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">
                البريد الأساسي (اسم المستخدم)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <MailIcon />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="مثال: ahmed أو ahmed@gmail.com"
                  className="block w-full pr-10 pl-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-left dir-ltr placeholder:text-right placeholder:dir-rtl outline-none"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Domain Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">
                النطاق (Domain)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <AtSign size={18} />
                </div>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="مثال: gmail.com"
                  className="block w-full pr-10 pl-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-left dir-ltr placeholder:text-right placeholder:dir-rtl outline-none"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Counter Control */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3 text-slate-600">
              <Hash size={20} className="text-blue-500" />
              <span className="font-medium">رقم التسلسل الحالي:</span>
            </div>
            <div className="flex items-center gap-3">
               <button 
                onClick={() => setCounter(c => Math.max(1, c - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                -
              </button>
              <span className="font-bold text-xl w-12 text-center tabular-nums text-slate-800">
                {counter}
              </span>
              <button 
                onClick={() => setCounter(c => c + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={generateEmail}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.98] transition-all"
            >
              <Plus size={20} strokeWidth={3} />
              <span>توليد العنوان التالي</span>
            </button>
            <button
              onClick={resetAll}
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 py-3.5 px-6 rounded-xl font-bold transition-colors"
            >
              <RefreshCw size={18} />
              <span>تصفير</span>
            </button>
          </div>

        </div>
      </div>

      {/* Latest Result */}
      {latestEmail && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-1 shadow-2xl shadow-slate-400/50">
            <div className="bg-slate-900 rounded-xl p-6 md:p-8 text-center space-y-4">
              <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider uppercase rounded-full border border-emerald-500/20">
                تم التوليد بنجاح
              </span>
              
              <div 
                className="text-2xl md:text-4xl font-mono font-bold text-white break-all selection:bg-blue-500/50"
                dir="ltr"
              >
                {latestEmail.fullEmail}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => copyToClipboard(latestEmail.fullEmail, latestEmail.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                    copiedId === latestEmail.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                      : 'bg-white text-slate-900 hover:bg-blue-50'
                  }`}
                >
                  {copiedId === latestEmail.id ? (
                    <>
                      <Check size={20} strokeWidth={3} />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      <span>نسخ البريد</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History List */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-700">السجل السابق</h3>
            <button 
              onClick={clearHistory}
              className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 px-2 py-1 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 size={12} />
              مسح السجل
            </button>
          </div>
          <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
            {history.map((item) => (
              <div 
                key={item.id} 
                className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-slate-800 text-sm md:text-base font-medium dir-ltr text-left">
                    {item.fullEmail}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    {item.timestamp.toLocaleTimeString('ar-EG')}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(item.fullEmail, item.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    copiedId === item.id 
                      ? 'text-emerald-600 bg-emerald-50' 
                      : 'text-slate-300 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  title="نسخ"
                >
                  {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper icon component to avoid clutter
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);