import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  Home,
  LayoutGrid,
  MapPin,
  Clipboard,
  TrendingUp,
  MessageSquare,
  User,
  LogOut,
  Trash,
  Plus,
} from "lucide-react";
import { User as UserType } from "@/types/user.type";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage<{ auth: { user: UserType } }>().props;
  const user = auth?.user;
  const currentPath = usePage().url;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/");

  const getNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case "seller":
        return [
          { label: "Home", href: "#", icon: Home },
          { label: "My Junks", href: "#", icon: Trash },
          { label: "Post Junk", href: "/listings/create", icon: Plus },
          { label: "Profile", href: "/profile", icon: User },
        ];
      case "collector":
        return [
          { label: "Map", href: "/collector/map", icon: MapPin },
          { label: "My Pickups", href: "/collector/pickups", icon: Clipboard },
          { label: "Rates", href: "/collector/rates", icon: TrendingUp },
          { label: "Profile", href: "/profile", icon: User },
        ];
      case "shop":
        return [
          { label: "Dashboard", href: "/shop/dashboard", icon: LayoutGrid },
          { label: "Buy Requests", href: "/shop/requests", icon: Clipboard },
          { label: "Messages", href: "/messages", icon: MessageSquare },
          { label: "Profile", href: "/profile", icon: User },
        ];
      default:
        return [];
    }
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case "seller":
        return "Junk Owner";
      case "collector":
        return "Collector";
      case "shop":
        return "Shop Owner";
      default:
        return user?.role || "User";
    }
  };

  const navItems = getNavItems();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col md:flex-row">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden md:flex">
          <Sidebar>
            {/* Sidebar Header */}
            <SidebarHeader className="border-b px-4 py-4">
              <Link href="/home" className="flex items-center gap-2">
                <span className="font-bold text-green-700">Scraply</span>
              </Link>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent className="flex-1">
              <SidebarMenu>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href}>
                        <SidebarMenuButton
                          isActive={active}
                          className={`w-full justify-start ${active ? "bg-green-50 text-green-700" : ""}`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="h-auto p-2 gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold shrink-0">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                      <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{getRoleLabel()}</p>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/logout" method="post" as="button">
                    <SidebarMenuButton className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full justify-start">
                      <LogOut className="w-4 h-4" />
                      <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
        </div>

        {/* Main Content */}
        <SidebarInset className="md:flex-1">
          <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
            <main className="flex min-w-0 flex-1 w-full overflow-auto">
              {children}
            </main>
          </div>
        </SidebarInset>

        {/* Mobile Bottom Navigation - Visible only on small screens */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  active ? "text-green-700" : "text-gray-600"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </SidebarProvider>
  );
}