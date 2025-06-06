"use client";

import { ChevronDown } from "lucide-react";
import type React from "react";
import { useRef, useState, useEffect } from "react";

interface Review {
  id: number;
  author: string;
  initials: string;
  date: string;
  rating: number;
  color: string;
  review: string;
}

interface GoogleReviewProps {
  bookingNumber?: string;
  apiEndpoint?: string;
}

const GoogleReview: React.FC<GoogleReviewProps> = ({
  bookingNumber,
  apiEndpoint = "/api/bookings",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/user/bookings/${bookingNumber}/google-reviews`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth method
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setReviews(data.data.reviews);

          setLastUpdated(data.data.last_updated);
        } else {
          throw new Error(data.error || "Failed to fetch reviews");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch reviews"
        );

        // Fallback to static data if API fails
        setReviews([
          {
            id: 1,
            author: "Yosef Sharbat",
            initials: "YS",
            date: "", // You can add a real date if available
            rating: 5,
            color: "bg-[#EE702E]",
            review:
              "Wow! Jesse was so nice, respectful and very knowledgeable! He was patient with me and answered all my questions with a smile on his face. I would definitely recommend Cielpower to audit your home.",
          },
          {
            id: 2,
            author: "Hostos Monegro",
            initials: "HM",
            date: "", // You can add a real date if available
            rating: 5,
            color: "bg-blue-500",
            review:
              "I had a great experience working with Natalie M. and her team at Ciel Power. She was professional, knowledgeable, and made the entire process smooth from start to finish. I appreciated how clearly she explained everything and how responsive she was to all of my questions. The service felt personalized, efficient, and well-managed. Would definitely recommend Ciel Power to anyone looking for energy efficiency services!",
          },
          {
            id: 3,
            author: "JOHN PERRY",
            initials: "JP",
            date: "", // You can add a real date if available
            rating: 5,
            color: "bg-green-500",
            review:
              "A little while back we had a Ciel Power Energy audit by Jesse Lubkiewicz and was completely satisfied. Jesse was punctual and very professional as he did a complete examination of the interior and exterior of our home and he actually explained in terms we could comprehend of what he was doing. he did audit with no disruption to our home and left no mess, Jesse seemed to really like his work and talking with people. Anyone requiring a Ciel Audit should ask for Jesse!",
          },
          {
            id: 4,
            author: "James Van Ness",
            initials: "JVN",
            date: "", // You can add a real date if available
            rating: 5,
            color: "bg-purple-500",
            review:
              "I’ve done construction mostly on my own properties for over 50 years. I rarely hire the same contractor twice because it’s pretty common for me to have quality issues with other contractors work.  However, I was very pleased with not only the work but the execution process's used by Ciel POWER. Their field crew was top-notch and very accommodating to my specific needs on this project. I just recommended them to my son, so that’s so that says something!",
          },
          {
            id: 5,
            author: "Fred Twum-Acheampong",
            initials: "FTA",
            date: "", // You can add a real date if available
            rating: 5,
            color: "bg-red-500",
            review:
              "Mason, Krystal, and the rest of the team were great! They performed a comprehensive audit of my home, installed a bunch of insulation to improve the efficiency of the house, and were friendly and accommodating the entire time. Highly recommend if you are looking for energy-improvement projects!",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookingNumber, apiEndpoint]);

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={i}
          className="w-5 h-5 text-[#EE702E] fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      );
    }
    return stars;
  };

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -370, // Width of card (350px) + gap (20px)
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 370, // Width of card (350px) + gap (20px)
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="mt-12 mb-8 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-700">
            Our Google Reviews
          </h3>
        </div>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EE702E]"></div>
          <span className="ml-2 text-gray-600">Loading reviews...</span>
        </div>
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="mt-12 mb-8 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-700">
            Our Google Reviews
          </h3>
        </div>
        <div className="flex justify-center items-center h-32">
          <div className="text-red-500">
            <p>Failed to load reviews: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-[#EE702E] text-white rounded hover:bg-orange-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-700">Our Google Reviews</h3>
        {lastUpdated && (
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {new Date(lastUpdated).toLocaleDateString()}
          </p>
        )}
        {error && (
          <p className="text-sm text-yellow-600 mt-1">
            Using cached data due to: {error}
          </p>
        )}
      </div>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg border-2 border-[#FFEBDC] p-6 min-w-[350px] max-w-[350px] flex flex-col shadow-sm hover:shadow-md hover:border-[#EE702E] transition-all duration-200 flex-shrink-0"
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
              <p className="text-gray-600 flex-grow">{review.review}</p>
              <div className="flex justify-end">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
        {reviews.length > 1 && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10 border border-[#EE702E] hover:bg-orange-50 transition-colors"
            >
              <ChevronDown className="rotate-90 text-[#EE702E]" size={24} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10 border border-[#EE702E] hover:bg-orange-50 transition-colors"
            >
              <ChevronDown className="-rotate-90 text-[#EE702E]" size={24} />
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default GoogleReview;
