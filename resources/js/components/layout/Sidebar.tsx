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
} from "lucide-react";
import { User as UserType } from "@/types/user.type";

export default function Sidebar() {
  const { auth } = usePage<{ auth: { user: UserType } }>().props;
  const user = auth?.user;
  
  const currentPath = usePage().url;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/");

  // Navigation items based on role
  const getNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case "seller":
        return [
          { label: "Home", href: "/home", icon: Home },
          { label: "My Listings", href: "/seller/listings", icon: Clipboard },
          { label: "Messages", href: "/messages", icon: MessageSquare },
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
    <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/home" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-700 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-lg font-bold text-green-700">Scraply</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Card - Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{getRoleLabel()}</p>
          </div>
        </div>

        <Link
          href="/logout"
          method="post"
          as="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </Link>
      </div>
    </aside>
  );
}