
import { TokenSymbol, TokenInfo } from '../types';
import { SUPPORTED_TOKENS } from '../constants';

export class BalanceService {
  /**
   * Simulates a network call to fetch balances.
   * In a real fhEVM app, this would involve calling `balanceOf` 
   * and potentially re-encrypting/decrypting for the UI if allowed.
   */
  async getBalances(): Promise<TokenInfo[]> {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1200));

    return SUPPORTED_TOKENS.map(token => ({
      ...token,
      // Randomize slightly to simulate "real-time" data fetching
      balance: (parseFloat(token.balance) * (0.98 + Math.random() * 0.04)).toFixed(2),
      shieldedBalance: (parseFloat(token.shieldedBalance) * (0.99 + Math.random() * 0.02)).toFixed(2)
    }));
  }

  calculateTotalShieldedValue(tokens: TokenInfo[]): string {
    const total = tokens.reduce((acc, token) => {
      return acc + (parseFloat(token.shieldedBalance) * token.price);
    }, 0);
    return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  calculateTotalPublicValue(tokens: TokenInfo[]): string {
    const total = tokens.reduce((acc, token) => {
      return acc + (parseFloat(token.balance) * token.price);
    }, 0);
    return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}

export const balanceService = new BalanceService();
