import React, { useState } from "react";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { cn } from "@/utils";
import avt from "../../public/Images/mascot.png";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { userProfile } from "@/context/User";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";

const Comment = ({
  className,
  documentId,
}: {
  className?: string;
  documentId: number;
}) => {
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useRecoilState(userProfile);
  const searchParams = useSearchParams();
  const token = getCookie("kosei-token");

  const handleSubmit = async () => {
    if (comment.trim() === "") {
      alert("Nội dung bình luận không được để trống");
      return;
    }
    console.log("token====", token);

    try {
      const response = await fetch(
        "https://kosei-web.eupsolution.net/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: comment,
            type: "document",
            document_id: documentId,
            user_id: user?.user_id,
            // image_path: user?.avatar,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Bình luận đã được gửi thành công!");
        setComment("");
      } else {
        alert("Gửi bình luận thất bại. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi gửi bình luận.");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    console.log("Comment====", value);
  };
  return (
    <div className={cn("", className)}>
      <div className="border-b pb-10">
        <Text className="text-[#041F4A] mt-10 mb-4" type="title-18-bold">
          Bình luận
        </Text>
        <textarea
          className="bg-[#F2F8FF] outline-none p-4 rounded-lg placeholder:text-[#AEC7E5] text-sm w-full h-24"
          placeholder="Nội dung bình luận của bạn"
          value={comment}
          onChange={handleChange}
        ></textarea>
        <Button type="btn-blue" className="mt-4" onClick={handleSubmit}>
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
            className="rounded-full border border-[#0F5FAF] bg-[#0F5FAF]"
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
