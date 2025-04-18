import React from "react";

const GoogleReview = () => {
  // Array of review data
  const reviews = [
    {
      id: 1,
      author: "Hostos Monegro",
      initials: "HM",
      date: "15/04/2025",
      rating: 5,
      color: "bg-green-500",
      review:
        "I had a great experience working with Natalie M. and her team at Ciel Power. She was professional, knowledgeable, and made the entire process smooth from start to finish. I appreciated how clearly she explained everything and how responsive she was to all of my questions. The service felt personalized, efficient, and well-managed.",
    },
    {
      id: 2,
      author: "James Van Ness",
      initials: "JV",
      date: "10/04/2025",
      rating: 5,
      color: "bg-blue-500",
      review:
        "I've done construction mostly on my own properties for over 50 years. I rarely hire the same contractor twice because it's pretty common for me to have quality issues with other contractors work. However, I was very pleased with not only the work but the execution process's used by Ciel POWER. Their field crew was top-notch and very accommodating to my specific needs on this project.",
    },
    {
      id: 3,
      author: "Matthew Gould",
      initials: "MG",
      date: "05/04/2025",
      rating: 5,
      color: "bg-purple-500",
      review:
        "Michael was amazing. He took the time to explain the process, how it works, what he looks for and walked me through next steps. Would highly recommend him to anyone looking to get a better understanding of their energy consumption and potential opportunities to improve the energy efficiency of their home.",
    },
    {
      id: 4,
      author: "JOHN PERRY",
      initials: "JP",
      date: "01/04/2025",
      rating: 5,
      color: "bg-orange-500",
      review:
        "A little while back we had a Ciel Power Energy audit by Jesse Lubkiewicz and was completely satisfied. Jesse was punctual and very professional as he did a complete examination of the interior and exterior of our home and he actually explained in terms we could comprehend of what he was doing. he did audit with no disruption to our home and left no mess, Jesse seemed to really like his work and talking with people.",
    },
    {
      id: 5,
      author: "Melodie Hodge",
      initials: "MH",
      date: "25/03/2025",
      rating: 5,
      color: "bg-red-500",
      review:
        "My initial appointment with Marvin went really well. He arrived on time and was very pleasant. He sat down and explained the process, made time for questions, and kept me updated with what he was doing along the way. Very great customer service overall, and super personable!",
    },
  ];

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={i}
          className="w-5 h-5 text-green-500 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="mt-12 mb-8 bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-700">
          Our Google Reviews
        </h3>
      </div>
      <div className="relative">
        <div className="flex space-x-6 overflow-x-auto pb-4 hide-scrollbar">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg border border-gray-200 p-6 min-w-[350px] max-w-[350px] flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full overflow-hidden mr-3 ${review.color} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {review.initials}
                </div>
                <div>
                  <div className="font-medium">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </div>
              <div className="flex mb-3">{renderStars(review.rating)}</div>
              <p className="text-gray-600 mb-4 flex-grow">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoogleReview;
