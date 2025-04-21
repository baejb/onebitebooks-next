import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // 👉 getLayout이 함수가 아니면 기본 함수 사용
  const getLayout =
    typeof Component.getLayout === "function"
      ? Component.getLayout
      : (page: ReactNode) => page;

  return (
    <GlobalLayout>
      {/* 👉 Component 자체가 함수일 때만 렌더링 */}
      {typeof Component === "function"
        ? getLayout(<Component {...pageProps} />)
        : null}
    </GlobalLayout>
  );
}
