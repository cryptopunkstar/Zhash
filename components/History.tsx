
import React from 'react';
import { Transaction, TokenSymbol } from '../types';
import { Shield, ArrowUpRight, ArrowDownLeft, ExternalLink, ShieldCheck, Clock, Copy, MoreHorizontal } from 'lucide-react';

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'TRANSFER',
    token: TokenSymbol.USDT,
    amount: '250.00',
    fee: '0.025000',
    status: 'COMPLETED',
    timestamp: Date.now() - 3600000 * 2,
    hash: '0x32a...98f1',
    isPrivate: true
  },
  {
    id: '2',
    type: 'SHIELD',
    token: TokenSymbol.ETH,
    amount: '0.50',
    status: 'COMPLETED',
    timestamp: Date.now() - 3600000 * 24,
    hash: '0x1c4...e32d',
    isPrivate: true
  },
  {
    id: '3',
    type: 'TRANSFER',
    token: TokenSymbol.USDC,
    amount: '1,200.00',
    fee: '0.120000',
    status: 'COMPLETED',
    timestamp: Date.now() - 3600000 * 48,
    hash: '0x7e2...b5a1',
    isPrivate: true
  },
  {
    id: '4',
    type: 'DESHIELD',
    token: TokenSymbol.ETH,
    amount: '0.10',
    status: 'FAILED',
    timestamp: Date.now() - 3600000 * 72,
    hash: '0x992...c012',
    isPrivate: false
  }
];

const History: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-lg flex items-center gap-2">
              Recent Activity
            </h3>
            <p className="text-xs text-gray-500">Track your public and FHE encrypted transactions.</p>
          </div>
          <div className="flex gap-2">
            <select className="bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-2 text-xs text-gray-400 focus:outline-none focus:border-purple-500/50 hover:bg-gray-800/80 transition-all cursor-pointer">
              <option>All Assets</option>
              <option>ETH</option>
              <option>USDT</option>
              <option>USDC</option>
            </select>
            <button className="p-2 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                <th className="px-6 py-5 font-bold">Transaction</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 font-bold">Amount</th>
                <th className="px-6 py-5 font-bold">Date</th>
                <th className="px-6 py-5 font-bold text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="group hover:bg-white/[0.03] transition-all duration-200 cursor-default">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        tx.type === 'TRANSFER' ? 'bg-blue-500/10 text-blue-400' : 
                        tx.type === 'SHIELD' ? 'bg-purple-500/10 text-purple-400' : 
                        'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {tx.type === 'TRANSFER' && <ArrowUpRight size={22} />}
                        {tx.type === 'SHIELD' && <Shield size={22} />}
                        {tx.type === 'DESHIELD' && <ArrowDownLeft size={22} />}
                        {tx.isPrivate && (
                          <div className="absolute -top-1 -right-1 bg-purple-600 rounded-full p-0.5 border-2 border-[#030712]">
                            <ShieldCheck size={10} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-100 group-hover:text-white transition-colors">
                          {tx.type === 'TRANSFER' ? 'Private Transfer' : tx.type === 'SHIELD' ? 'Shielded Assets' : 'Deshield Assets'}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <p className="text-[11px] text-gray-500 font-mono tracking-tight">
                            {tx.hash}
                          </p>
                          <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-600 hover:text-purple-400 transition-all" title="Copy Hash">
                            <Copy size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                        tx.status === 'COMPLETED' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20 group-hover:bg-red-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`}></span>
                        {tx.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold font-mono text-gray-100 group-hover:text-purple-300 transition-colors">
                        {tx.amount} {tx.token}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">Royalty (0.01%): {tx.fee || '0.00'} {tx.token}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-400 text-[11px] font-medium">
                      <Clock size={14} className="text-gray-600" />
                      <div>
                        <p className="text-gray-200">{new Date(tx.timestamp).toLocaleDateString()}</p>
                        <p className="text-gray-500 text-[10px]">{new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl text-[11px] font-bold border border-white/5 transition-all">
                        <ExternalLink size={14} />
                        <span className="hidden sm:inline">Explorer</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-white/[0.01] text-center border-t border-white/5">
          <button className="group relative px-8 py-3 bg-gray-900/50 hover:bg-purple-600/10 border border-white/5 hover:border-purple-500/30 rounded-2xl text-xs font-bold text-gray-500 hover:text-purple-400 transition-all uppercase tracking-widest shadow-lg">
            <span className="relative z-10 flex items-center justify-center gap-2">
              View All Transactions
              <ArrowDownLeft size={14} className="rotate-[135deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500 font-medium justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          Monitoring Zama network for new proofs...
        </div>
        <div className="flex items-center gap-6">
          <p>Total Shielded TX: <span className="text-white">1,244</span></p>
          <p>Total Volume: <span className="text-white">$8.4M</span></p>
        </div>
      </div>
    </div>
  );
};

export default History;
