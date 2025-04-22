import NextAuth from "next-auth";
import { authOptions } from "@utils/auth-options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/* Перевірка реєстрації http://localhost:3000/api/auth/signin */
