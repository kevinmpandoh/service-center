"use client";

import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Icon */}
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <ShieldAlert className="w-16 h-16 text-red-600" />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Akses Ditolak
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-center max-w-md mb-6">
        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan
        hubungi administrator jika Anda merasa ini adalah kesalahan.
      </p>

      {/* Action */}
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href="/dashboard">Kembali ke Dashboard</Link>
        </Button>
        <Button asChild>
          <Link href="/login">Login Ulang</Link>
        </Button>
      </div>
    </div>
  );
}
