"use client";

import { FaUserMd, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import UploadButton from "./Uploadbutton";

export default function Header() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/signup");
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-blue-700 text-white shadow-md">
      
      <div className="flex items-center gap-3">
        <FaUserMd size={28} />

        <div>
          <h1 className="text-xl font-bold">
            MedMind AI 
          </h1>

          <p className="text-sm text-blue-100">
            RAG Powered Medical Study Assistant
          </p>
        </div>
      </div>

      <div className="flex gap-3">

        <UploadButton />

        <button
          className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <FaPlus />
          New Chat
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </header>
  );
}