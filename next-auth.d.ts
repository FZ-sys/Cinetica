import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    apiKey: string; 
  }

  interface Session {
    user: User;
  }
}
