import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    apiKey: string; 
  }

  interface Session extends DefaultSession {
    user: User; 
  }

  interface JWT {
    user: User; 
  }
}
