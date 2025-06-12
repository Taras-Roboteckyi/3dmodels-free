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
    async jwt({ token, user }) {
      // Коли користувач логіниться вперше
      if (user) {
        token.sub = user.id;
        token.picture = user.image; // ← додаємо зображення
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string; // додає id з токена в session.user//
        session.user.image = token.picture as string; // ← дозволяє оновлювати аватар
      }
      return session;
    },
  }, // щоб отримати  user.id, а не лише email чи name
};
