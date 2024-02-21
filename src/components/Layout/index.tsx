import { ReactElement } from "react";
import Footer from "../Footer";
import Header from "../Header";

interface LayoutProps {
  children?: ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
