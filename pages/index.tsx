import Image from "next/image";
import styles from "./page.module.css";
import Text from "@/components/Text";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Text type="title-24-bold" color="neutral-1">
          Khoá tiếng nhật quyết chiến N2
        </Text>
        <Button type="btn-secondary">test</Button>
        <TextInput placeholder="Email của bạn" label="Số điện thoại" required />
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
    </main>
  );
}
