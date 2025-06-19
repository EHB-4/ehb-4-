import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface CustomUser {
    id: string;
    email: string;
    name: string;
    role: string;
    address?: string;
    sqlLevel?: number;
    wallet?: {
      balance: number;
      lockedCoins: number;
    };
  }

  interface Session {
    user: CustomUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    sqlLevel?: number;
  }
}
