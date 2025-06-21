import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Users, Settings, BarChart3, Activity, Database, Globe } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">System Administration & Control</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </Button>
              </Link>
              <Link href="/admin/modules">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Modules</span>
                </Button>
              </Link>
              <Link href="/admin/activity">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Activity</span>
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
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
            <p>&copy; 2024 EHB Admin Panel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
