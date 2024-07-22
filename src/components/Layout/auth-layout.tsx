import { ReactElement } from "react";
import styles from "./index.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import img from "../../../public/Images/Group 1597882892.png";
import logo from "../../../public/Images/logo-kosei.png";
import { cn } from "@/utils";
interface LayoutProps {
  children?: ReactElement;
}

const LayoutAuth: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles.authWrap}>
        <div className={cn("max-lg: justify-between", styles.authContainer)}>
          <div className="bg-white py-3 px-2 rounded-br-[20px] rounded-bl-[20px] w-fit fixed top-0 ">
            <Image src={logo} alt="" width={122} />
          </div>
          <div className={styles.left}>
            <Image src={img} alt="" className="max-w-[813px] max-lg:hidden" />
          </div>
          <div className={styles.right}>
            <div className={styles.rightBackground}>{children}</div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        className="toastClassName"
      />
    </>
  );
};

export default LayoutAuth;
