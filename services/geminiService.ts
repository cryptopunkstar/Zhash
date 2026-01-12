
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'AIzaSyBex6LJ9lqT22Fv6TTZeCXgg0xc9ORwqgw' });
  }

  async getPrivacyAdvice(context: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: context,
        config: {
          systemInstruction: "You are 'Zhash AI', an expert in Fully Homomorphic Encryption (FHE) and zero-knowledge privacy. Explain complex blockchain privacy concepts simply. Emphasize how Zama's FHE technology allows computation on encrypted data without ever revealing the underlying amounts.",
        },
      });
      return response.text || "I'm sorry, I couldn't process that privacy query right now.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "The privacy assistant is currently offline. Rest assured, your data remains encrypted via Zama FHE protocol.";
    }
  }
}

export const geminiService = new GeminiService();
