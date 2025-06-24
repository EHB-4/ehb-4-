// GoSellr UI Layout Structure Template
// Comprehensive layout system for GoSellr platform

import React from 'react';
import { NextPage } from 'next';

// ========================================
// 1. LAYOUT COMPONENTS
// ========================================

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  sidebarType?: 'user' | 'admin' | 'seller';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// Main Layout Component
export const MainLayout: React.FC<LayoutProps> = ({
  children,
  title = 'GoSellr - Decentralized E-commerce',
  description = 'Trustless, transparent, and secure e-commerce platform',
  showHeader = true,
  showFooter = true,
  showSidebar = false,
  sidebarType = 'user',
  maxWidth = 'xl',
  padding = 'md',
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <Header />}

      <div className="flex">
        {showSidebar && <Sidebar type={sidebarType} />}

        <main className={`flex-1 ${getMaxWidthClass(maxWidth)} ${getPaddingClass(padding)}`}>
          <div className="py-6">{children}</div>
        </main>
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

// ========================================
// 2. HEADER COMPONENT
// ========================================

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/marketplace">Marketplace</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/deals">Deals</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <NotificationBell />
            <UserMenu />
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

// ========================================
// 3. SIDEBAR COMPONENTS
// ========================================

interface SidebarProps {
  type: 'user' | 'admin' | 'seller';
}

export const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const sidebarItems = getSidebarItems(type);

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {type === 'user' && 'My Account'}
            {type === 'admin' && 'Admin Panel'}
            {type === 'seller' && 'Seller Dashboard'}
          </h2>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map(item => (
            <SidebarItem key={item.id} {...item} />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <UserProfile />
        </div>
      </div>
    </aside>
  );
};

// ========================================
// 4. DASHBOARD LAYOUTS
// ========================================

// User Dashboard Layout
export const UserDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MainLayout showSidebar sidebarType="user">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">{children}</div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <QuickStats />
          <RecentActivity />
          <RecommendedProducts />
        </div>
      </div>
    </MainLayout>
  );
};

// Seller Dashboard Layout
export const SellerDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MainLayout showSidebar sidebarType="seller">
      <div className="space-y-6">
        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">{children}</div>

          <div className="space-y-6">
            <InventoryStatus />
            <RecentOrders />
            <PerformanceMetrics />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Admin Dashboard Layout
export const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MainLayout showSidebar sidebarType="admin">
      <div className="space-y-6">
        {/* Admin Header */}
        <AdminHeader />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-4">{children}</div>

          <div className="space-y-6">
            <SystemStatus />
            <QuickActions />
            <RecentAlerts />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// ========================================
// 5. PAGE LAYOUTS
// ========================================

// Marketplace Layout
export const MarketplaceLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <CategoryFilter />
            <PriceFilter />
            <RatingFilter />
            <SortOptions />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {children}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </MainLayout>
  );
};

// Product Detail Layout
export const ProductDetailLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <ProductGallery />
        </div>

        {/* Product Info */}
        <div className="lg:col-span-2">{children}</div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProducts />
      </div>
    </MainLayout>
  );
};

// Checkout Layout
export const CheckoutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MainLayout maxWidth="lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>{children}</div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </MainLayout>
  );
};

// ========================================
// 6. MOBILE LAYOUTS
// ========================================

// Mobile Navigation
export const MobileNavigation: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        <MobileNavItem icon="home" label="Home" href="/" />
        <MobileNavItem icon="search" label="Search" href="/search" />
        <MobileNavItem icon="heart" label="Wishlist" href="/wishlist" />
        <MobileNavItem icon="shopping-cart" label="Cart" href="/cart" />
        <MobileNavItem icon="user" label="Profile" href="/profile" />
      </div>
    </nav>
  );
};

// Mobile Product Card
export const MobileProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-w-1 aspect-h-1">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">${product.price}</p>

          <div className="flex items-center">
            <StarRating rating={product.rating} />
            <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-3 flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700">
            Buy Now
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <HeartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ========================================
// 7. RESPONSIVE UTILITIES
// ========================================

const getMaxWidthClass = (maxWidth: string) => {
  const classes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };
  return classes[maxWidth] || classes.xl;
};

const getPaddingClass = (padding: string) => {
  const classes = {
    none: '',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
  };
  return classes[padding] || classes.md;
};

// ========================================
// 8. SIDEBAR CONFIGURATION
// ========================================

const getSidebarItems = (type: string) => {
  const items = {
    user: [
      { id: 'dashboard', label: 'Dashboard', icon: 'home', href: '/dashboard' },
      { id: 'orders', label: 'My Orders', icon: 'shopping-bag', href: '/orders' },
      { id: 'wishlist', label: 'Wishlist', icon: 'heart', href: '/wishlist' },
      { id: 'reviews', label: 'My Reviews', icon: 'star', href: '/reviews' },
      { id: 'wallet', label: 'Wallet', icon: 'credit-card', href: '/wallet' },
      { id: 'settings', label: 'Settings', icon: 'cog', href: '/settings' },
    ],
    seller: [
      { id: 'dashboard', label: 'Dashboard', icon: 'home', href: '/seller/dashboard' },
      { id: 'products', label: 'Products', icon: 'cube', href: '/seller/products' },
      { id: 'orders', label: 'Orders', icon: 'shopping-bag', href: '/seller/orders' },
      { id: 'analytics', label: 'Analytics', icon: 'chart-bar', href: '/seller/analytics' },
      { id: 'payments', label: 'Payments', icon: 'credit-card', href: '/seller/payments' },
      { id: 'disputes', label: 'Disputes', icon: 'exclamation-triangle', href: '/seller/disputes' },
    ],
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: 'home', href: '/admin/dashboard' },
      { id: 'users', label: 'Users', icon: 'users', href: '/admin/users' },
      { id: 'products', label: 'Products', icon: 'cube', href: '/admin/products' },
      { id: 'orders', label: 'Orders', icon: 'shopping-bag', href: '/admin/orders' },
      { id: 'disputes', label: 'Disputes', icon: 'exclamation-triangle', href: '/admin/disputes' },
      { id: 'analytics', label: 'Analytics', icon: 'chart-bar', href: '/admin/analytics' },
      { id: 'settings', label: 'Settings', icon: 'cog', href: '/admin/settings' },
    ],
  };

  return items[type] || items.user;
};

// ========================================
// 9. COMPONENT PLACEHOLDERS
// ========================================

// These are placeholder components that would be implemented separately
const Logo = () => <div className="text-2xl font-bold text-blue-600">GoSellr</div>;
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </a>
);
const SearchBar = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search products..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <SearchIcon className="h-5 w-5 text-gray-400" />
    </div>
  </div>
);
const NotificationBell = () => <div className="p-2 text-gray-400 hover:text-gray-600">🔔</div>;
const UserMenu = () => <div className="p-2 text-gray-400 hover:text-gray-600">👤</div>;
const CartIcon = () => <div className="p-2 text-gray-400 hover:text-gray-600">🛒</div>;
const SidebarItem = ({ label, href }: { label: string; href: string }) => (
  <a href={href} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
    {label}
  </a>
);
const UserProfile = () => <div className="text-sm text-gray-600">User Profile</div>;
const QuickStats = () => <div className="bg-white p-4 rounded-lg shadow-sm">Quick Stats</div>;
const RecentActivity = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm">Recent Activity</div>
);
const RecommendedProducts = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm">Recommended Products</div>
);
const StatsOverview = () => <div className="bg-white p-6 rounded-lg shadow-sm">Stats Overview</div>;
const InventoryStatus = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm">Inventory Status</div>
);
const RecentOrders = () => <div className="bg-white p-4 rounded-lg shadow-sm">Recent Orders</div>;
const PerformanceMetrics = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm">Performance Metrics</div>
);
const AdminHeader = () => <div className="bg-white p-6 rounded-lg shadow-sm">Admin Header</div>;
const SystemStatus = () => <div className="bg-white p-4 rounded-lg shadow-sm">System Status</div>;
const QuickActions = () => <div className="bg-white p-4 rounded-lg shadow-sm">Quick Actions</div>;
const RecentAlerts = () => <div className="bg-white p-4 rounded-lg shadow-sm">Recent Alerts</div>;
const CategoryFilter = () => <div>Category Filter</div>;
const PriceFilter = () => <div>Price Filter</div>;
const RatingFilter = () => <div>Rating Filter</div>;
const SortOptions = () => <div>Sort Options</div>;
const Pagination = () => <div className="flex justify-center">Pagination</div>;
const ProductGallery = () => <div className="bg-gray-200 rounded-lg h-96">Product Gallery</div>;
const RelatedProducts = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm">Related Products</div>
);
const OrderSummary = () => <div className="bg-white p-6 rounded-lg shadow-sm">Order Summary</div>;
const MobileNavItem = ({ icon, label, href }: { icon: string; label: string; href: string }) => (
  <a href={href} className="flex flex-col items-center text-xs text-gray-600">
    <span className="text-lg mb-1">{icon}</span>
    {label}
  </a>
);
const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">GoSellr</h3>
          <p className="text-gray-300">Decentralized e-commerce platform</p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/help">Help</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/cookies">Cookie Policy</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Discord
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Telegram
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
        <p>&copy; 2024 GoSellr. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Icon placeholders
const SearchIcon = ({ className }: { className: string }) => <div className={className}>🔍</div>;
const HeartIcon = ({ className }: { className: string }) => <div className={className}>❤️</div>;

// ========================================
// 10. TYPES AND INTERFACES
// ========================================

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviewCount: number;
  };
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map(star => (
      <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ))}
  </div>
);

// ========================================
// 11. EXPORT ALL COMPONENTS
// ========================================

export const uiLayoutStructure = {
  MainLayout,
  Header,
  Sidebar,
  UserDashboardLayout,
  SellerDashboardLayout,
  AdminDashboardLayout,
  MarketplaceLayout,
  ProductDetailLayout,
  CheckoutLayout,
  MobileNavigation,
  MobileProductCard,
  Footer,
};
