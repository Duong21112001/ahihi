import Text from "@/components/Text";
import { TrialTests } from "@/utils/model/courses";
import React, { useEffect, useState } from "react";

const Time = () => {
  const [trialTest, setTrialTest] = useState<TrialTests[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTrial = async () => {
      try {
        const response = await fetch(
          "https://kosei-web.eupsolution.net/api/trial-tests"
        );
        const data = await response.json();
        console.log("trail=====", data);
        if (Array.isArray(data)) {
          setTrialTest(data);
        } else {
          setError("Data is not an array");
        }
      } catch (err) {
        setError("Failed");
      }
    };
    fetchTrial();
  }, []);
  const formatDateTime = (dateTimeString: any) => {
    const [date, time] = dateTimeString.split(" ");
    return `${time} ${date}`;
  };
  const names = trialTest.map((item) => item.level).join(" ,");
  const start = trialTest.map((item) => formatDateTime(item.start_date));
  const end = trialTest.map((item) => formatDateTime(item.end_date));
  return (
    <div className="bg-white border-[#0F5FAF] border-2 w-[30%] flex items-center justify-center py-10 rounded-2xl px-5">
      {trialTest.length > 0 ? (
        <div className="flex flex-col items-center">
          <Text className="text-[#003B9F]" type="title-18-bold">
            Kỳ thi {names}.
          </Text>
          <div className="text-[#003B9F] flex flex-col items-center">
            <Text type="title-18-bold">Thời gian diễn ra kỳ thi:</Text>
            <Text type="title-18-bold">
              {start} - {end}
            </Text>
          </div>
        </div>
      ) : (
        "Hong có bài thi đâu"
      )}
    </div>
  );
};

export default Time;
