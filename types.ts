
export enum TokenSymbol {
  ETH = 'ETH',
  USDT = 'USDT',
  USDC = 'USDC'
}

export interface TokenInfo {
  symbol: TokenSymbol;
  name: string;
  logo: string;
  balance: string;
  shieldedBalance: string;
  price: number;
}

export interface Transaction {
  id: string;
  type: 'SHIELD' | 'TRANSFER' | 'DESHIELD';
  token: TokenSymbol;
  amount: string;
  fee?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: number;
  hash: string;
  isPrivate: boolean;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
}
