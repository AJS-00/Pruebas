
import { GoogleGenAI, Type } from "@google/genai";
import { EmailValidationResult } from "../types";

// In a real production app, you might use Abstract API or ZeroBounce.
// Here we use Gemini 3 Flash to simulate an advanced validation that checks
// for disposable domains, common fake patterns, and domain reputation.
export const validateEmailAdvanced = async (email: string): Promise<EmailValidationResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Analyze the following email address: "${email}".
    Perform an advanced verification:
    1. Check if the domain is a known disposable/temporary email provider (like mailinator, yopmail, etc.).
    2. Analyze if the syntax is valid.
    3. Check if the username part looks like random gibberish (high entropy) often used by bots.
    4. Estimate if the domain is likely to have MX records (common domains like gmail, outlook, etc. are always fine).
    
    Return the result in JSON format.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN },
            message: { type: Type.STRING },
            isDisposable: { type: Type.BOOLEAN },
            reputationScore: { type: Type.NUMBER, description: "0 to 100" }
          },
          required: ["isValid", "message", "isDisposable", "reputationScore"]
        }
      }
    });

    const result = JSON.parse(response.text);
    
    if (result.isDisposable) {
        return { isValid: false, message: "No se permiten correos temporales o desechables." };
    }
    
    if (result.reputationScore < 30) {
        return { isValid: false, message: "El correo parece inválido o de baja reputación." };
    }

    return { 
      isValid: result.isValid, 
      message: result.isValid ? "Email válido" : result.message 
    };
  } catch (error) {
    console.error("Email validation error:", error);
    // Fallback basic validation if API fails
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicRegex.test(email)) {
        return { isValid: false, message: "Formato de correo inválido." };
    }
    return { isValid: true, message: "Validación básica exitosa." };
  }
};