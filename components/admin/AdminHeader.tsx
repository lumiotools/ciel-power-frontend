"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AUTH_CONTEXT } from "@/providers/auth";

export function AdminHeader() {
  const { logoutUser } = useContext(AUTH_CONTEXT);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (data.message) {
        logoutUser();
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-[#a4d65e] to-[#5cb85c] text-white p-2 rounded-md mr-3">
            <span className="font-bold text-lg">CP</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Ciel Power Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Admin</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
