"use client";

import { FaUpload } from "react-icons/fa";
import { useRef, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function UploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    setUploading(true);

    try {
      const response = await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("PDF Indexed Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed");
    }

    setUploading(false);
  }

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        ref={inputRef}
        hidden
        onChange={handleUpload}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <FaUpload />

        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
    </>
  );
}