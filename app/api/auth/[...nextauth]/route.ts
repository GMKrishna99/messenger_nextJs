import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";

// login credentials provider
import CredentialsProvider from "next-auth/providers/credentials";

// import social account login provider
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// prisma adapter
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// prisma db
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // github login and sign up provider
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // google login and sign up provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // credentials for login and sign up provider
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      //   check user credentials

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }
        // to check the user account
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        // if user has already registered or have ana account
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        // to check user enter the correct password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        // if password is not correct
        if (!isCorrectPassword) {
          throw new Error("invalid Credentials");
        }
        // if user passed all credentials return the user
        return user;
      },
    }),
  ],
  //   useful for development only you can debug when you are in development
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
