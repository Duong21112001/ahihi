import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Text from "@/components/Text";
import { CategoriesProp } from "@/utils/model/courses";
import { useRouter } from "next/router";

const Document = () => {
  const [categories, setCategories] = useState<CategoriesProp[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://kosei-web.eupsolution.net/api/document/categories`
        );
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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 ">
        <Text type="body-16-regular">Tài liệu</Text>
        <svg
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.414376 0.531506C0.673133 0.20806 1.1451 0.155619 1.46855 0.414376L6.00003 4.03956L10.5315 0.414376C10.855 0.155619 11.3269 0.20806 11.5857 0.531506C11.8444 0.854953 11.792 1.32692 11.4685 1.58568L6.46855 5.58568C6.19464 5.80481 5.80542 5.80481 5.53151 5.58568L0.531506 1.58568C0.20806 1.32692 0.155619 0.854953 0.414376 0.531506Z"
            fill="#090A0B"
          />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative z-[9999] flex flex-col gap-4">
        {categories.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-1"
            onClick={() => handleCategoryClick(item.id)}
          >
            <DropdownMenuItem>{item.name}</DropdownMenuItem>
            {item.is_new === 1 && (
              <Text
                className="bg-[#CF0D31] w-fit text-[8px] uppercase p-1 rounded flex items-center justify-center"
                color="neutral-10"
              >
                New
              </Text>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Document;
