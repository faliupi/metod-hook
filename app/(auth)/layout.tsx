'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full items-center justify-center px-4">
        {children}
      </div>
    </QueryClientProvider>
  );
}