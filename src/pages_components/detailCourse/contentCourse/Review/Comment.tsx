import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { cn } from "@/utils";
import avt from "../../public/Images/mascot.png";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { userProfile } from "@/context/User";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import GetComment from "./GetComment";
// import GetComment from "./GetComment";

const Comment = ({
  className,
  courseId,
}: {
  className?: string;
  courseId: any;
}) => {
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useRecoilState(userProfile);
  const [comments, setComments] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshApi, setIsRefreshApi] = useState(false);
  const searchParams = useSearchParams();
  const token = getCookie("kosei-token");

  const handleSubmit = async () => {
    if (comment.trim() === "") {
      alert("Nội dung bình luận không được để trống");
      return;
    }
    console.log("token====", token);
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://kosei-web.eupsolution.net/api/comments",
        {
          content: comment,
          type: "course",
          course_id: courseId,
          user_id: user?.user_id,
          image_path: user?.avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        }
      );
      console.log("Response", response);

      if (response.status === 200) {
        setIsRefreshApi(!isRefreshApi);
        // alert("Bình luận đã được gửi thành công!");
        setComment("");
        setComments((prevComments) => [response.data, ...prevComments]);
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

      <GetComment isRefreshApi={isRefreshApi} courseId={courseId} />
    </div>
  );
};

export default Comment;
