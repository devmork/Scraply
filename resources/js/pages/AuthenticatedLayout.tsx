// resources/js/pages/AuthenticatedLayout.tsx
import React from "react";
import AppSidebar from "@/components/layout/Sidebar";
import TopHeader from "@/components/layout/TopHeader";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopHeader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}