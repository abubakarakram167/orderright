import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

declare module "next-auth" {
	interface Session {
		user: User & {
			isAdmin: Boolean | any;
		};
	}
}

const providers = [
	GoogleProvider({
		clientId: process.env.GOOGLE_ID,
		clientSecret: process.env.GOOGLE_SECRET,
	}),
];

export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers,
	trustHost: true,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		session({ session, token }) {
			if (session) {
				session.user.isAdmin = token.isAdmin;
			}
			return session;
		},
		async jwt({ token }) {
			const userInDb = await prisma.user.findUnique({
				where: {
					email: token.email!,
				},
			});
			token.isAdmin = userInDb?.isAdmin!;
			return token;
		},
	},
});
