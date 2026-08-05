# 🏥 AI Medical Assistant Frontend (Next.js + TypeScript)

A modern, responsive medical AI interface built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. 

The frontend pairs with the FastAPI backend to deliver a seamless multi-tenant medical AI application with JWT authentication, document uploads, real-time medical chat, and source citation inspection.

---

## ⚡ Key Features

* 🔐 **Authentication & Authorization**: Dedicated Login and Signup pages integrated with JWT Bearer Token state management.
* 🛡️ **Axios Interceptors**: Automatic Bearer token header injection and automatic session timeout handling (`401` redirect).
* 💬 **Interactive Chat UI**: Markdown response rendering for medical headings, lists, and bold text.
* 📄 **Document Management**: Drag-and-drop PDF uploader and active document list sidebar.
* 🔍 **Source Citation Inspector**: View exact document names, page numbers, and snippet passages referenced by the AI.
* 🌐 **Vercel Ready**: Pre-configured environment variable support (`NEXT_PUBLIC_API_URL`) for Vercel deployment.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router), React, TypeScript |
| **Styling** | Tailwind CSS |
| **HTTP Client** | Axios (with Interceptors) |
| **Icons & UI** | Lucide React |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```text
frontend/
├── app/
│   ├── page.tsx          # Main Chat Dashboard UI
│   ├── login/
│   │   └── page.tsx      # User Login Page
│   └── signup/
│   │   └── page.tsx      # User Registration Page
├── components/
│   ├── ChatWindow.tsx    # Interactive message container
│   ├── Header.tsx        # Top navigation & profile info
│   ├── Sidebar.tsx       # Document list & PDF uploader
│   └── SourceModal.tsx   # Citations inspector modal
├── lib/
│   └── api.ts            # Axios instance with JWT interceptors
├── public/               # Static assets & icons
└── types/                # TypeScript interface definitions
```

---

## 🚀 Local Quickstart

### 1. Clone the repository
```bash
git clone https://github.com/zohebqureshimz-pixel/medical-ai-frontend.git
cd medical-ai-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🌐 Vercel Deployment

1. Import repository to [Vercel](https://vercel.com).
2. Set Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://medical-ai-backend.onrender.com` (Your Render Backend URL)
3. Deploy!

---

## 👨‍💻 Author

**Zoheb Qureshi**  
GitHub: [@zohebqureshimz-pixel](https://github.com/zohebqureshimz-pixel)
