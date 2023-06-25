import RootLayout from "@/ components/RootLayout";
import { Courgette } from "next/font/google";

import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

const courgette = Courgette({ weight: "400", subsets: ["latin"] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  // return getLayout(<Component {...pageProps} />);
  return (
    <main className={courgette.className}>
      <RootLayout>
        {/* {getLayout(<Component {...pageProps} />)} */}
        <Component {...pageProps} />
      </RootLayout>
    </main>
  );
}
