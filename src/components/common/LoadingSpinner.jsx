"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ fullScreen = false }) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <span className="text-gray-600">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
