
import React from 'react';
import { TokenSymbol, TokenInfo } from './types';

export const SUPPORTED_TOKENS: TokenInfo[] = [
  {
    symbol: TokenSymbol.ETH,
    name: 'Ethereum',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    balance: '1.24',
    shieldedBalance: '0.50',
    price: 2450.25
  },
  {
    symbol: TokenSymbol.USDT,
    name: 'Tether USD',
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    balance: '520.00',
    shieldedBalance: '100.00',
    price: 1.00
  },
  {
    symbol: TokenSymbol.USDC,
    name: 'USD Coin',
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    balance: '12.50',
    shieldedBalance: '2500.00',
    price: 1.00
  }
];

export const NETWORK_NAMES: Record<number, string> = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
  9090: 'fhEVM Zama'
};
