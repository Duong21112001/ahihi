import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactElement } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children?: ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Header />
      <div>{children}</div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        className="toastClassName"
      />
    </div>
  );
};

export default Layout;
