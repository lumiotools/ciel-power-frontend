"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  DollarSign,
  FileCheck,
  FileText,
  Home,
  LayoutDashboard,
  Leaf,
  LogOut,
  Percent,
  Zap,
} from "lucide-react";
import { useContext } from "react";
import { AUTH_CONTEXT } from "@/providers/auth";

export function Sidebar() {
  const pathname = usePathname();

  const { logoutUser } = useContext(AUTH_CONTEXT);
  const router = useRouter();

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

  const sidebarLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Your Report",
      href: "/dashboard/report",
      icon: <FileText size={20} />,
    },
    // {
    //   name: "Pearl Certification",
    //   href: "/pearl-certification",
    //   icon: <Award size={20} />,
    // },
    { name: "Incentives", href: "/incentives", icon: <DollarSign size={20} /> },
    { name: "Tax Credits", href: "/tax-credits", icon: <Percent size={20} /> },
    {
      name: "Document Portal",
      href: "/document-portal",
      icon: <FileCheck size={20} />,
    },
    {
      name: "Knowledge Base",
      href: "/knowledge-base",
      icon: <Zap size={20} />,
    },
    { name: "About Us", href: "/about-us", icon: <Home size={20} /> },
    {
      name: "Affiliate Program",
      href: "/affiliate-program",
      icon: <Leaf size={20} />,
    },
  ];

  return (
    <div className="w-64 bg-[#a6d66b] flex flex-col overflow-y-auto ">
      <div className="p-6">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Ciel Power Logo"
            width={130}
            height={50}
            className="mt-2"
          />
        </div>
      </div>

      {/* Sidebar buttons */}
      <div className="flex-1 flex flex-col gap-4 px-4 mt-4">
        {sidebarLinks.map((item) => (
          <Link key={item.name} href={item.href}>
            <button
              className={`w-full flex items-center gap-3 text-white p-3 pl-6 text-left hover:bg-[#8bc34a] rounded-full transition-all ease-in-out duration-150 ${
                item.href === pathname ? "bg-[#8bc34a]" : ""
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          </Link>
        ))}
      </div>

      <div className="p-6 mt-auto">
        <button
          className="flex items-center gap-2 text-white"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}
