
import React, { useState, useMemo } from 'react';
import { SUPPORTED_TOKENS } from '../constants';
import { WalletState, TokenSymbol } from '../types';
import { ArrowDown, Info, Shield, Zap, CheckCircle2, Loader2, AlertCircle, Coins } from 'lucide-react';

interface TransferFormProps {
  wallet: WalletState;
}

const ROYALTY_RATE = 0.0001; // 0.01%

const TransferForm: React.FC<TransferFormProps> = ({ wallet }) => {
  const [selectedToken, setSelectedToken] = useState(SUPPORTED_TOKENS[0]);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [step, setStep] = useState<'IDLE' | 'ENCRYPTING' | 'SENDING' | 'SUCCESS'>('IDLE');

  const calculatedFee = useMemo(() => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return '0.00';
    return (val * ROYALTY_RATE).toLocaleString(undefined, { minimumFractionDigits: 6 });
  }, [amount]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.isConnected) return;

    setStep('ENCRYPTING');
    // Simulate Zama FHE encryption (e.g., fhevmjs logic)
    await new Promise(r => setTimeout(r, 2000));
    
    setStep('SENDING');
    // Simulate Transaction Broadcast
    await new Promise(r => setTimeout(r, 2500));
    
    setStep('SUCCESS');
  };

  if (step === 'SUCCESS') {
    return (
      <div className="glass-card rounded-3xl p-12 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold mb-2">Private Transfer Successful</h3>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          Your payment of <strong>{amount} {selectedToken.symbol}</strong> has been sent privately. 
          The 0.01% protocol royalty has been applied.
        </p>
        <div className="bg-black/40 rounded-2xl p-4 border border-gray-800 mb-8 font-mono text-left text-xs text-gray-400 space-y-1">
          <div className="flex justify-between"><span>Hash:</span> <span className="text-purple-400">0x82f...a9c2</span></div>
          <div className="flex justify-between"><span>Royalty Fee:</span> <span className="text-white">{calculatedFee} {selectedToken.symbol}</span></div>
          <div className="flex justify-between"><span>Network:</span> <span>fhEVM Zama</span></div>
          <div className="flex justify-between"><span>Encrypted Payload:</span> <span>AES-GCM-256</span></div>
        </div>
        <button 
          onClick={() => {setStep('IDLE'); setAmount(''); setRecipient('');}}
          className="w-full py-4 bg-purple-600 rounded-2xl font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20"
        >
          New Private Transfer
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 relative">
        {!wallet.isConnected && (
          <div className="absolute inset-0 z-20 backdrop-blur-sm bg-black/40 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Wallet Disconnected</h3>
            <p className="text-gray-400 mb-6 max-w-xs">Please connect your EVM wallet to initiate private FHE transfers.</p>
          </div>
        )}

        <form onSubmit={handleTransfer} className="space-y-6">
          {/* Token Selection */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Asset to Send</label>
            <div className="grid grid-cols-3 gap-3">
              {SUPPORTED_TOKENS.map(token => (
                <button
                  key={token.symbol}
                  type="button"
                  onClick={() => setSelectedToken(token)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${selectedToken.symbol === token.symbol ? 'bg-purple-600/20 border-purple-500/50 text-white shadow-inner' : 'bg-gray-800/30 border-white/5 text-gray-400 hover:border-white/10'}`}
                >
                  <img src={token.logo} className="w-8 h-8 rounded-full" alt={token.symbol} />
                  <span className="text-sm font-bold">{token.symbol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recipient */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recipient Address</label>
              <span className="text-[10px] text-purple-400 font-mono">Privacy: ENCRYPTED</span>
            </div>
            <div className="relative group">
              <input 
                type="text"
                placeholder="0x... or ENS Name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="w-full bg-black/40 border border-gray-800 rounded-2xl p-4 pl-12 text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-all"
              />
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-500 transition-colors" size={20} />
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Amount</label>
              <span className="text-xs text-gray-500">Shielded Balance: <span className="text-white font-mono">{selectedToken.shieldedBalance} {selectedToken.symbol}</span></span>
            </div>
            <div className="relative group">
              <input 
                type="number"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-black/40 border border-gray-800 rounded-2xl p-5 pl-6 text-2xl font-bold placeholder:text-gray-700 focus:outline-none focus:border-purple-500 transition-all"
              />
              <button 
                type="button"
                onClick={() => setAmount(selectedToken.shieldedBalance)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-purple-500 transition-colors"
              >
                MAX
              </button>
            </div>
            {amount && parseFloat(amount) > 0 && (
              <div className="flex justify-between items-center px-2 py-1 bg-white/[0.02] rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-500 flex items-center gap-1"><Coins size={10} className="text-purple-400" /> Protocol Royalty (0.01%)</span>
                <span className="text-[10px] font-mono text-gray-300">{calculatedFee} {selectedToken.symbol}</span>
              </div>
            )}
          </div>

          {/* Protocol Info */}
          <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl space-y-3">
            <div className="flex items-start gap-3">
              <Zap className="text-blue-400 shrink-0 mt-1" size={18} />
              <div>
                <p className="text-xs font-bold text-blue-200 uppercase mb-1">Zama FHE Engine</p>
                <p className="text-[11px] text-blue-300/70 leading-relaxed">
                  The amount you enter is locally encrypted. A small <strong>0.01% royalty fee</strong> is applied to sustain the Zhash private network infrastructure.
                </p>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={step !== 'IDLE' || !wallet.isConnected}
            className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-purple-900/20 active:scale-[0.98] disabled:opacity-50"
          >
            {step === 'IDLE' && <><Shield size={24} /> Send Private {selectedToken.symbol}</>}
            {step === 'ENCRYPTING' && <><Loader2 className="animate-spin" size={24} /> Encrypting via Zama...</>}
            {step === 'SENDING' && <><Loader2 className="animate-spin" size={24} /> Processing Transaction...</>}
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900/30 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
            <Info size={18} />
          </div>
          <p className="text-xs text-gray-400">Every transfer pays a tiny 0.01% royalty fee to the protocol.</p>
        </div>
        <div className="bg-gray-900/30 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
            <Shield size={18} />
          </div>
          <p className="text-xs text-gray-400">Compatible with all EVM wallets via Zhash SDK.</p>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;
