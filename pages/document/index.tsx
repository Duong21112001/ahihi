import React, { useEffect, useState } from "react";
import DocumentPage from "./DocumentPage";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Menu from "./Menu";
import arrow from "../../public/svg/Vector 190 (Stroke).svg";
import img from "../../public/Images/Image.png";
import Layout from "@/components/Layout";
import { CategoriesProp, DocumentProps } from "@/utils/model/courses";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import clock from "../../public/svg/clock-circle.svg";
import eye from "../../public/svg/eye.svg";

const DocumentList = () => {
  const [documents, setDocuments] = useState<DocumentProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { category = "" } = router.query;

  useEffect(() => {
    if (category) {
      const fetchDocuments = async () => {
        try {
          const response = await fetch(
            `https://kosei-web.eupsolution.net/api/documents?category=${category}`
          );
          const data = await response.json();
          if (Array.isArray(data)) {
            console.log("document====", data);

            setDocuments(data);
          } else {
            setError("Data empty");
          }
        } catch (err) {
          setError("Failed");
        }
      };
      fetchDocuments();
    }
  }, [category]);

  const sliceData = documents?.slice(0, 1);
  const handleDocumentClick = (id: number) => {
    router.push(`/document-detail/${id}`);
  };
  const { convert } = require("html-to-text");
  const formatDate = (dateTimeString: any) => {
    return dateTimeString.split("T")[0];
  };
  return (
    <div>
      {sliceData.map((item) => (
        <div
          className="container flex flex-col items-center gap-[60px] max-xl:min-w-0 max-xl:px-6"
          key={item.id}
        >
          <Text type="title-32-bold">{item.title}</Text>
          <div className="flex items-center gap-10 justify-between w-full max-lg:flex-col">
            <div className="w-[40%] max-lg:w-full">
              <Text
                type="title-32-bold"
                className="tracking-[.2px] leading-[48px] mb-2"
              >
                {item.title}
              </Text>
              <Text type="title-18-regular" className="leading-7 line-clamp-5">
                {convert(convert(item.content))}
              </Text>
              <Button
                className="flex gap-1 mt-8"
                onClick={() => handleDocumentClick(item.id)}
              >
                Đọc tiếp
                <Image src={arrow} alt="" width={11.5} height={5.5} />
              </Button>
            </div>
            <img
              src={`https://kosei-web.eupsolution.net${item.thumbnail}`}
              // src={img}
              alt=""
              width={632}
              height={420}
              className="w-[60%] h-[420px] object-cover max-lg:w-full"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between w-full container max-xl:min-w-0 max-lg:flex-col max-xl:px-6">
        <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
          <Text type="title-28-bold" className="hidden max-lg:block">
            Bài viết liên quan
          </Text>
          {documents.map((it) => (
            <div
              className="border border-[#EDF2F7] rounded-lg w-[357px]"
              key={it.id}
              onClick={() => handleDocumentClick(it.id)}
            >
              <Image
                src={`https://kosei-web.eupsolution.net${it.thumbnail}`}
                alt=""
                height={212}
                width={360}
                className="max-h-[212px] object-cover"
              />

              <div className="p-4">
                <div className="border-b border-[#EDF2F7] pb-4">
                  <Text type="title-18-bold" className="text-[#093969]">
                    {convert(convert(it.title))}
                  </Text>
                  <Text
                    type="body-14-regular"
                    className="text-[#4A5568] line-clamp-2"
                  >
                    {convert(convert(it.content))}
                  </Text>
                </div>
                <div className="flex items-center justify-between pt-3 pb-2">
                  <div className="flex items-center gap-1">
                    <Image src={clock} alt="" />
                    <Text type="body-14-regular" className="text-[#A0AEC0]">
                      {it.created_at ? formatDate(it.created_at) : ""}
                    </Text>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image src={eye} alt="" />
                    <Text type="body-14-regular" className="text-[#A0AEC0]">
                      {it.views}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="max-lg:hidden">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default DocumentList;

DocumentList.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <DocumentPage>{page}</DocumentPage>
    </Layout>
  );
};
