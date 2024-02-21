import type { AppProps } from "next/app";
import type { ReactElement } from "react";
import { appWithTranslation } from "next-i18next";
import { NextPage } from "next";
import "@/global/scss/index.scss";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => typeof page | ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default appWithTranslation(MyApp);
