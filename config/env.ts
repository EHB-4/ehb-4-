// Default configuration values
const config = {
  // Contract address - replace with your actual contract address
  contractAddress:
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',

  // NextAuth configuration
  nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  nextAuthSecret: process.env.NEXTAUTH_SECRET || 'default-secret-key-replace-in-production',

  // Add any other environment variables here
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Validate required configuration
if (
  !config.contractAddress ||
  config.contractAddress === '0x0000000000000000000000000000000000000000'
) {
  console.warn(
    'Warning: Using default contract address. Please set NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local'
  );
}

if (config.nextAuthSecret === 'default-secret-key-replace-in-production') {
  console.warn('Warning: Using default NextAuth secret. Please set NEXTAUTH_SECRET in .env.local');
}

export default config;
