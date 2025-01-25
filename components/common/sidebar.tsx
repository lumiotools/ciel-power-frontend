"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
  { name: "What to Expect", href: "/dashboard/expect", icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
        <div className="flex flex-col flex-grow">
          <nav className="flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
