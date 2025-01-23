import { useState, useEffect } from "react";
import { getUserDetails } from "./userServices";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    try {
      const userData = await getUserDetails();
      setUser(userData);
    } catch (error) {
      setError((error as Error).message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error };
}
