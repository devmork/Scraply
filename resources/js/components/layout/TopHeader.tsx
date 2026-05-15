// resources/js/components/layout/TopHeader.tsx
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TopHeader() {
  return (
    <header className="bg-black border-b border-gray-800 h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-gray-400 hover:text-white" />
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* User menu or other controls can go here */}
      </div>
    </header>
  );
}