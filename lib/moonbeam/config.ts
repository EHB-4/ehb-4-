// Mock Moonbeam configuration for frontend development
export const moonbeamConfig = {
  rpcUrl: 'https://rpc.api.moonbeam.network',
  chainId: 1284,
  name: 'Moonbeam',
  currency: 'GLMR',
};

export const getMoonbeamApi = async () => {
  // Mock API
  return {
    rpc: {
      system: {
        chain: () => Promise.resolve('Moonbeam'),
      },
    },
  };
};
