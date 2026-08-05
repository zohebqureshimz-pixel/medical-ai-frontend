"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";

interface Source {
  document: string;
  page: number;
  text: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

interface ChatSession {
  id: number;
  title: string;
  messages: ChatMessage[];
}

export default function ChatWindow() {
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const currentChat =
    chatHistory.find((chat) => chat.id === currentChatId) ?? null;

  const messages = currentChat?.messages ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/signup");
  }
  }, [router]);

  useEffect(() => {
  async function fetchDocuments() {
    try {
      const response = await api.get("/documents");

      setDocuments(response.data.documents);

    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  }

  fetchDocuments();

  }, []);

  async function sendMessage(question: string) {
    if (!question.trim()) return;
    if (!selectedDocument) {
      alert("Please select a document first");
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: question,
    };

    let chatId = currentChatId;

    // Create a brand new chat if none selected
    if (chatId === null) {
      chatId = Date.now();

      const newChat: ChatSession = {
        id: chatId,
        title: question.slice(0, 30),
        messages: [userMessage],
      };

      setChatHistory((prev) => [...prev, newChat]);
      setCurrentChatId(chatId);
    } else {
      
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, userMessage],
              }
            : chat
        )
      );
    }

    setLoading(true);

    try {
      const response = await api.post("/ask", {
        document_name: selectedDocument,
        question,
      });

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.data.answer,
        sources: response.data.sources,
      };

      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
              }
            : chat
        )
      );
    } catch (error) {
      console.error(error);

      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "❌ Something went wrong.",
      };

      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, errorMessage],
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          chats={chatHistory}
          currentChatId={currentChatId}
          onNewChat={() => {
            setCurrentChatId(null);
          }}
          onSelectChat={(id) => {
            setCurrentChatId(id);
          }}
        />

        <div className="flex flex-col flex-1 overflow-hidden">

  <div className="p-4 border-b">

    <select
      value={selectedDocument}
      onChange={(e) =>
        setSelectedDocument(e.target.value)
      }
      className="border rounded p-2 w-full"
    >

      <option value="">
        Select Document
      </option>

      {documents.map((doc) => (
        <option
          key={doc}
          value={doc}
        >
          {doc}
        </option>
      ))}

    </select>

  </div>


  <div className="flex-1 overflow-y-auto">
  <ChatArea
    messages={messages}
    loading={loading}
    sendMessage={sendMessage}
    bottomRef={bottomRef}
  />
    </div>

    </div>
      </div>
    </div>
  );
}