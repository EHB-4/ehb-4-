export const runtime = "nodejs";
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

/**
 * NextAuth configuration for AI Agent system
 * Handles authentication, session management, and user roles
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Mock user authentication - replace with real database
        const users = [
          {
            id: '1',
            email: 'admin@ehb.com',
            password: 'admin123',
            name: 'Admin User',
            role: 'admin',
            permissions: ['read', 'write', 'admin', 'delete'],
          },
          {
            id: '2',
            email: 'user@ehb.com',
            password: 'user123',
            name: 'Regular User',
            role: 'user',
            permissions: ['read', 'write'],
          },
          {
            id: '3',
            email: 'developer@ehb.com',
            password: 'dev123',
            name: 'Developer',
            role: 'developer',
            permissions: ['read', 'write', 'admin'],
          },
        ];

        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: user.permissions,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.permissions = token.permissions;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
