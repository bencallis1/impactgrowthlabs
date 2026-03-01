import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const allowedEmail = process.env.PORTAL_USER_EMAIL;
        const passwordHash = process.env.PORTAL_USER_PASSWORD_HASH;

        if (!allowedEmail || !passwordHash) return null;
        if (credentials.email !== allowedEmail) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          passwordHash
        );
        if (!isValid) return null;

        return {
          id: "1",
          email: credentials.email as string,
          name: "Investor",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth;
    },
  },
});
