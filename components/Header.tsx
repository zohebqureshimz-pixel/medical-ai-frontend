import { FaUserMd, FaUpload, FaPlus } from "react-icons/fa";
import UploadButton from "./Uploadbutton";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-blue-700 text-white shadow-md">
      <div className="flex items-center gap-3">
        <FaUserMd size={28} />
        <div>
          <h1 className="text-xl font-bold">
            Medical AI Assistant
          </h1>
          <p className="text-sm text-blue-100">
            RAG Powered Medical Study Assistant
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        
        <UploadButton />

        <button className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition">
          <FaPlus />
          New Chat
        </button>
      </div>
    </header>
  );
}