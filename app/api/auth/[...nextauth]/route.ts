import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add your own authentication logic here
        // For now, we'll just accept any user for demonstration
        if (credentials) {
          // Using a valid MongoDB ObjectID
          const user = {
            id: '60d5ec49e0d3e43c5c721b02',
            name: 'Test User',
            email: 'test@example.com',
          };
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
