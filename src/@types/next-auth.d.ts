import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Adicione o ID do usuário
      email: string;
      role: string;
      name?: string | null; // Permitir nulo
      image?: string | null; // Permitir nulo
    } & DefaultSession["user"]; // Mantém todas as propriedades padrão do DefaultSession
  }

  interface User extends DefaultUser {
    id: string; // Adicione o ID do usuário
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string; // Adicione o ID do usuário
    email: string;
    role: string;
  }
}
