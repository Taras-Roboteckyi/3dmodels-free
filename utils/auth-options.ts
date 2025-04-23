import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // або "database" — якщо зберігаєш в базі
    maxAge: 30 * 24 * 60 * 60, // термін життя сесії користувача 30 днів у секундах
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub; // додає id з токена в session.user
      }
      return session;
    },
  }, // щоб отримати  user.id, а не лише email чи name
};
