"use client";

import { FaComments, FaPlus } from "react-icons/fa";

interface ChatSession {
  id: number;
  title: string;
}

interface SidebarProps {
  chats: ChatSession[];
  currentChatId: number | null;
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
}

export default function Sidebar({
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  return (
    <aside className="w-72 bg-gray-900 text-white flex flex-col">

      <button
        onClick={onNewChat}
        className="m-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 hover:bg-blue-700 transition"
      >
        <FaPlus />
        New Chat
      </button>

      <div className="px-4 flex-1 overflow-y-auto">

        <h2 className="text-sm font-semibold uppercase text-gray-400 mb-3">
          Chat History
        </h2>

        {chats.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No chats yet
          </p>
        ) : (
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition ${
                  currentChatId === chat.id
                    ? "bg-gray-700"
                    : "hover:bg-gray-800"
                }`}
              >
                <FaComments />
                <span className="truncate">
                  {chat.title}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </aside>
  );
}