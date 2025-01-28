import type React from "react";
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  startTime: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      
      const start = new Date(startTime);
      const diff = start.getTime() - now.getTime();

      if (diff <= 0) {
        return "Started";
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    };

    setTimeRemaining(calculateTimeRemaining());

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  if (timeRemaining === null) {
    return null;
  }

  return (
    <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-full ml-2 ">
      <svg
        className="w-3 h-3 mr-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
      {timeRemaining}
      <span className="ml-1 text-sm">for visit ⁠</span>
    </div>
  );
};

export default CountdownTimer;
