# 📝 OpenBrief

**OpenBrief** is an AI-powered brief generator for freelancers and creative professionals. It helps users quickly generate professional project briefs based on client and project info—no overthinking, no formatting headaches, just fast, clean briefs.

## 🚀 Features

- ⚡ Instant AI-generated project briefs
- 🔄 Regenerate briefs to compare different versions
- 📋 Copy and 📁 download brief options
- ✅ Form validation and auto-scroll to results
- 📱 Fully responsive, clean UI

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide
- **State Management:** React Hooks
- **Backend:** Edge API route with streaming (optional future upgrade)
- **AI:** GeminiAI (or your own prompt logic)

## 🖥️ Getting Started

1. **Clone the repo**
- git clone https://github.com/your-username/OpenBrief.git
- cd OpenBrief

2. **Install dependencies**
- npm install

3. **Set up environment variables**

- Create a **.env.local** file and add:
- GEMINI_API_KEY=your-api-key-here

4. **Run locally**
- npm run dev

5. **Visit http://localhost:3000**

## 📂 Project Structure
    /app
    /brief        - Brief generation page
    /api          - Serverless API route to generate brief
    /components     - Reusable UI components (Form, Output, etc.)
    /lib            - Utility functions (optional)

## 🔧 Commands
- **npm run dev — Run dev server**
- **npm run build — Build for production**
- **npm run lint — Lint the codebase**
- **npm run format — Format code using Prettier**

## 🧪 To-Do / Next Features
 - **Export brief as PDF**
 - **Allow saving briefs to local storage**
 - **User accounts for saved briefs**
 - **Shareable brief links**
 - **Multilingual support**
 - **Animate brief generation (typing effect)**

## 🧑‍💻 Contributing
**Pull requests are welcome! Here's how to contribute:**

- Fork the project
- Create your feature branch (git checkout -b feat/yourFeature)
- Commit your changes (git commit -m 'feat: add cool thing')
- Push to the branch (git push origin feat/yourFeature)
- Open a pull request

## 📄 License
MIT License © 2025 [Praevus](https://github.com/Chukwuderah)