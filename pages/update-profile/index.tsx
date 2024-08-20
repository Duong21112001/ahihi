import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
const DATA = [
  {
    value: 0,
    text: "Nam",
  },
  {
    value: 1,
    text: "Nữ",
  },
];
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const UpdateProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("hihi");
  };
  return (
    <div className="container">
      <Text type="title-28-bold">Thông tin tài khoản</Text>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center"
        >
          <div className=" flex flex-col items-center w-[60%] ">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex  items-center w-full gap-10">
                  <FormLabel className="w-[20%]">Họ và tên</FormLabel>
                  <FormControl>
                    <div className="flex items-center w-full gap-2">
                      <Input placeholder="shadcn" {...field} />
                      <Image
                        src="/svg/edit.svg"
                        alt="edit"
                        layout="fixed"
                        width={20}
                        height={20}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex  items-center w-full gap-10">
                  <FormLabel className="w-[20%]">Số điện thoại</FormLabel>
                  <FormControl>
                    <div className="flex items-center w-full gap-2">
                      <Input placeholder="shadcn" {...field} />
                      <Image
                        src="/svg/edit.svg"
                        alt="edit"
                        layout="fixed"
                        width={20}
                        height={20}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex  items-center w-full gap-10">
                  <FormLabel className="w-[20%]">Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="flex items-center w-full gap-2">
                      <Input placeholder="shadcn" {...field} />
                      <Image
                        src="/svg/edit.svg"
                        alt="edit"
                        layout="fixed"
                        width={20}
                        height={20}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex items-center w-full gap-10">
                  <FormLabel className="w-[20%]">Địa chỉ</FormLabel>
                  <FormControl>
                    <div className="flex items-center w-full gap-2">
                      <Input placeholder="shadcn" {...field} />
                      <Image
                        src="/svg/edit.svg"
                        alt="edit"
                        layout="fixed"
                        width={20}
                        height={20}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center w-full gap-10">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel className="w-[20%]">Giới tính</FormLabel>

                    <FormControl className="border-none bg-[#F2F8FF]">
                      <SelectTrigger className=" focus-visible:ring-offset-0 focus-visible:ring-0 outline-none">
                        <div className="flex items-center gap-3">
                          <SelectValue placeholder="Giới tính" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {React.Children.toArray(
                        DATA.map((item) => (
                          <SelectItem value={String(item.value)}>
                            {item.text}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProfile;
UpdateProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
