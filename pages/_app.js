import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import GlobalContext from "../Context";
import { Layout } from "../components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NextNProgress color="green" options={{ showSpinner: false }} />
        <GlobalContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalContext>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
