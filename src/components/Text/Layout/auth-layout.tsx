import { ReactElement } from "react";
import styles from "./index.module.scss";
import Text from "..";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children?: ReactElement;
}

const LayoutAuth: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles.authWrap}>
        <div className={styles.authContainer}>
          <div className={styles.left}>
            <Text type="heading-h1" color="neutral-1">
              Graphic
            </Text>
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
