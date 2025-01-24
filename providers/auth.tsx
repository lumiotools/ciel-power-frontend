"use client";
import { getUserDetails } from "@/utils/getUserDetails";
import React, { createContext, useEffect, useState } from "react";

export const AUTH_CONTEXT = createContext<{
  isLoading: boolean;
  isLoggedIn: boolean;
  userDetails?: UserDetails;
  checkAuth: () => void;
}>({
  isLoading: true,
  isLoggedIn: false,
  checkAuth: () => {},
});

interface UserPhoneNumber {
  number: string;
  type: "mobile" | "work" | "home" | "fax";
}

interface UserStreetAddress {
  line1: string;
  line2: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumbers: UserPhoneNumber[];
  streetAddress: UserStreetAddress;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>();

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

  return (
    <AUTH_CONTEXT.Provider
      value={{ isLoading, isLoggedIn, userDetails, checkAuth }}
    >
      {children}
    </AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
