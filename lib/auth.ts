// Frontend-only authentication service
export const auth = {
  signIn: async (credentials: any) => {
    // Mock sign in for frontend development
    return { success: true, user: { id: 'user123', email: credentials.email } };
  },
  signOut: async () => {
    // Mock sign out for frontend development
    return { success: true };
  },
  getSession: async () => {
    // Mock session for frontend development
    return {
      user: {
        id: 'user123',
        email: 'user@example.com',
        name: 'Test User',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  },
};

export default auth;
