"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation"
import {
  Bell,
  Calendar,
  Globe,
  LoaderCircle,
  Menu,
  Plus,
  Search,
} from "lucide-react";

// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { AUTH_CONTEXT } from "@/providers/auth";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const sidebarItems = [
  { name: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
  { name: "Create Booking", href: "/dashboard", icon: Plus },
  { name: "What to Expect", href: "/dashboard/expect", icon: Globe },
];

export function Navbar() {
  // const pathname = usePathname()

  const { isLoading, isLoggedIn, logoutUser } = useContext(AUTH_CONTEXT);
  const router = useRouter();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg> */}
          <span className="font-bold sm:inline-block">Ciel Power</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {/* <div className="hidden md:flex">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "mx-2",
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div> */}
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-gray-100 pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:block relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
          </Button>
          {isLoading ? (
            <Button className="w-20" variant="outline">
              <LoaderCircle className="animate-spin h-5 w-5" />
            </Button>
          ) : isLoggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button>
                <Link href="/signup">
                  {/* Wrap the text with Link, and avoid using 'to' */}
                  Sign Up
                </Link>
              </Button>
              <Button variant="outline">
                <Link href="/login">
                  {/* Wrap the text with Link, and avoid using 'to' */}
                  Login
                </Link>
              </Button>
            </>
          )}

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="mb-3">Menu</SheetTitle>
              </SheetHeader>
              <div className="space-y-4">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSheetOpen(false)}
                    className={`flex items-center space-x-3 p-2 rounded-md ${
                      pathname === item.href
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
