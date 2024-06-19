import type { AppProps } from "next/app";
import type { ReactElement } from "react";
import { appWithTranslation } from "next-i18next";
import { NextPage } from "next";
import "../global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserProvider from "@/context/User";
import "./styles.module.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => typeof page | ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>;
}

export default appWithTranslation(MyApp);
