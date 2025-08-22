"use client";
import ModalProvider from "@/components/providers/modal-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
const queryClient = new QueryClient();
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <div className="">{children}</div> */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {/* <ClassDetailNavigation /> */}
            {children}
          </SidebarInset>
        </SidebarProvider>
        <ModalProvider />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
