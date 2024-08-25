import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Text from "@/components/Text";
import Image from "next/image";
import clock from "../../../public/svg/clock-circle.svg";
import eye from "../../../public/svg/eye.svg";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import MenuDocument from "../MenuDocument";
import img from "../../../public/Images/Image.png";
import link from "../../../public/svg/combo shape.svg";
import Link from "next/link";
import Comment from "../Comment";
import DocumentPage from "../../document/DocumentPage";
import Menu from "../../document/Menu";
import Search from "../Search";
import { useRecoilState } from "recoil";
import { userProfile } from "@/context/User";
import HtmlToReact from "html-to-react";
interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_new: number;
}

interface DataItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  category: Category;
  created_by: string;
  status: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  views: number;
}
const DocumentDetail = () => {
  const [document, setDocument] = useState<DataItem | null>(null);
  const [documents, setDocuments] = useState<DataItem[]>([]);
  const [sliceDocuments, setSliceDocuments] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { convert } = require("html-to-text");
  const route = useRouter();
  const { id } = route.query;

  useEffect(() => {
    if (id) {
      const fetchDocumentDetail = async () => {
        try {
          const response = await fetch(
            `https://kosei-web.eupsolution.net/api/documents/${id}`
          );
          const data = await response.json();
          console.log("document====", data);

          setDocument(data);
        } catch (err) {
          setError("Failed to fetch document details");
        }
      };
      fetchDocumentDetail();
    }
  }, [id]);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          `https://kosei-web.eupsolution.net/api/documents`
        );
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError("Failed to fetch documents");
      }
    };
    fetchDocuments();
  }, [id]);

  const formatDate = (dateTimeString: any) => {
    return dateTimeString.split("T")[0];
  };
  const getRandomItems = (arr: DataItem[], n: number) => {
    const shuffled = arr.slice(0);
    let i = arr.length,
      t,
      j;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = t;
    }
    return shuffled.slice(0, n);
  };
  const latestDocument = documents
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 5)
    .map((doc) => ({
      id: doc.id,
      name: doc.title,
      img: doc.thumbnail,
    }));
  const randomDocument = getRandomItems(documents, 4).map((doc) => ({
    id: doc.id,
    name: doc.title,
    img: doc.thumbnail,
  }));

  const htmlToReactParser = new HtmlToReact.Parser();

  const parseHtmlContent = (html: string) => {
    return htmlToReactParser.parse(html);
  };
  return (
    <>
      <div className="container flex justify-between max-xl:px-6 max-xl:min-w-0 max-lg:gap-0">
        <div className="w-[60%] flex flex-col gap-4 max-xl:w-full">
          <Text className="text-[#0A427A]" type="title-24-bold">
            {document?.category.name}
          </Text>
          <div className="flex items-center justify-between pt-3 pb-2 border-b border-t border-[#EDF2F7] py-4">
            <div className="flex items-center gap-1">
              <Image src={clock} alt="" width={20} height={20} />
              <Text type="body-14-regular" className="text-[#A0AEC0]">
                {document?.created_at ? formatDate(document.created_at) : ""}
              </Text>
            </div>
            <div className="flex items-center gap-1">
              <Image src={eye} alt="" width={20} height={20} />
              <Text type="body-14-regular" className="text-[#A0AEC0]">
                {document?.views}
              </Text>
            </div>
          </div>
          <Text type="title-18-semibold" color="neutral-2">
            {document?.title}
          </Text>
          <div>
            <Text type="title-18-regular" color="neutral-3">
              {document?.category?.description}
            </Text>
            <Text type="title-18-regular" color="neutral-3" className="my-6">
              {/* {convert(convert(document?.content))} */}
              {document ? parseHtmlContent(document.content) : "Loading..."}
            </Text>
            <img
              src={`https://kosei-web.eupsolution.net${document?.thumbnail}`}
              // src={img}
              alt=""
              className="mt-8 w-full h-[422px] object-cover max-lg:w-auto max-lg:h-fit"
            />
          </div>

          <Comment className="w-full" documentId={document?.id ?? 0} />
        </div>
        <div className="w-[30%] flex flex-col items-center gap-8 max-lg:hidden">
          <Search />
          <Menu className="w-full" />
          <MenuDocument title={"BÀI VIẾT MỚI"} items={latestDocument} />
          <MenuDocument title={"TÀI LIỆU LIÊN QUAN"} items={randomDocument} />
        </div>
      </div>
    </>
  );
};

export default DocumentDetail;
DocumentDetail.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <DocumentPage>{page}</DocumentPage>
    </Layout>
  );
};
