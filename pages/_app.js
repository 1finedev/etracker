import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import GlobalContext from "../Context";
import { Layout } from "../components";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextNProgress color="green" options={{ showSpinner: false }} />
      <GlobalContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext>
    </SessionProvider>
  );
}

export default MyApp;
