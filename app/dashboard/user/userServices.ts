export const getUserDetails = async () => {
    const cookies = document.cookie;
    const getCookieValue = (cookieName) => {
      const cookiesArray = cookies.split("; ").map((cookie) => cookie.split("="));
      const cookie = cookiesArray.find(([key]) => key === cookieName);
      return cookie ? decodeURIComponent(cookie[1]) : null;
    };
  
    const idToken = getCookieValue("id_token");
  
    const response = await fetch("https://ciel-power-backend.onrender.com/user/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `id_token=${idToken}`,
      },
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  };
  