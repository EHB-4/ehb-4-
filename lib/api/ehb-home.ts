// This is a placeholder for your actual data fetching logic.
// In a real application, you would fetch this data from your backend API.

const allServices = [
  {
    id: '1',
    title: 'GoSellr Marketplace',
    category: 'E-commerce',
    imageUrl: '/images/gosellr.png', // Replace with actual image paths
    link: '/gosellr',
  },
  {
    id: '2',
    title: 'EDR Health Directory',
    category: 'Healthcare',
    imageUrl: '/images/edr.png',
    link: '/edr',
  },
  {
    id: '3',
    title: 'EHB Digital Wallet',
    category: 'Finance',
    imageUrl: '/images/wallet.png',
    link: '/wallet',
  },
  {
    id: '4',
    title: 'AI-Powered Assistant',
    category: 'Artificial Intelligence',
    imageUrl: '/images/ai-assistant.png',
    link: '/ai',
  },
  {
    id: '5',
    title: 'Job Portal (JPS)',
    category: 'Careers',
    imageUrl: '/images/jps.png',
    link: '/jps',
  },
  {
    id: '6',
    title: 'Franchise Management',
    category: 'Business',
    imageUrl: '/images/franchise.png',
    link: '/franchise',
  },
  {
    id: '7',
    title: 'EHB Tube',
    category: 'Entertainment',
    imageUrl: '/images/ehb-tube.png',
    link: '/ehb-tube',
  },
  {
    id: '8',
    title: 'AI Marketplace',
    category: 'AI Tools',
    imageUrl: '/images/ai-marketplace.png',
    link: '/ai-marketplace',
  },
];

export async function fetchFeaturedServices() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  // Return a slice of services as featured
  return allServices.slice(0, 5);
}

export async function fetchTopCategories() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  // Return services from different categories
  return [allServices[1], allServices[2], allServices[0], allServices[4]];
}

export async function fetchNewReleases() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  // Return the latest services
  return allServices.slice(5, 8);
}
