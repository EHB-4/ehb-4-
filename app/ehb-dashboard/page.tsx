import {
  Users,
  DollarSign,
  ShoppingCart,
  ClipboardList,
  Plus,
  Book,
  Send,
  Briefcase,
  ArrowRight,
  Heart,
  Wallet,
  Cpu,
  Activity,
  CheckCircle,
  Clock,
} from 'lucide-react';
import React from 'react';

// Main Dashboard Page Component
export default function EhbDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="flex-1 space-y-6 p-8 pt-6">
        <DashboardHeader />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCards />
        </div>
        <div className="grid gap-6 mt-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <QuickActions />
            <FeaturedServices />
          </div>
          <div className="space-y-6">
            <RecentActivity />
            <EhbSummary />
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components for the dashboard

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-sm text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full">
          Super-App Dashboard
        </span>
        <h2 className="text-3xl font-bold tracking-tight mt-2">Dashboard Overview</h2>
        <p className="text-muted-foreground text-green-600 font-medium">700+ Services</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            placeholder="Search services..."
            className="pl-4 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
          </span>
        </button>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
          JD
        </div>
      </div>
    </div>
  );
}

function StatCards() {
  const stats = [
    { title: 'Total Services', value: '742', change: '+12% from last month', Icon: ShoppingCart },
    { title: 'Active Users', value: '24.7K', change: '+8% from last week', Icon: Users },
    { title: 'Monthly Revenue', value: '$45.2K', change: '+23% from last month', Icon: DollarSign },
    { title: 'Appointments', value: '1,247', change: '+5% from last week', Icon: ClipboardList },
  ];

  return (
    <>
      {stats.map(({ title, value, change, Icon }) => (
        <div
          key={title}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className="text-sm text-green-600 mt-1">{change}</p>
        </div>
      ))}
    </>
  );
}

function QuickActions() {
  const actions = [
    { label: 'Add Product', Icon: Plus },
    { label: 'Book Appointment', Icon: Book },
    { label: 'Send Money', Icon: Send },
    { label: 'Find Jobs', Icon: Briefcase },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map(({ label, Icon }) => (
          <button
            key={label}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Icon className="h-6 w-6 text-gray-600" />
            </div>
            <span className="mt-2 text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FeaturedServices() {
  const services = [
    {
      title: 'GoSellr Marketplace',
      description: 'Complete e-commerce platform with 50K+ products',
      orders: '12.4K Orders',
      satisfaction: '95% Satisfaction',
      Icon: ShoppingCart,
    },
    {
      title: 'EDR Health Directory',
      description: 'Connect with 5K+ healthcare professionals',
      appointments: '2.1K Appointments',
      rating: '4.8/5 Rating',
      Icon: Heart,
    },
    {
      title: 'EHB Digital Wallet',
      description: 'Secure payments and money transfers',
      volume: '$45.2K Volume',
      security: 'Bank-grade Security',
      Icon: Wallet,
    },
    {
      title: 'AI Marketplace',
      description: 'Advanced AI tools and automation services',
      tools: '150+ AI Tools',
      availability: '24/7 Available',
      Icon: Cpu,
    },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Featured Services</h3>
        <button className="text-sm font-medium text-blue-600 hover:underline flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="space-y-4">
        {services.map(s => (
          <div key={s.title} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
              <s.Icon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{s.title}</h4>
              <p className="text-sm text-gray-600">{s.description}</p>
              <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                {s.orders && <span>{s.orders}</span>}
                {s.satisfaction && <span>{s.satisfaction}</span>}
                {s.appointments && <span>{s.appointments}</span>}
                {s.rating && <span>{s.rating}</span>}
                {s.volume && <span>{s.volume}</span>}
                {s.security && <span>{s.security}</span>}
                {s.tools && <span>{s.tools}</span>}
                {s.availability && <span>{s.availability}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivity() {
  const activities = [
    {
      title: 'New order placed in GoSellr',
      time: '2 hours ago',
      Icon: ShoppingCart,
      color: 'text-blue-500',
    },
    {
      title: 'Appointment confirmed with Dr. Smith',
      time: '4 hours ago',
      Icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'Payment of $125.50 processed',
      time: '6 hours ago',
      Icon: DollarSign,
      color: 'text-yellow-500',
    },
    {
      title: 'Job application submitted',
      time: '1 day ago',
      Icon: Briefcase,
      color: 'text-purple-500',
    },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Recent Activity</h3>
        <button className="text-sm font-medium text-blue-600 hover:underline flex items-center">
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="space-y-4">
        {activities.map(a => (
          <div key={a.title} className="flex items-center">
            <div
              className={`p-2 rounded-full mr-3 ${a.color.replace('text', 'bg').replace('500', '100')}`}
            >
              <a.Icon className={`h-5 w-5 ${a.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{a.title}</p>
              <p className="text-xs text-gray-500">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EhbSummary() {
  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-2">Your EHB Summary</h3>
      <div className="space-y-3 mt-4">
        <div className="flex justify-between">
          <span>Services Used</span>
          <span className="font-bold">47</span>
        </div>
        <div className="flex justify-between">
          <span>Total Transactions</span>
          <span className="font-bold">$2,347</span>
        </div>
        <div className="flex justify-between">
          <span>Member Since</span>
          <span className="font-bold">Jan 2024</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Premium Member</span>
          <span>75%</span>
        </div>
        <div className="w-full bg-blue-400 rounded-full h-2.5">
          <div className="bg-white h-2.5 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <p className="text-xs text-blue-200 mt-1">Level up to unlock more benefits</p>
      </div>
    </div>
  );
}
