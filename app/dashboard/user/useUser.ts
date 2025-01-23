// src/components/Navbar/user/useUser.js
import { useState, useEffect } from "react";
import { getUserDetails } from "./userServices";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const userData = await getUserDetails();
      setUser(userData);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error };
}
