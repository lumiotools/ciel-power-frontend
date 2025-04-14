"use client";
import { getUserDetails } from "@/utils/getUserDetails";
import React, { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const AUTH_CONTEXT = createContext<{
  isLoading: boolean;
  isLoggedIn: boolean;
  userDetails?: UserDetails;
  checkAuth: () => void;
  logoutUser: () => void;
}>({
  isLoading: true,
  isLoggedIn: false,
  checkAuth: () => {},
  logoutUser: () => {},
});

export interface UserDetails {
  firstName: string;
  lastName: string;
  emailAddress: string;
  admin?: boolean | undefined;
  bookeoCustomerId?: string;
  bookingNumber?: string;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = () => {
    getUserDetails()
      .then((userDetails) => {
        setUserDetails(userDetails);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (
      !isLoading &&
      !isLoggedIn &&
      (pathname.includes("/dashboard") || pathname.includes("/admin"))
    ) {
      router.replace("/login");
    }

    if (
      !isLoading &&
      isLoggedIn &&
      userDetails?.admin &&
      pathname.includes("/dashboard")
    ) {
      router.replace("/admin");
    }

    if (
      !isLoading &&
      isLoggedIn &&
      !userDetails?.admin &&
      pathname.includes("/admin")
    ) {
      router.replace("/dashboard");
    }

    if (
      !isLoading &&
      isLoggedIn &&
      ["/login", "/signup", "/forgot-password"].includes(pathname)
    ) {
      if (userDetails?.admin) {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isLoading, isLoggedIn, router, pathname]);

  function logoutUser() {
    setIsLoggedIn(false);
  }
  return (
    <AUTH_CONTEXT.Provider
      value={{ isLoading, isLoggedIn, userDetails, checkAuth, logoutUser }}
    >
      {children}
    </AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
