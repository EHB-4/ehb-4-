import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import TokenLockCard from '../components/token/TokenLockCard';
import TokenLockForm from '../components/token/TokenLockForm';

export default function TokenLockPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const handleSuccess = () => {
    setSuccess('Tokens locked successfully!');
    setError(null);
    // Clear success message after 5 seconds
    setTimeout(() => setSuccess(null), 5000);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Token Lock</h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Lock Status</h2>
            <TokenLockCard
              userAddress={session?.user?.address as string}
              tokenLockerAddress={process.env.NEXT_PUBLIC_TOKEN_LOCKER_ADDRESS!}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lock New Tokens</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <TokenLockForm onSuccess={handleSuccess} onError={handleError} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
