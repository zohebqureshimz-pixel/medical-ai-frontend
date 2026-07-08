"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({
  onSend,
  loading,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex gap-2 border-t p-4 bg-white">
      <input
        className="flex-1 border rounded-lg px-4 py-2"
        placeholder="Ask a medical question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 text-white px-5 rounded-lg"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}