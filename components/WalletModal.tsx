
import React, { useState } from 'react';
import { X, Shield, Loader2, ArrowRight } from 'lucide-react';

interface WalletProvider {
  name: string;
  icon: string;
  type: 'EVM' | 'Multi' | 'Cosmos';
  description: string;
}

const WALLET_PROVIDERS: WalletProvider[] = [
  {
    name: 'MetaMask',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Logo.svg',
    type: 'EVM',
    description: 'The world\'s most popular wallet.'
  },
  {
    name: 'Rabby',
    icon: 'https://rabby.io/static/media/rabby-logo.0f43884b.svg',
    type: 'EVM',
    description: 'The game-changing wallet for Ethereum.'
  },
  {
    name: 'Coinbase Wallet',
    icon: 'https://images.ctfassets.net/q5ulk4bp65r7/1rFQC9989Y4796Uec63H1p/65457221370e0503f848245b0a34b223/Coinbase_Wallet_Icon_Round.png',
    type: 'EVM',
    description: 'Easy and secure crypto for everyone.'
  },
  {
    name: 'Rainbow',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4a/48/44/4a48446c-e435-0814-1e08-955621327170/AppIcon-0-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/512x512bb.jpg',
    type: 'EVM',
    description: 'The fun, simple, and secure way to Ethereum.'
  },
  {
    name: 'Phantom',
    icon: 'https://phantom.app/img/phantom-logo.svg',
    type: 'Multi',
    description: 'Solana, Ethereum, and Polygon supported.'
  },
  {
    name: 'Keplr',
    icon: 'https://assets.website-files.com/63eb402f068393e874836605/641016f496350e9326e91f1c_keplr-logo.svg',
    type: 'Cosmos',
    description: 'The hub for Cosmos & EVM-compatible chains.'
  }
];

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (provider: string) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleProviderSelect = async (provider: WalletProvider) => {
    setConnectingProvider(provider.name);
    // Simulate connection delay
    await new Promise(r => setTimeout(r, 1500));
    onConnect(provider.name);
    setConnectingProvider(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg glass-card rounded-[32px] border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center">
                <Shield className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Connect Wallet</h3>
                <p className="text-sm text-gray-500">Securely connect to Zhash Private Hub</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-3">
            {WALLET_PROVIDERS.map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleProviderSelect(provider)}
                disabled={connectingProvider !== null}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all group disabled:opacity-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center p-2.5 overflow-hidden">
                    <img src={provider.icon} alt={provider.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-200 group-hover:text-white">{provider.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-500 font-bold uppercase tracking-wider">{provider.type}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{provider.description}</p>
                  </div>
                </div>
                <div>
                  {connectingProvider === provider.name ? (
                    <Loader2 className="animate-spin text-purple-400" size={20} />
                  ) : (
                    <ArrowRight size={20} className="text-gray-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              By connecting, you agree to the Zhash protocol and acknowledge that all data remains encrypted via Zama's FHE technology.
            </p>
            <div className="mt-4 flex justify-center gap-6">
              <a href="#" className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Privacy Policy</a>
              <a href="#" className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
