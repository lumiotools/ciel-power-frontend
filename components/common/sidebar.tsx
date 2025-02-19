"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { AUTH_CONTEXT } from "@/providers/auth";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: "/dashboard.svg" },
  { name: "Audit Info", href: "/dashboard/expect", icon: "/peopleIcon.svg" },
  {name: "View Report" , href: "/dashboard/bookings/2559502143682185/reports", icon: '/file.svg'},
  // { name: "Proposals", href: "/dashboard/expect", icon: "/handIcon.svg" },
];

export function Sidebar() {
  const pathname = usePathname();

  const { logoutUser } = useContext(AUTH_CONTEXT);
  const router = useRouter();
  // const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLogout = async () => {
    const response = await (
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    ).json();

    if (response["message"]) {
      logoutUser();
      router.replace("/login");
    }
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col bg-gradient-to-b from-[#B9DD8B] via-[#99CD55] to-[#67B502] py-6 px-[22px] items-center">
      {/* Logo */}
      <div className="mb-[32px]">
        <img src="/logo.png" alt="Logo" className="h-16" />
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col w-full">
        <nav className="space-y-[10px]">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              asChild
              variant="ghost"
              className={cn(
                "flex items-center w-full justify-start rounded-full text-white text-sm font-medium p-6",
                pathname === item.href
                  ? "bg-gradient-to-r from-[#99CD55] to-[#76BC1C] text-white hover:text-white"
                  : "hover:bg-lime-500 hover:text-white"
              )}
            >
              <Link href={item.href}>
                <div className="flex items-center">
                  <img
                    src={item.icon}
                    alt={`${item.name} Icon`}
                    className="mr-3 h-6 w-6"
                  />
                  {item.name}
                </div>
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <Button
          variant="ghost"
          className="flex transition-all ease-in items-center space-x-2 text-white hover:text-black"
          onClick={handleLogout}
        >
          <LogOut className="h-10 w-10" />
          <span className="text-[15px]">Logout</span>
        </Button>
      </div>
    </div>
  );
}
