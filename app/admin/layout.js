"use client";

import Link from "next/link";
import { resetToDefault } from "@/lib/portfolioStore";

export default function AdminLayout({ children }) {
  const handleReset = async () => {
    if (confirm("Reset semua data ke default? Data yang diubah akan hilang.")) {
      await resetToDefault();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">⚙️ Admin Panel</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            ← Lihat Portfolio
          </Link>
          <button
            onClick={handleReset}
            className="text-sm bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded transition-colors"
          >
            🔄 Reset ke Default
          </button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
