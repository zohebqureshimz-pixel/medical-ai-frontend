"use client";

import Message from "./Message";
import ChatInput from "./ChatInput";

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

interface ChatAreaProps {
  messages: ChatMessage[];
  loading: boolean;
  sendMessage: (question: string) => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatArea({
  messages,
  loading,
  sendMessage,
  bottomRef,
}: ChatAreaProps) {
  return (
    <div className="flex flex-col flex-1">

      <div className="flex-1 overflow-y-auto p-6">

        {messages.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <div className="max-w-2xl text-center">

              <div className="text-6xl mb-6">
                🩺
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Medical AI Assistant
              </h1>

              <p className="text-gray-500 text-lg mb-8">
                Ask questions about your uploaded medical textbooks and get
                accurate answers with document sources.
              </p>

              <div className="grid gap-4">

                <button
                  onClick={() => sendMessage("Explain the femur")}
                  className="rounded-xl border bg-white p-4 text-left hover:bg-blue-50 transition"
                >
                  🦴 Explain the femur
                </button>

                <button
                  onClick={() => sendMessage("Types of arteries")}
                  className="rounded-xl border bg-white p-4 text-left hover:bg-blue-50 transition"
                >
                  ❤️ Types of arteries
                </button>

                <button
                  onClick={() => sendMessage("Blood supply of the heart")}
                  className="rounded-xl border bg-white p-4 text-left hover:bg-blue-50 transition"
                >
                  🫀 Blood supply of the heart
                </button>

                <button
                  onClick={() => sendMessage("Explain cranial nerves")}
                  className="rounded-xl border bg-white p-4 text-left hover:bg-blue-50 transition"
                >
                  🧠 Explain cranial nerves
                </button>

              </div>

            </div>

          </div>

        ) : (

          messages.map((msg, index) => (
            <Message
              key={index}
              role={msg.role}
              content={msg.content}
              sources={msg.sources}
            />
          ))

        )}

        {loading && (
          <Message
            role="assistant"
            content="⏳ Thinking..."
          />
        )}

        <div ref={bottomRef} />

      </div>

      <ChatInput
        onSend={sendMessage}
        loading={loading}
      />

    </div>
  );
}