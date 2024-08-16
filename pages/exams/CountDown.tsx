import Text from "@/components/Text";
import React, { useEffect, useState } from "react";

const CountDown = ({
  timeR,
  isPaused,
  name,
}: {
  timeR?: number;
  isPaused: boolean;
  name?: string;
}) => {
  const [countdown, setCountdown] = useState<number>(timeR || 0);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      setCountdown((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins, secs };
  };

  const time = formatTime(countdown);

  return (
    <div className="text-center flex flex-col gap-2.5 mt-5">
      <Text type="body-16-semibold">{name}</Text>
      <div className="flex justify-center items-center">
        <div className="bg-[#0F5FAF] text-white w-[65.5px] h-[65.5px] flex items-center justify-center rounded text-[30px] font-black">
          {time.mins.toString().padStart(2, "0")}
        </div>
        <p className="w-5 h-[65.5px] text-[#355410] text-[30px] font-black flex items-center justify-center">
          :
        </p>
        <div className="bg-[#0F5FAF] text-white w-[65.5px] h-[65.5px] flex items-center justify-center rounded text-[30px] font-black">
          {time.secs.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default CountDown;
