import React, { useState } from "react";
import Image from "next/image";
import img from "../../public/Images/cotton-sheep.png";
import Text from "@/components/Text";
import CountDown from "./CountDown";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Success from "../../public/Images/IMG1.png";
const Navbar = () => {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div className="w-1/4 border-l bg-[#f5f5f5] max-xl:w-full py-5">
      <div className="flex px-5 gap-4 border-b">
        <Image
          src={img}
          alt=""
          width={45}
          height={45}
          className="min-w-[45px] max-w-[45px]"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Text type="body-16-bold">Tên bài thi</Text>
            <Text
              type="body-14-bold"
              className="bg-[#0F5FAF] text-white px-2 py-[2px] rounded-xl"
            >
              Kỹ năng
            </Text>
          </div>

          <Text
            type="body-16-regular"
            className="border-2 w-fit px-3 py-1 border-[#0F5FAF] rounded-md"
          >
            Tên bài thi nhỏ
          </Text>
        </div>
      </div>
      <CountDown isPaused={isPaused} timeR={60 * 60} name="Thời gian còn lại" />
      <div className="p-4 ">
        <div className="mt-5 my-2.5">
          <Text type="body-16-semibold">Câu hỏi đã làm</Text>
        </div>
        <div className="grid grid-cols-8 gap-2 pr-10 cursor-pointer">
          {/* Các ô vuông câu hỏi */}
          {/* {question
              ?.flatMap((exam) => exam.questions)
              .map((q, index) => (
                <div
                  key={q?.id}
                  className={`p-2 border w-8 h-8 flex items-center justify-center rounded ${
                    answers[q?.id] ? "bg-[#0F5FAF] text-white" : "bg-white"
                  }`}
                >
                  {index + 1}
                </div>
              ))} */}
        </div>
        {/* Thời gian nghỉ giải lao */}
        {/* {isResting && currentTestIndex < parsedTests.length - 1 && (
            <>
              {countdownActive && (
                <div className="mt-6">
                  <CountDown
                    timeR={countdownTime}
                    isPaused={false}
                    name="Thời gian nghỉ giải lao"
                  />
                  <Button
                    className="w-full bg-red-500 text-white mt-4"
                    onClick={handleSkipRest}
                  >
                    Bỏ qua giờ nghỉ
                  </Button>
                </div>
              )}
            </>
          )} */}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          {/* {!disable && ( */}
          <Button
            // disabled={isButtonDisabled}
            className="bottom-0 ml-4"
            // onClick={handleSubmit}
          >
            Nộp bài
          </Button>
          {/* )} */}
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center justify-center gap-0">
          <Text type="title-20-bold" color="main-color-primary">
            Chúc mừng bạn đã hoàn thành bài thi
          </Text>
          <Image src={Success} width={180} height={180} alt={""} />
          <DialogDescription>
            {/* Hiển thị result */}
            {/* {result && <div className="text-green-600">{result}</div>} */}
          </DialogDescription>
          <DialogClose>
            <Button
              className="mt-5"
              // onClick={() => setShowDetail(!showDetail)}
            >
              Xem chi tiết
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
