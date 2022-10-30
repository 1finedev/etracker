import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/authControllers";
import { find } from "../../../lib/dbApi";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        //1. check credentials for body data
        const { username, password } = credentials;
        if (!username || !password) {
          throw new Error("Incomplete credentials");
        }

        // 2. init user and check if user exists in DB
        try {
          const data = await find("User", {
            username,
          });
          const user = data.documents[0];

          if (!user) {
            throw new Error("User not found!");
          }
          //3) Verify user Password
          if (!(await verifyPassword(password, user.password))) {
            throw new Error("Incorrect password");
          }

          if (user.active) {
            throw new Error("Account has been suspended!");
          }

          user.password = undefined;
          user.userIp = undefined;
          return user;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  secret: process.env.COOKIE_SECRET,
  jwt: {
    encryption: true,
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      token && (session.user = token.user);
      session.password = undefined;
      session.userIp = undefined;
      return session;
    },
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
  },
  pages: { signIn: "/login", signOut: "/", error: "/login" },
};
export default NextAuth(authOptions);
