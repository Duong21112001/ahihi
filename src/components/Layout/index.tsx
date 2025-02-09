import { ReactElement } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children?: ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        className="toastClassName"
      />
    </>
  );
};

export default Layout;
