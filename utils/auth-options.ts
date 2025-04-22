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
};
