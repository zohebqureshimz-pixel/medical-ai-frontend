"use client";

import { FaUpload } from "react-icons/fa";
import { useRef, useState } from "react";
import axios from "axios";
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
        formData
      );

      toast.success(response.data.message || "PDF indexed successfully!");
    } catch (error) {
      console.error(error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.detail ||
          error.response?.data?.error ||
          (error.response
            ? `Upload failed (${error.response.status}).`
            : "Cannot reach the server. Please try again in a moment.")
        : "Upload failed. Please try again.";
      toast.error(message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
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
