
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransferForm from './components/TransferForm';
import History from './components/History';
import PrivacyAssistant from './components/PrivacyAssistant';
import WalletModal from './components/WalletModal';
import { WalletState } from './types';
import { Shield, Send, Clock, PieChart, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transfer' | 'history'>('dashboard');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const connectWallet = (providerName: string) => {
    setWallet({
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      isConnected: true,
      chainId: 9090 // Zama fhEVM
    });
    setIsWalletModalOpen(false);
  };

  const disconnectWallet = () => {
    setWallet({ address: null, isConnected: false, chainId: null });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col font-sans relative overflow-hidden ${theme === 'dark' ? 'bg-[#030712] text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Background Decor */}
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-opacity duration-1000 ${theme === 'dark' ? 'bg-purple-900/20 opacity-100' : 'bg-purple-300/30 opacity-60'}`}></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-opacity duration-1000 ${theme === 'dark' ? 'bg-blue-900/20 opacity-100' : 'bg-blue-300/30 opacity-60'}`}></div>

      <Header 
        wallet={wallet} 
        theme={theme}
        onToggleTheme={toggleTheme}
        onConnectClick={() => setIsWalletModalOpen(true)} 
        onDisconnect={disconnectWallet} 
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 pb-32 lg:pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {activeTab === 'dashboard' && <><PieChart className="text-purple-500" /> Portfolio Overview</>}
                {activeTab === 'transfer' && <><Send className="text-blue-500" /> Private FHE Transfer</>}
                {activeTab === 'history' && <><Clock className="text-emerald-500" /> Transaction Logs</>}
              </h2>
              <div className={`hidden sm:flex p-1 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                {(['dashboard', 'transfer', 'history'] as const).map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-500 hover:text-purple-500'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'dashboard' && <Dashboard theme={theme} />}
            {activeTab === 'transfer' && <TransferForm wallet={wallet} theme={theme} />}
            {activeTab === 'history' && <History theme={theme} />}
          </div>

          {/* Sidebar Assistant */}
          <div className="lg:col-span-4 space-y-6">
            <PrivacyAssistant theme={theme} />
            
            <div className={`glass-card rounded-2xl p-6 border relative overflow-hidden group transition-all ${theme === 'dark' ? 'border-purple-500/20' : 'border-purple-200 bg-white/50 shadow-lg'}`}>
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Sparkles size={40} className="text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Shield className="text-purple-500" size={20} />
                Zama Protocol
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                You are currently connected to the Zama fhEVM. Every transaction you make is encrypted using <strong>Fully Homomorphic Encryption</strong>. 
              </p>
              <div className={`text-xs font-mono p-3 rounded-lg border ${theme === 'dark' ? 'bg-black/40 border-gray-800 text-purple-300' : 'bg-slate-100 border-slate-200 text-purple-600'}`}>
                // FHE encryption active<br/>
                // Keys verified: TRUE<br/>
                // Network: Zama-fhEVM-9090
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className={`lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] glass-card rounded-2xl border p-2 flex justify-around items-center z-50 shadow-2xl transition-all ${theme === 'dark' ? 'border-white/10' : 'border-slate-200 bg-white/80'}`}>
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>
          <PieChart size={20} />
          <span className="text-[10px] font-bold">Portfolio</span>
        </button>
        <button onClick={() => setActiveTab('transfer')} className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${activeTab === 'transfer' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>
          <Send size={20} />
          <span className="text-[10px] font-bold">Transfer</span>
        </button>
        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${activeTab === 'history' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>
          <Clock size={20} />
          <span className="text-[10px] font-bold">History</span>
        </button>
      </nav>

      <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} onConnect={connectWallet} />
    </div>
  );
};

export default App;
