export const getRecommendedVideos = async (bookingNumber: string) => {
  const response = await fetch(
    `/api/user/bookings/${bookingNumber}/recommended-videos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
    // toast.error('Unable to fetch recommended videos')
  }

  const data = await response.json();
  console.log("Recommended videos response:", data);

  return data || [];
};

export const getBookingDetails = async (bookingNumber: string) => {
  const response = await fetch(`/api/user/bookings/${bookingNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
    // toast.error('Unable to fetch booking details')
  }

  const data = await response.json();
  console.log("Booking details response:", data);

  return data?.data || [];
};

export const updateAuditorDetails = async (
  bookingNumber: string,
  auditorData: { auditorImageUrl?: string; auditorDescription?: string }
) => {
  const response = await fetch(`/api/user/bookings/${bookingNumber}/auditor`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(auditorData),
  });

  if (!response.ok) {
    throw new Error(`Error updating auditor details: ${response.status}`);
    // Optionally handle error UI here
  }

  const data = await response.json();
  console.log("Auditor update response:", data);

  return data;
};