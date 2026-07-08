import ReactMarkdown from "react-markdown";
import { FaUserCircle, FaRobot, FaRegCopy } from "react-icons/fa";

interface Source {
  document: string;
  page: number;
  text: string;
}

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

export default function Message({
  role,
  content,
  sources,
}: MessageProps) {
  const isUser = role === "user";

  async function copyMessage() {
    await navigator.clipboard.writeText(content);
  }

  return (
    <div
      className={`flex gap-3 mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <FaRobot
          size={34}
          className="text-blue-600 mt-2"
        />
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-md ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white border"
        }`}
      >
        {!isUser && (
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-blue-600">
              Medical AI
            </h3>

            <button
              onClick={copyMessage}
              className="text-gray-500 hover:text-blue-600"
            >
              <FaRegCopy />
            </button>
          </div>
        )}

        <div className="prose max-w-none">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>

        {sources && sources.length > 0 && (
  <div className="mt-6 border-t pt-4">
    <h4 className="font-semibold text-sm mb-3">
      📚 Sources
    </h4>

    {sources.map((source, index) => (
      <div
        key={index}
        className="bg-gray-100 rounded-lg p-3 mb-2 text-sm"
      >
        <p>
          <strong>📄 {source.document}</strong>
        </p>

        <p>Page {source.page}</p>

        <p className="mt-2 text-gray-600">
          {source.text.slice(0, 150)}...
        </p>
      </div>
    ))}
  </div>
)}
      </div>

      {isUser && (
        <FaUserCircle
          size={34}
          className="text-gray-600 mt-2"
        />
      )}
    </div>
  );
}