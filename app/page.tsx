import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">Welcome to EHB Platform</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your comprehensive healthcare and business management solution
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Link
              href="/dashboard"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dashboard</h3>
              <p className="text-gray-600">Manage your business overview</p>
            </Link>

            <Link
              href="/admin"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Admin Panel</h3>
              <p className="text-gray-600">Administrative controls</p>
            </Link>

            <Link
              href="/wallet"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Wallet</h3>
              <p className="text-gray-600">Manage your finances</p>
            </Link>

            <Link
              href="/products"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Products</h3>
              <p className="text-gray-600">Browse and manage products</p>
            </Link>
          </div>

          <div className="mt-12">
            <Link
              href="/auth/signin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
