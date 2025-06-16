import { NextApiRequest } from 'next';
import { User } from 'next-auth';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: any;
        promise: any;
      };
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string;
      role: string;
    };
  }
}

declare module 'next' {
  interface NextApiRequest {
    apiKey?: any;
    ip?: string;
  }
}

export {}; 