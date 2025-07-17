"use client";

import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import DeployLogs from "@/components/DeployLogs";
import { logout } from "./api/auth/logout/logout";

export default function Home() {
  const [activePage, setActivePage] = useState<"upload" | "logs">("upload");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-52 bg-gray-800 text-white p-4 space-y-4">
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-2 text-sm">
          <li>
            <button
              onClick={() => setActivePage("upload")}
              className={`block w-full text-left px-2 py-1 rounded ${
                activePage === "upload" ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              Upload & Deploy
            </button>
          </li>
          <li>
            <button
              onClick={() => setActivePage("logs")}
              className={`block w-full text-left px-2 py-1 rounded ${
                activePage === "logs" ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              Riwayat Deploy
            </button>
          </li>
          <li>
            <button
              onClick={logout}
              className="block w-full text-left px-2 py-1 rounded hover:bg-gray-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Konten */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {activePage === "upload" && <UploadForm />}
        {activePage === "logs" && <DeployLogs />}
      </div>
    </div>
  );
}
