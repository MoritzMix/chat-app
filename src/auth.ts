import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Your own logic for dealing with plaintext password strings; be careful!

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPage = nextUrl.pathname.startsWith("/room");
      if (isOnPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/room", nextUrl));
      }
      return true;
    },
    async session({ session, token }) {
      // @ts-ignore Dont want emailVerified in my data
      session.user = {
        id: token.sub ?? "",
        email: token.email ?? "",
        name: token.name ?? "",
        image: token.picture ?? "",
      };
      return session; // The return type will match the one returned in `useSession()`
    },
  },
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;
          const passwordsMatch = password == user.pwhash; //await bcrypt.compare(password, user.pwhash);

          if (passwordsMatch) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              image: user.image,
            };
          }
          return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
