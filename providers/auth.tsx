"use client";
import { getUserDetails } from "@/utils/getUserDetails";
import React, { createContext, useEffect, useState } from "react";

export const AUTH_CONTEXT = createContext({
  isLoading: true,
  isLoggedIn: false,
  userDetails: {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
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
  });

  return (
    <AUTH_CONTEXT.Provider value={{ isLoading, isLoggedIn, userDetails }}>
      {children}
    </AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
