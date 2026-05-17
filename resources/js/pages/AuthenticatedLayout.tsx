// resources/js/pages/AuthenticatedLayout.tsx
import React from "react";
import AppSidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex min-w-0 flex-1 w-full overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}