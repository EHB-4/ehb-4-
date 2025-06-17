import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TokenLockForm from '@/components/token/TokenLockForm';
import TokenLockCard from '@/components/token/TokenLockCard';
import { ethers } from 'ethers';

export default function TokenOperations() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userAddress, setUserAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const getAddress = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);
        }
      } catch (err) {
        setError('Failed to get wallet address. Please make sure your wallet is connected.');
      }
    };

    getAddress();
  }, []);

  const handleSuccess = () => {
    setSuccess('Operation completed successfully!');
    setError(null);
    // Clear success message after 5 seconds
    setTimeout(() => setSuccess(null), 5000);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSuccess(null);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Token Operations</h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {/* Token Lock Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Lock Tokens</h2>
            <TokenLockForm onSuccess={handleSuccess} onError={handleError} />
          </div>

          {/* Token Lock Status */}
          {userAddress && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Lock Status</h2>
              <TokenLockCard userAddress={userAddress} />
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">How it works</h3>
          <ul className="space-y-3 text-blue-700">
            <li>1. Choose the amount of tokens you want to lock</li>
            <li>2. Select the lock duration (30 to 365 days)</li>
            <li>3. Lock your tokens to start earning rewards</li>
            <li>4. Claim your rewards anytime</li>
            <li>5. Unlock your tokens after the lock period ends</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
