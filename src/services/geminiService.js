
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY is not defined in the environment variables.");
  }
  
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  
  export async function run(prompt) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
      console.error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
      throw new Error('Gemini API key is not configured.');
    }
  
    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });
  
      const result = await chatSession.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error with Gemini AI:', error);
      throw new Error('Failed to fetch from Gemini AI. Check the console for more details.');
    }
  } 