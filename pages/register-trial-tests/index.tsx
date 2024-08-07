import React, { useRef, useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { PopUpRef } from "@/components/ModalMessage";
import { registerTrialTest } from "@/service/register";
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
    try {
      await registerTrialTest(params);
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
    <div className={cn("flex  items-center justify-center", styles.bg)}>
      <div className="w-full flex-col flex items-center gap-10">
        <Time />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white w-[30%] p-6 rounded-xl"
          >
            <div className="flex flex-col gap-5">
              <Text type="title-32-bold" className="text-center">
                Đăng ký thi thử
              </Text>
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trình độ</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Trình độ" />
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
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Họ và tên" {...field} />
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
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Số điện thoại" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {apiError && <p className="text-red-500">{apiError}</p>}

            <Button
              type="submit"
              className="w-full mt-5"
              // onClick={() => router.push({ pathname: "/exam" })}
              disabled={!isFormFilled}
            >
              {loading ? "Đang đăng ký..." : "Đăng ký thi thử"}
            </Button>
          </form>
        </Form>
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
