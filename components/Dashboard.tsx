
import React, { useState, useEffect, useMemo } from 'react';
import { SUPPORTED_TOKENS } from '../constants';
import { TokenInfo } from '../types';
import { balanceService } from '../services/balanceService';
import { Eye, EyeOff, ShieldCheck, Lock, Unlock, Loader2, RefreshCw } from 'lucide-react';

interface DashboardProps {
  theme?: 'dark' | 'light';
}

const Dashboard: React.FC<DashboardProps> = ({ theme = 'dark' }) => {
  const [showValues, setShowValues] = useState(true);
  const [tokens, setTokens] = useState<TokenInfo[]>(SUPPORTED_TOKENS);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBalances = async (isInitial = false) => {
    if (isInitial) setIsLoading(true);
    else setIsRefreshing(true);
    
    try {
      const updatedTokens = await balanceService.getBalances();
      setTokens(updatedTokens);
    } catch (error) {
      console.error("Failed to fetch balances:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBalances(true);
    const interval = setInterval(() => fetchBalances(false), 30000);
    return () => clearInterval(interval);
  }, []);

  const totalShieldedValue = useMemo(() => balanceService.calculateTotalShieldedValue(tokens), [tokens]);
  const totalPublicValue = useMemo(() => balanceService.calculateTotalPublicValue(tokens), [tokens]);

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          <div className="absolute inset-0 blur-xl bg-purple-500/20 rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-400 font-medium animate-pulse">Querying fhEVM Encrypted Balances...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Total Balance Card */}
      <div className={`relative glass-card rounded-[32px] p-8 border overflow-hidden transition-all ${theme === 'dark' ? 'border-white/5 bg-gray-900/40' : 'border-slate-200 bg-white shadow-xl'}`}>
        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] -mr-32 -mt-32 transition-colors ${theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-500/10'}`}></div>
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              Total Shielded Value (FHE)
              {isRefreshing && <RefreshCw size={12} className="animate-spin text-purple-500" />}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <h3 className={`text-4xl font-black transition-all duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {showValues ? `$${totalShieldedValue}` : '••••••••'}
              </h3>
              <button 
                onClick={() => setShowValues(!showValues)}
                className="p-2 text-gray-400 hover:text-purple-500 transition-colors"
                aria-label={showValues ? "Hide values" : "Show values"}
              >
                {showValues ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-500/20">
            <ShieldCheck size={14} /> Private
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 relative z-10">
          {[
            { label: 'Public Portfolio', value: showValues ? `$${totalPublicValue}` : '••••', color: theme === 'dark' ? 'text-gray-200' : 'text-slate-700' },
            { label: 'Active Yield (FHE)', value: '~4.25%', color: 'text-purple-500' },
            { label: 'Privacy Health', value: 'Excellent', color: 'text-blue-500' },
            { label: 'Validator Node', value: 'Zama #41', color: 'text-emerald-500' }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border transition-colors ${theme === 'dark' ? 'bg-gray-800/30 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{item.label}</p>
              <p className={`font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tokens.map((token) => (
          <div key={token.symbol} className={`glass-card rounded-2xl border transition-all p-6 group relative ${theme === 'dark' ? 'border-white/5 hover:border-purple-500/30 bg-gray-900/40' : 'border-slate-200 hover:border-purple-300 bg-white shadow-lg shadow-slate-200/50'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={token.logo} alt={token.name} className="w-10 h-10 rounded-full shadow-md" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#030712]' : 'bg-white shadow-sm'}`}>
                    <ShieldCheck className="text-purple-500" size={10} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">{token.name}</h4>
                  <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{token.symbol}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Price</p>
                <p className={`text-sm font-mono font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                  ${token.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 flex items-center gap-1.5 font-medium">
                  <Unlock size={14} className="text-gray-400" /> Public
                </span>
                <span className={`font-mono font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`}>
                  {showValues ? token.balance : '••••'}
                </span>
              </div>
              <div className={`flex justify-between items-center text-sm p-4 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-purple-900/10 border-purple-500/10 group-hover:bg-purple-900/20' : 'bg-purple-50 border-purple-100 group-hover:bg-purple-100/50'}`}>
                <span className="text-purple-600 font-bold flex items-center gap-1.5">
                  <Lock size={14} /> Shielded
                </span>
                <span className="font-mono text-purple-600 font-black">
                  {showValues ? token.shieldedBalance : '••••'}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <button className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${theme === 'dark' ? 'bg-gray-800/50 border-transparent hover:bg-gray-800 text-gray-300 hover:text-white' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600'}`}>
                Deposit
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20">
                Send Private
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
