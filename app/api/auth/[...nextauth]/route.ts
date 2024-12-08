import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    password: "admin", 
    apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY || "", 
  },
];

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials:", credentials);
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email et mot de passe sont requis.");
        }

        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
          console.log("User found:", user);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            apiKey: user.apiKey, 
          }; 
        } else {
          console.log("User not found."); 
          return null; 
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
  },
  pages: {
    signIn: "/login", 
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
