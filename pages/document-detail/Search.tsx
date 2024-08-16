import React, { useEffect, useState } from "react";
import Image from "next/image";
import search from "../../public/svg/search.svg";
import { Input } from "@/components/ui/input";
import { Router } from "lucide-react";
import { useRouter } from "next/router";

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
  thumbnail: string | null;
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
const Search = () => {
  const [documents, setDocuments] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredDocuments, setFilteredDocuments] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          `https://kosei-web.eupsolution.net/api/documents`
        );
        const data = await response.json();
        setDocuments(data);
        setFilteredDocuments(data);
      } catch (err) {
        setError("Failed to fetch documents");
      }
    };
    fetchDocuments();
  }, []);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    console.log("Search====", term);

    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredDocuments(documents);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const filtered = documents.filter((doc) =>
        doc.title.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredDocuments(filtered);
    }
  };
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/document-detail/${id}`);
  };
  return (
    <div className="w-full">
      <div className="border flex items-center rounded-lg px-4 w-full">
        <Image src={search} alt="" width={24} height={24} />
        <Input
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Tìm kiếm"
          onChange={handleSearchChange}
          value={searchTerm}
        />
      </div>
      {searchTerm && (
        <div className="mt-4 bg-white shadow-md p-4 rounded-lg">
          {filteredDocuments.length === 0 ? (
            <p>No results found for {searchTerm}</p>
          ) : (
            <ul>
              {filteredDocuments.map((doc) => (
                <li
                  key={doc.id}
                  className="mb-2 cursor-pointer hover:text-[#0F5FAF]"
                  onClick={() => handleClick(doc.id)}
                >
                  <h3 className="text-lg font-semibold">{doc.title}</h3>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
