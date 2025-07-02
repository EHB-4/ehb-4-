import { NextRequest, NextResponse } from 'next/server';
import { GoSellrProduct } from '@/types/gosellr';

// ========================================
// GOSELLR PRODUCTS API ROUTE
// ========================================

// Mock data for development
const mockProducts: GoSellrProduct[] = [
  {
    id: 'prod-1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    originalPrice: 399.99,
    currency: 'USD',
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'AudioTech',
    images: [
      '/api/placeholder/400/400?text=Headphones',
      '/api/placeholder/400/400?text=Headphones+2',
    ],
    rating: 4.8,
    reviewCount: 1247,
    seller: {
      id: 'seller-1',
      name: 'AudioTech Store',
      rating: 4.9,
      verified: true,
      location: 'New York, NY',
      blockchainAddress: '0x1234...5678',
      trustScore: 92,
      totalSales: 45600,
      totalProducts: 45,
    },
    stock: 45,
    shipping: {
      free: true,
      cost: 0,
      estimatedDays: '2-3 days',
      methods: [
        {
          id: 'standard',
          name: 'Standard Shipping',
          cost: 0,
          estimatedDays: '2-3 days',
          available: true,
        },
      ],
    },
    features: ['Noise Cancellation', 'Bluetooth 5.0', '30h Battery'],
    tags: ['wireless', 'premium', 'audio'],
    blockchain: {
      escrowEnabled: true,
      smartContract: '0x1234...5678',
      nftAvailable: false,
      blockchain: 'ethereum',
      gasEstimate: 0.005,
    },
    aiScore: {
      trustScore: 92,
      riskScore: 8,
      recommendationScore: 95,
      fraudScore: 2,
      reliabilityScore: 94,
      calculatedAt: new Date(),
    },
    sku: 'AUD-001',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'prod-2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with health monitoring',
    price: 199.99,
    originalPrice: 249.99,
    currency: 'USD',
    category: 'Electronics',
    subcategory: 'Wearables',
    brand: 'FitTech',
    images: [
      '/api/placeholder/400/400?text=Smartwatch',
      '/api/placeholder/400/400?text=Smartwatch+2',
    ],
    rating: 4.6,
    reviewCount: 892,
    seller: {
      id: 'seller-2',
      name: 'FitTech Pro',
      rating: 4.7,
      verified: true,
      location: 'San Francisco, CA',
      blockchainAddress: '0x8765...4321',
      trustScore: 88,
      totalSales: 23400,
      totalProducts: 23,
    },
    stock: 23,
    shipping: {
      free: false,
      cost: 9.99,
      estimatedDays: '3-5 days',
      methods: [
        {
          id: 'standard',
          name: 'Standard Shipping',
          cost: 9.99,
          estimatedDays: '3-5 days',
          available: true,
        },
      ],
    },
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
    tags: ['fitness', 'smartwatch', 'health'],
    blockchain: {
      escrowEnabled: true,
      smartContract: '0x8765...4321',
      nftAvailable: true,
      blockchain: 'polygon',
      gasEstimate: 0.003,
    },
    aiScore: {
      trustScore: 88,
      riskScore: 12,
      recommendationScore: 87,
      fraudScore: 5,
      reliabilityScore: 89,
      calculatedAt: new Date(),
    },
    sku: 'FIT-002',
    status: 'active',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-14'),
  },
];

// ========================================
// GET - Fetch Products
// ========================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'popular';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Filter products based on parameters
    let filteredProducts = [...mockProducts];

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (search) {
      filteredProducts = filteredProducts.filter(
        p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price_low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredProducts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default: // popular
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// ========================================
// POST - Create Product
// ========================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'description', 'price', 'category', 'sellerId'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new product
    const newProduct: GoSellrProduct = {
      id: `prod-${Date.now()}`,
      name: body.name,
      description: body.description,
      price: body.price,
      originalPrice: body.originalPrice || body.price,
      currency: body.currency || 'USD',
      category: body.category,
      subcategory: body.subcategory || '',
      brand: body.brand || '',
      images: body.images || [],
      rating: 0,
      reviewCount: 0,
      seller: body.seller,
      stock: body.stock || 0,
      shipping: body.shipping || {
        free: false,
        cost: 0,
        estimatedDays: '3-5 days',
        methods: [],
      },
      features: body.features || [],
      tags: body.tags || [],
      blockchain: body.blockchain || {
        escrowEnabled: true,
        smartContract: '',
        nftAvailable: false,
        blockchain: 'ethereum',
        gasEstimate: 0.005,
      },
      aiScore: {
        trustScore: 50,
        riskScore: 50,
        recommendationScore: 50,
        fraudScore: 50,
        reliabilityScore: 50,
        calculatedAt: new Date(),
      },
      sku: body.sku || `SKU-${Date.now()}`,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In a real application, save to database
    mockProducts.push(newProduct);

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
