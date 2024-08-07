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
  const names = trialTest.map((item) => item.name).join(" ,");
  return (
    <div className="bg-white border-[#0F5FAF] border-4 w-[30%] flex items-center justify-center py-10 rounded-2xl">
      {trialTest.length > 0 ? (
        <>
          <Text>Hiện tại đang có kì {names}</Text>
        </>
      ) : (
        "Hong có bài thi đâu"
      )}
    </div>
  );
};

export default Time;
