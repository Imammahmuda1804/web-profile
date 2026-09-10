"use client";

import { useState, useRef } from "react";
import { uploadImage, deleteImage } from "@/lib/portfolioStore";

// ponytail: upload to Supabase Storage, or paste URL directly
export default function ImageUpload({ value, onChangeValue, onRemove, placeholder = "/path-to-image.png" }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diperbolehkan.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB.");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChangeValue(url);
    } catch (err) {
      alert("Gagal upload gambar: " + err.message);
    }
    setUploading(false);
  };

  const handleRemove = async () => {
    if (value) {
      await deleteImage(value);
    }
    onRemove();
  };

  const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:outline-none";

  return (
    <div className="flex gap-2 mb-2 items-center">
      <div className="flex-grow flex gap-2">
        <input
          className={inputClass}
          value={value || ""}
          onChange={(e) => onChangeValue(e.target.value)}
          placeholder={placeholder}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
        >
          {uploading ? "..." : "Upload"}
        </button>
      </div>
      {value && <img src={value} alt="" className="w-10 h-10 object-cover rounded" />}
      <button onClick={handleRemove} className="text-red-400 hover:text-red-300 text-sm px-2">x</button>
    </div>
  );
}
