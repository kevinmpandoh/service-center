"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }) {
  // bikin queryClient sekali aja
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Toaster richColors position={"top-center"} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
