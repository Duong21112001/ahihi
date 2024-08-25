import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

import { Button } from "@/components/ui/button";
import avt from "../../public/Images/congrats you join the e-course successfully.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/router";
import { cn } from "@/utils";
import Time from "./Time";
import Text from "@/components/Text";
import { registerTrialTest } from "@/service/register";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import img from "../../public/Images/cloud-sun-right.png";
import user from "../../public/Images/user-circle.png";
import sdt from "../../public/Images/sdt.png";
import mail from "../../public/Images/mail.png";
import rank from "../../public/Images/rank.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const REQUIRED = "Không được bỏ trống trường này";
const INVALID_PHONE = "Số điện thoại không hợp lệ";
const FormSchema = z.object({
  level: z.string().nonempty(REQUIRED),
  username: z.string().min(2, {
    message: REQUIRED,
  }),
  phone: z
    .string()
    .min(10, {
      message: INVALID_PHONE,
    })
    .max(10, { message: INVALID_PHONE }),
  email: z.string().min(1, { message: REQUIRED }).email("Email không hợp lệ."),
});
const LEVEL = [
  {
    level: "N1",
    value: 1,
  },
  {
    level: "N2",
    value: 2,
  },
  {
    level: "N3",
    value: 3,
  },
  {
    level: "N4",
    value: 4,
  },
  {
    level: "N5",
    value: 5,
  },
];
const breadcrumb = [
  {
    label: "Trang chủ",
    link: "/",
  },
  {
    label: "Thư viện đề thi",
    link: "/my-course",
  },
];
const RegisterTrialTests = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      level: "",
      username: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    setApiError(null);

    const level_id = Number(data.level);

    const params = {
      name: data.username,
      mobile: data.phone,
      email: data.email,
      level_id: level_id,
    };
    console.log("Dữ liệu gửi đi:", params);

    try {
      await registerTrialTest(params);
      localStorage.setItem("isRegistered", "true");
      console.log(
        "Đã lưu vào localStorage:",
        localStorage.getItem("isRegistered")
      );

      alert("Đăng ký thành công!");
      router.push({ pathname: "/exam" });
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      setApiError("Đăng ký thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  const { level, username, phone, email } = form.watch();

  const isFormFilled = level && username && phone && email;

  return (
    <div>
      <div className={styles.breadcrumb}>
        <Breadcrumb breadcrumbs={breadcrumb} />
      </div>
      <div
        className={cn(
          "flex  items-center justify-center relative max-lg:gap-5",
          styles.bg
        )}
      >
        <Image src={img} alt="" className="absolute top-0 left-0" />

        <div className="w-full flex-col flex items-center gap-10 max-lg:px-6">
          <div style={{ margin: "0 auto", display: "flex" }}>
            <Text type="title-32-bold" className="relative z-50">
              THI THỬ JLPT
            </Text>
          </div>
          <div className="flex gap-10 items-center max-lg:gap-3 max-lg:flex-col">
            <div className="bg-white px-8 py-6 rounded-[40px] flex flex-col items-center gap-1 shadow-md max-lg:px-4 max-lg:py-2 max-lg:rounded-3xl max-lg:gap-0">
              <Text
                type="title-20-regular"
                color="main-color-primary"
                className="max-lg:text-base"
              >
                Học viên đang thi
              </Text>
              <Text type="title-32-bold" color="main-color-primary">
                1000
              </Text>
            </div>
            <div className="bg-[#003B9F] px-8 py-6 rounded-[40px] flex flex-col items-center gap-1 max-lg:px-4 max-lg:py-2 max-lg:rounded-3xl max-lg:gap-0">
              <Text
                type="title-32-bold"
                color="neutral-10"
                className="max-lg:text-xl"
              >
                10.000 +
              </Text>
              <Text type="title-20-regular" color="neutral-10">
                Thí sinh đã tham gia thi
              </Text>
            </div>
            <div className="bg-[#003B9F] px-8 py-6 rounded-[40px] flex flex-col items-center gap-1 max-lg:px-4 max-lg:py-2 max-lg:rounded-3xl max-lg:gap-0">
              <Text
                type="title-32-bold"
                color="neutral-10"
                className="max-lg:text-xl"
              >
                90 ~ 95%
              </Text>
              <Text
                type="title-20-regular"
                color="neutral-10"
                className="max-lg:text-base"
              >
                Tỷ lệ sát đề thi
              </Text>
            </div>
          </div>
          <Time />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white w-[30%] p-6 rounded-xl shadow-lg max-lg:w-full"
            >
              <div className="flex flex-col gap-4">
                <Text type="title-32-bold" className="text-center">
                  Đăng ký thi thử
                </Text>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="bg-[#F2F8FF] flex items-center py-1 px-3 rounded-lg ">
                          <Image
                            src={user}
                            alt=""
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          <Input
                            placeholder="Họ và tên"
                            {...field}
                            className="bg-[#F2F8FF] border-none placeholder:text-[#AEC7E5] placeholder:text-sm focus-visible:ring-offset-0 focus-visible:ring-0 outline-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="bg-[#F2F8FF] flex items-center py-1 px-3 rounded-lg">
                          <Image
                            src={sdt}
                            alt=""
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          <Input
                            placeholder="Số điện thoại"
                            {...field}
                            className="bg-[#F2F8FF] border-none placeholder:text-[#AEC7E5] placeholder:text-sm focus-visible:ring-offset-0 focus-visible:ring-0 outline-none"
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="bg-[#F2F8FF] flex items-center py-1 px-3 rounded-lg">
                          <Image
                            src={mail}
                            alt=""
                            width={20}
                            height={20}
                            mr-2
                          />
                          <Input
                            placeholder="Email"
                            {...field}
                            className="bg-[#F2F8FF] border-none placeholder:text-[#AEC7E5] placeholder:text-sm focus-visible:ring-offset-0 focus-visible:ring-0 outline-none"
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="border-none bg-[#F2F8FF]">
                          <SelectTrigger className=" focus-visible:ring-offset-0 focus-visible:ring-0 outline-none">
                            <div className="flex items-center gap-3">
                              <Image src={rank} alt="" width={20} height={20} />
                              <SelectValue placeholder="Trình độ" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {React.Children.toArray(
                            LEVEL.map((item) => (
                              <SelectItem value={String(item.value)}>
                                {item.level}
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
              {apiError && <p className="text-red-500">{apiError}</p>}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    // type="submit"
                    className="w-full mt-5"
                    disabled={!isFormFilled}
                  >
                    {loading ? "Đang đăng ký..." : "Đăng ký thi thử"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center">
                  <Text type="title-24-bold" className="text-[#0F5FAF]">
                    Đăng ký thành công
                  </Text>
                  <Text type="body-14-semibold" className="text-[#718096]">
                    Bạn đã đăng ký thông tin thành công. Hãy chuẩn bị cho kì thi
                    nào!
                  </Text>
                  <Image src={avt} alt="" width={192} height={140} />
                  <div className="flex gap-2">
                    <Button
                      // type="submit"
                      className="w-full mt-5 border border-[#0F5FAF] text-[#0F5FAF]"
                      disabled={!isFormFilled}
                      variant="outline"
                    >
                      Để sau
                    </Button>
                    <Button
                      type="submit"
                      className="w-full mt-5"
                      disabled={!isFormFilled}
                      onClick={() => router.push("/exam")}
                    >
                      Vào thi
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterTrialTests;
RegisterTrialTests.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
