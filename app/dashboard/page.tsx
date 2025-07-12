"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "./components/UploadForm";
import DeployLogs from "./components/DeployLogs";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Di sini nanti bisa tambah cek JWT atau auth
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <UploadForm />
      <DeployLogs />
    </div>
  );
}
