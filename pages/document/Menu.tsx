import Text from "@/components/Text";
import { cn } from "@/utils";
import { CategoriesProp } from "@/utils/model/courses";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import img from "../../public/svg/arrowdocument.svg";
import Image from "next/image";

const Menu = ({ className }: { className?: string }) => {
  const [categories, setCategories] = useState<CategoriesProp[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response =
          await fetch(`https://kosei-web.eupsolution.net/api/document/categories
`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setError("Data empty");
        }
      } catch (err) {
        setError("Failed");
      }
    };
    fetchCategories();
  }, []);
  const handleCategoryClick = (categoryId: number) => {
    router.push(`/document?category=${categoryId}`);
  };
  return (
    <div className={cn("bg-[#EEF5FF] rounded-lg h-fit", className)}>
      <Text
        className="bg-[#0F5FAF] py-4 px-8 rounded-tl-lg rounded-tr-lg"
        type="title-18-bold"
        color="neutral-9"
      >
        DANH MỤC
      </Text>
      <div className=" px-8 pb-6">
        <div className="flex flex-col ">
          {categories.map((item) => (
            <div
              key={item.id}
              className="flex items-center  border-b gap-2 border-[#CBD5E0] p-4 cursor-pointer"
              onClick={() => handleCategoryClick(item.id)}
            >
              <Image src={img} alt="" width={11.5} height={5.5} />
              <Text className="text-[#2D3748]" type="body-16-semibold">
                {item.name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
