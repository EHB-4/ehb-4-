import PSSDashboard from '@/components/PSS/PSSDashboard';

export default function PSSRequestsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Verification Requests</h1>
        <p className="text-gray-600 mt-1">View and manage all verification requests</p>
      </div>
      <PSSDashboard />
    </div>
  );
}
