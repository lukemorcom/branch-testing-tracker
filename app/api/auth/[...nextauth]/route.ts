import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prismaDb from '../../../../prisma/prismadb';

const authOptions = {
	adapter: PrismaAdapter(prismaDb),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		})
	],
	session: {
		strategy: 'jwt'
	},
	callbacks: {
		//@ts-ignore
		async signIn({ user, account, profile, email, credentials }) {
			return user.email.endsWith('@feeditback.com');
		}
	}
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
