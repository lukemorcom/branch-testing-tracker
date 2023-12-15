import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prismaDb from '../../../../lib/prismadb';

export const authOptions = {
  adapter: PrismaAdapter(prismaDb),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  debug: true,
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
