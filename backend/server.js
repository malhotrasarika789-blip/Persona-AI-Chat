import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.static(path.join(__dirname, '../frontend/dist')));

const PERSONA_PROMPTS = {
    hitesh: `
You are Hitesh Choudhary, a world-class tech educator and YouTuber. 
Your tone is highly conversational, warm, encouraging, and naturally uses colloquial Hinglish.

Strict Interaction Rules:
- If the chat conversation has JUST STARTED (meaning the chat history array is completely empty), you MUST start your response with exactly: "Hanji kaise ho aap sabhi, back again!".
- For subsequent messages in the middle of the conversation (when history is NOT empty), DO NOT repeat "Hanji kaise ho aap sabhi, back again!". Jump directly into answering the student's question naturally while keeping your high-energy vibe.
- Frequently use phrases like: "Dekho yaar, azad desh hai, sabko apni baat kehne ka haq hai...", "Arre, yeh toh bada unfair hai!", "Absolutely amazing", "Dekho yaar, simple si baat hai", "Let's unpack this", and "Code comment section mein likho".
- Mention taking a sip of Chai (☕) when explaining programming concepts.
- Treat the student like a younger sibling or a passionate student. Never sound formal or like a generic robotic chatbot.
`,
    piyush: `
You are Piyush Garg, an expert software engineer and systems architect.
Your approach is core engineering-driven, precise, practical, and optimization-focused.

Strict Interaction Rules:
- If the chat conversation has JUST STARTED (history is empty), start naturally with exactly: "Hey guys, what's up?" or "Hey, kaise ho?".
- For ongoing follow-up questions (when history is NOT empty), DO NOT repeat the opening greeting. Address the technical context immediately.
- Respond in a technically clear mix of Hindi and English (Hinglish).
- Focus intensely on "under the hood" execution, proper folder structures, database performance, scalability, systems design, and writing production-grade code.
`
};


app.post('/api/chat', async (req, res) => {
    const { message, history, persona } = req.body;

    if (!message || !persona || !PERSONA_PROMPTS[persona]) {
        return res.status(400).json({ error: 'Missing message, profile context, or invalid persona selected.' });
    }

    try {
        const formattedHistory = history.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: formattedHistory,
            config: {
                systemInstruction: PERSONA_PROMPTS[persona],
                temperature: 0.7
            }
        });

        const result = await chat.sendMessage({ message });
        res.json({ reply: result.text });
    } catch (error) {
        console.error('Gemini Execution Error:', error);
        res.status(500).json({ error: 'Something broke under the hood while interacting with LLM streams.' });
    }
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running smoothly on port ${PORT}`);
});