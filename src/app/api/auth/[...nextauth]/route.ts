// @ts-nocheck

import NextAuth, {
  DefaultSession,
  NextAuthOptions,
  Session,
  User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../../../prisma";

interface JWT {
  id: string;
  role: string;
  name?: string;
  email: string;
  picture?: string;
  exp?: number; // A propriedade 'exp' deve ser opcional, pois pode não estar presente em todos os tokens
}

// Interfaces personalizadas
interface CustomUser extends User {
  id: string;
  role: string; // Garante que seja sempre uma string
}

interface CustomUser extends User {
  id: string;
  role: string;
}

interface CustomSession extends DefaultSession {
  user: {
    role: string;
    name?: string | null; // Permitir nulo
    email: string;
    image?: string | null; // Permitir nulo
  } & DefaultSession["user"];
}

async function findOrCreateUser(email: string, name?: string, image?: string) {
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        image,
      },
    });
  }
  return user;
}

// Configuração do NextAuth
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email || profile?.email;
      const name = user.name || profile?.name;
      const image = (profile as { picture?: string })?.picture || user.image!;

      if (!email) throw new Error("Email não encontrado.");

      const dbUser = await findOrCreateUser(email, name, image);
      user.id = dbUser.id;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image || "";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as string,
        role: token.role as string,
        name: token.name || undefined, // Manter opcional
        email: token.email as string,
        image: token.picture || undefined, // Manter opcional
      };
      session.expires = token.exp
        ? new Date(token.exp * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await findOrCreateUser(email);
        if (!user) throw new Error("Credenciais inválidas");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: "user",
          image: user.image || "",
        } as CustomUser;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
