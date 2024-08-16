import { cn } from "@/utils";
import React from "react";
import Text from "@/components/Text";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

interface MenuDocumentItem {
  id: number;
  name: string;
  img: string;
}

const MenuDocument = ({
  className,
  title,
  items,
}: {
  className?: string;
  title: string;
  items: MenuDocumentItem[];
}) => {
  const router = useRouter();
  const handleDocumentClick = (id: number) => {
    router.push(`/document-detail/${id}`);
  };
  return (
    <div className={cn("bg-[#EEF5FF] rounded-lg h-fit w-full", className)}>
      <Text
        className="bg-[#0F5FAF] py-4 px-8 rounded-tl-lg rounded-tr-lg"
        type="title-18-bold"
        color="neutral-9"
      >
        {title}
      </Text>
      <div className=" px-8 pb-6">
        <div className="flex flex-col ">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between w-full border-b gap-2 border-[#CBD5E0] py-6 cursor-pointer"
              onClick={() => handleDocumentClick(item.id)}
            >
              <Image
                src={`https://kosei-web.eupsolution.net${item.img}`}
                alt={item.name}
                width={94}
                height={64}
                className="rounded-lg w-[94px] h-[64px]"
              />
              <Text
                className="text-[#2D3748] line-clamp-3"
                type="body-16-semibold"
              >
                {item.name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDocument;
