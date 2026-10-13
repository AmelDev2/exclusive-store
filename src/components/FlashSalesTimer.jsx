import { useState, useEffect } from "react";

const FlashSalesTimer = () => {
  
  const targetDate = new Date("2026-11-01T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      } else {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-4">
      
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">Days</span>
        <span className="text-3xl font-bold tracking-wider">{timeLeft.days}</span>
      </div>
      <span className="text-[#DB4444] text-2xl font-bold pt-4">:</span>

      
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">Hours</span>
        <span className="text-3xl font-bold tracking-wider">{timeLeft.hours}</span>
      </div>
      <span className="text-[#DB4444] text-2xl font-bold pt-4">:</span>


      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">Minutes</span>
        <span className="text-3xl font-bold tracking-wider">{timeLeft.minutes}</span>
      </div>
      <span className="text-[#DB4444] text-2xl font-bold pt-4">:</span>

      
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500">Seconds</span>
        <span className="text-3xl font-bold tracking-wider">{timeLeft.seconds}</span>
      </div>
    </div>
  );
};

export default FlashSalesTimer;