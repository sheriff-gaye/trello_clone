"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const QueryProvier = ({ children }: { children: React.ReactNode }) => {
  const [queryCleint] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryCleint}>{children}</QueryClientProvider>
  );
};
