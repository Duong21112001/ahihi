import Text from "@/components/Text";
import React, { useEffect, useState } from "react";

const CountDown = ({ isPaused }: { isPaused: boolean }) => {
  const [countdown, setCountdown] = useState(90 * 60);
  useEffect(() => {
    if (isPaused) return;
    const intervalId = setInterval(() => {
      setCountdown((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isPaused]);
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hrs, mins, secs };
  };
  const time = formatTime(countdown);

  return (
    <div className="text-center flex flex-col gap-2.5 mt-5">
      <Text type="body-16-semibold">Thời gian còn lại:</Text>
      <div className="flex justify-center items-center">
        <div className="bg-[#0F5FAF] text-white w-[65.5px] h-[65.5px] flex items-center justify-center rounded text-[30px] font-black">
          {time.hrs.toString().padStart(2, "0")}
        </div>
        <p className="w-5 h-[65.5px] text-[#355410] text-[30px] font-black flex items-center justify-center">
          :
        </p>
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
