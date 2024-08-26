import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import avt from "../../../public/Images/mascot.png";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { cn } from "@/utils";
import { useRecoilState } from "recoil";
import { userProfile } from "@/context/User";
const GetComment = ({
  className,
  documentId,
  isRefreshApi,
}: {
  className?: string;
  documentId: number;
  isRefreshApi: boolean;
}) => {
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<{
    [key: number]: { count: number; liked: boolean };
  }>({});
  const [unLikes, setUnLikes] = useState<{
    [key: number]: { count: number; liked: boolean };
  }>({});
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const token = getCookie("kosei-token");
  const [user, setUser] = useRecoilState(userProfile);
  console.log("tes");
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://kosei-web.eupsolution.net/api/document/${documentId}/comments`
      );
      console.log("Fetched comments:", response.data);
      setComments(response?.data?.reverse());
      const initialLikes = response.data.reduce((acc: any, comment: any) => {
        acc[comment.id] = { count: comment.likes || 0, liked: false };
        return acc;
      }, {});
      setLikes(initialLikes);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [documentId, isRefreshApi]);

  const timeAgo = (dateTime: string) => {
    const now = new Date();
    const commentTime = new Date(dateTime);
    const diff = Math.abs(now.getTime() - commentTime.getTime());

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 24) {
      return `${hours} giờ trước`;
    } else {
      return `${days} ngày trước`;
    }
  };
  const handleReplyClick = (commentId: number) => {
    if (replyCommentId === commentId) {
      setReplyCommentId(null);
    } else {
      setReplyCommentId(commentId);
    }
  };
  const handleReplyContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (commentId: number) => {
    try {
      const response = await axios.post(
        `https://kosei-web.eupsolution.net/api/comments/reply`,
        {
          user_id: user?.user_id,
          type: "document",
          document_id: documentId,
          content: replyContent,
          parent_id: commentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        }
      );
      console.log("Reply=========", response);

      if (response.status === 201) {
        setReplyCommentId(null);
        setReplyContent("");
        fetchComments();
      } else {
        alert("Phản hồi thất bại. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error replying to comment:", error);
      alert("Có lỗi xảy ra khi phản hồi bình luận.");
    }
  };
  const handleChangeLike = async (commentId: number) => {
    if (likes[commentId]?.liked) {
      // Nếu đã thích rồi, gọi unLike
      await handleUnLike(commentId);
    } else {
      // Nếu chưa thích, gọi like
      await handleLike(commentId);
    }
  };
  const handleLike = async (commentId: number) => {
    try {
      const response = await axios.post(
        `https://kosei-web.eupsolution.net/api/comments/${commentId}/like`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        }
      );

      if (response.status === 200) {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [commentId]: {
            count: prevLikes[commentId].count + 1,
            liked: true,
          },
        }));
      } else {
        alert("Like thất bại. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error liking comment:", error);
      alert("Có lỗi xảy ra khi like bình luận.");
    }
  };
  const handleUnLike = async (commentId: number) => {
    try {
      const response = await axios.post(
        `https://kosei-web.eupsolution.net/api/comments/${commentId}/unlike`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        }
      );

      if (response.status === 200) {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [commentId]: {
            count: (prevLikes[commentId]?.count || 1) - 1,
            liked: false,
          },
        }));
      } else {
        alert("unLike thất bại. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error unliking comment:", error);
      alert("Có lỗi xảy ra khi unlike bình luận.");
    }
  };

  return (
    <div>
      {comments.map((comment) => (
        <div className="flex gap-2 mt-5 flex-col" key={comment.id}>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <Image
                src={avt}
                alt=""
                width={50}
                height={50}
                className="rounded-full border border-[#0F5FAF] bg-[#0F5FAF]"
              />
              <Text type="body-14-bold" color="main-color-primary">
                {comment.user?.name}
              </Text>
            </div>

            <Text type="body-14-regular">{comment.content}</Text>
            <div>
              <div className="flex gap-3">
                <Text
                  type="body-14-regular"
                  color="main-color-primary"
                  className="cursor-pointer"
                  onClick={() => handleChangeLike(comment.id)}
                >
                  {likes[comment.id]?.liked ? "Đã thích" : "Thích"}
                </Text>
                <Text type="body-14-regular" color="neutral-5">
                  {likes[comment.id]?.count || 0} lượt thích
                </Text>
                <Text
                  type="body-14-regular"
                  color="main-color-primary"
                  className="cursor-pointer"
                  onClick={() => handleReplyClick(comment.id)}
                >
                  Phản hồi
                </Text>
                <Text type="body-14-regular" color="neutral-5">
                  {timeAgo(comment.created_at)}
                </Text>
              </div>
            </div>
          </div>
          {replyCommentId === comment.id && (
            <div className="ml-10 mt-4">
              <div className="flex gap-4">
                <Image
                  src={avt}
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-full border border-[#0F5FAF] bg-[#0F5FAF] h-fit"
                />
                <div className="flex items-end flex-col w-full">
                  <textarea
                    className="bg-[#F2F8FF] outline-none p-4 rounded-lg placeholder:text-[#AEC7E5] text-sm w-full h-24"
                    placeholder="Nội dung bình luận của bạn"
                    value={replyContent}
                    onChange={handleReplyContentChange}
                  ></textarea>
                  <Button
                    type="btn-blue"
                    className="mt-4 !w-fit !h-fit px-2 py-1 !text-sm !font-thin"
                    onClick={() => handleReplySubmit(comment.id)}
                  >
                    Phản hồi
                  </Button>
                </div>
              </div>
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-10 mt-4">
              {comment.replies.map(
                (reply: {
                  id: React.Key | null | undefined;
                  user: {
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  };
                  content:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                  created_at: string;
                }) => (
                  <div key={reply.id} className="flex gap-2 mt-2 flex-col">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <Image
                          src={avt}
                          alt=""
                          width={50}
                          height={50}
                          className="rounded-full border border-[#0F5FAF] bg-[#0F5FAF]"
                        />
                        <Text type="body-14-bold" color="main-color-primary">
                          {reply.user?.name}
                        </Text>
                      </div>

                      <Text type="body-14-regular">{reply.content}</Text>
                      <Text type="body-14-regular" color="neutral-5">
                        {timeAgo(reply.created_at)}
                      </Text>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GetComment;
