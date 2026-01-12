
import React from 'react';
import { WalletState } from '../types';
import { Wallet, ChevronDown, Menu, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  wallet: WalletState;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onConnectClick: () => void;
  onDisconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({ wallet, theme, onToggleTheme, onConnectClick, onDisconnect }) => {
  return (
    <header className={`border-b backdrop-blur-md sticky top-0 z-50 transition-colors ${theme === 'dark' ? 'border-gray-800/50 bg-black/20 text-white' : 'border-slate-200 bg-white/80 text-slate-900 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer">
            {/* Using the mascot logo provided */}
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png" 
              alt="Zhash Logo" 
              className="w-full h-full object-contain bg-yellow-200 p-1"
              onError={(e) => {
                // Fallback to text if img fails
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter italic">ZHASH</h1>
            <p className="text-[10px] text-purple-500 font-mono font-bold tracking-widest uppercase">Encrypted Privacy</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-yellow-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {wallet.isConnected ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className={`text-xs font-mono font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>fhEVM Zama</span>
                <span className="text-[10px] text-gray-500">Connected</span>
              </div>
              <button 
                onClick={onDisconnect}
                className={`glass-card px-4 py-2 rounded-xl flex items-center gap-2 border transition-all group ${theme === 'dark' ? 'border-gray-700 hover:border-red-500/50' : 'border-slate-200 bg-white hover:border-red-500/50 shadow-sm'}`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-mono">{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span>
                <ChevronDown size={14} className="text-gray-500 group-hover:text-red-400" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onConnectClick}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-xl active:scale-95 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              <Wallet size={18} />
              Connect Wallet
            </button>
          )}
          
          <button className="lg:hidden p-2 text-gray-400">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
