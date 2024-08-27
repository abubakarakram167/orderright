import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const providers = [
	GoogleProvider({
		clientId: process.env.GOOGLE_ID,
		clientSecret: process.env.GOOGLE_SECRET,
	}),
];

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers,
});
