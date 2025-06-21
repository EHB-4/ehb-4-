import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Users, FileText, BarChart3 } from 'lucide-react';

export default function PSSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">PSS</h1>
                <p className="text-sm text-gray-600">Professional Security Services</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/pss">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Link href="/pss/request">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Submit Request</span>
                </Button>
              </Link>
              <Link href="/pss/requests">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>View Requests</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Professional Security Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
