import "../styles/globals.css";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useSession, signIn } from "next-auth/react";
import { Loading } from "../components";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // const Auth = ({ children }) => {
  //   const { data: session, status } = useSession();
  //   const isUser = !!session?.user;
  //   useEffect(() => {
  //     if (status === "loading") return; // Do nothing while loading
  //     if (!isUser) signIn(); // If not authenticated, force log in
  //   }, [isUser, status]);

  //   if (isUser) {
  //     return children;
  //   }
  //   // Session is being fetched, or no user.
  //   // If no user, useEffect() will redirect to login page.
  //   return <Loading />; //show loading page while session is being fetched;
  // };

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
