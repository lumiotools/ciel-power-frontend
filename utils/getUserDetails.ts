export const getUserDetails = async () => {
    const response = await fetch(`/api/auth/user-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include"
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    const data = await response.json();

    if(!data["success"]) throw new Error(data["message"]);
    return data["data"]["userDetails"];
  };
  