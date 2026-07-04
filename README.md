# 🚀 Persona AI Chat Simulator

A full-stack, real-time multi-agent chat workspace where users can interact with digital twins of renowned tech educators **Hitesh Choudhary** and **Piyush Garg**. The application leverages their authentic teaching styles, colloquial Hinglish vocabulary, and signature real-world catchphrases under a unified server mesh.

## 🌐 Live Link
* **Production Deployment:** [https://persona-ai-chat.onrender.com](https://persona-ai-chat.onrender.com)
  
## 🛠️ Tech Stack & Architecture

### Frontend
* **Framework:** React.js (Vite configuration framework)
* **Styling Engine:** Tailwind CSS v4 
* **State Management:** Local React state with context-isolated chat histories

### Backend
* **Runtime Environment:** Node.js (ESM modules standard)
* **Server Framework:** Express.js 
* **Routing Strategy:** High-performance global middleware catch-all handler for handling unified monolithic application builds seamlessly without router conflicts.

### AI Engine
* **SDK:** `@google/genai`
* **Model:** `gemini-2.5-flash`
* **Parameters:** Optimized temperature (`0.7`) with custom multi-turn history mapping payloads.

## ⚡ Key Core Features

* **Authentic Hook Triggers:** Automatically initiates with signature openings (e.g., Hitesh's *"Hanji kaise ho aap sabhi, back again!"* or Piyush's *"Hey guys, what's up?"*) only when the session context is empty.
* **Context Preservation:** Dynamically maps user and model states into structural API-compatible history blocks to maintain smooth conversational flow.
* **Monolithic Build Integration:** Bypasses independent pipeline complications by bundling frontend distribution assets directly into the core Express runtime engine.
