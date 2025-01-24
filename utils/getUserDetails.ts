import { toast } from "sonner";

export const getUserDetails = async () => {
  const response = await fetch(`/api/auth/user-details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    // throw new Error(`Error: ${response.status}`);
    toast.error('Unable to fetch user details')
  }

  const data = await response.json();
  console.log("user details", data);

  if (!data["success"]) throw new Error(data["message"]);
  return data["data"]["userDetails"];
};
