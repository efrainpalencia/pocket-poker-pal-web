# 🎯 Pocket Poker Pal – Frontend

**Pocket Poker Pal** is a voice-powered AI assistant that helps players get instant, in-context answers to poker gameplay rules.  
Built with **React + TypeScript + Vite + Tailwind CSS**, it connects seamlessly with the **Spring Boot backend** and integrates OpenAI + Whisper for natural conversation flow.

---

## 🚀 Features

- 🎙️ **Voice & Text Chat** – Ask poker questions by voice or text.
- 🤖 **AI-Powered Answers** – Uses OpenAI GPT-4o for context-aware responses.
- 📚 **Rulebook Search** – Retrieves verified rules from TDA and Seminole poker rulebooks.
- 💬 **Typing Animations & Auto-Scroll** – Smooth, modern chat UI.
- 🧠 **Speech-to-Text (STT)** – Powered by Whisper for accurate transcription.
- 🔊 **Real-Time Feedback** – Live listening status and responsive UI.
- ⚡ **Fast Build & Deploy** – Vite bundler with optimized production setup.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend Framework | **React 18 + Vite** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| State Management | Zustand |
| API Communication | Axios |
| Audio STT | OpenAI Whisper API |
| Voice UI | @react-native-voice/voice (mobile) / useSpeechToText hook (web) |
| Deployment | Vercel |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/pocket-poker-pal-frontend.git
cd pocket-poker-pal-frontend
```

### 2️⃣ Install dependencies

npm install

### 3️⃣ Configure environment variables

VITE_API_BASE_URL=https://your-backend-url/api
VITE_OPENAI_API_KEY=your_openai_api_key

### 4️⃣ Run the development server

npm run dev

🧠 How It Works

1. The user asks a poker rule question (via voice or text).

2. The query is sent to the backend /api/ask or /api/ask-audio endpoint.

3. The backend transcribes, searches the rulebook (via Pinecone), and responds with a concise, context-aware answer.

4. The frontend displays the message with a typing animation and keeps chat history in memory.

🧪 Testing

Run unit and integration tests (if configured):

npm run test

🧱 Build for Production

npm run build

Then preview the production build:

npm run preview

🌐 Deployment

Deployed easily with Vercel or any static hosting:

vercel --prod

👨‍💻 Author

Efrain Palencia
Full Stack Software Engineer • AI-Powered Solutions
🌐 efai-tech.com

📧 efrain@efai-tech.com

💼 www.linkedin.com/in/efrain-palencia
 | [GitHub](https://github.com/efrainpalencia)

🛡️ License

This project is licensed under the MIT License.

⭐ If you like this project, please give it a star on GitHub!
