import Button from "@/components/Button";
import Text from "@/components/Text";
import { cn } from "@/utils";
import React from "react";
import avt from "../../public/Images/mascot.png";
import Image from "next/image";

const Comment = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <div className="border-b pb-10">
        <Text className="text-[#041F4A] mt-10 mb-4" type="title-18-bold">
          Bình luận
        </Text>
        <textarea
          className="bg-[#F2F8FF] outline-none p-4 rounded-lg placeholder:text-[#AEC7E5] text-sm w-full h-24"
          placeholder="Nội dung bình luận của bạn"
        ></textarea>
        <Button type="btn-blue" className="mt-4">
          Gửi
        </Button>
      </div>
      <div>
        <div className="flex items-center gap-2 mt-5">
          <Image
            src={avt}
            alt=""
            width={50}
            height={50}
            className="rounded-full border border-[#0F5FAF]"
          />
          <div className="flex flex-col gap-1">
            <Text type="body-14-bold" color="main-color-primary">
              Name
            </Text>
            <Text type="body-14-regular">Comment</Text>
            <div>
              <div className="flex gap-3">
                <Text
                  type="body-14-regular"
                  color="main-color-primary"
                  className="cursor-pointer"
                >
                  Thích
                </Text>
                <Text
                  type="body-14-regular"
                  color="main-color-primary"
                  className="cursor-pointer"
                >
                  Phản hồi
                </Text>
                <Text type="body-14-regular" color="neutral-5">
                  1 phut
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
