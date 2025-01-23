export const getUserDetails = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/user-details`, {
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
    return data;
  };
  