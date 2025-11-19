import React from 'react';
import { EmailGenerator } from './components/EmailGenerator';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          <EmailGenerator />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;