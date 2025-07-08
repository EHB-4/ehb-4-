import { NextRequest } from 'next/server';
import { GET, POST, PUT, DELETE } from '@/app/api/gosellr/products/route';

// ========================================
// 1. MOCK SETUP
// ========================================

// Mock Next.js Response
const mockResponse = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

// Mock NextRequest
const createMockRequest = (url: string, method: string = 'GET', body?: any): NextRequest => {
  const request = {
    url,
    method,
    json: jest.fn().mockResolvedValue(body || {}),
  } as any;

  return request;
};

// ========================================
// 2. TEST SUITE
// ========================================

describe('GoSellr Products API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ========================================
  // 3. GET ENDPOINT TESTS
  // ========================================

  describe('GET /api/gosellr/products', () => {
    test('returns products successfully', async () => {
      const request = createMockRequest('http://localhost:3000/api/gosellr/products');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.products).toBeDefined();
      expect(data.data.total).toBeDefined();
      expect(data.data.page).toBeDefined();
      expect(data.data.limit).toBeDefined();
      expect(data.data.totalPages).toBeDefined();
    });

    test('filters products by category', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products?category=Electronics'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.products).toHaveLength(1);
      expect(data.data.products[0].category).toBe('Electronics');
    });

    test('filters products by sellerId', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products?sellerId=seller-1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.products).toHaveLength(1);
      expect(data.data.products[0].seller.id).toBe('seller-1');
    });

    test('filters products by price range', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products?minPrice=200&maxPrice=400'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.products).toHaveLength(1);
      expect(data.data.products[0].price).toBeGreaterThanOrEqual(200);
      expect(data.data.products[0].price).toBeLessThanOrEqual(400);
    });

    test('filters products by rating', async () => {
      const request = createMockRequest('http://localhost:3000/api/gosellr/products?minRating=4.5');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.products).toHaveLength(1);
      expect(data.data.products[0].rating).toBeGreaterThanOrEqual(4.5);
    });

    test('filters products by status', async () => {
      const request = createMockRequest('http://localhost:3000/api/gosellr/products?status=active');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.products).toHaveLength(1);
      expect(data.data.products[0].status).toBe('active');
    });

    test('handles pagination correctly', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products?page=1&limit=1'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.products).toHaveLength(1);
      expect(data.data.page).toBe(1);
      expect(data.data.limit).toBe(1);
    });

    test('sorts products by price (low to high)', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products?sortBy=price&sortOrder=asc'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      const products = data.data.products;
      if (products.length > 1) {
        expect(products[0].price).toBeLessThanOrEqual(products[1].price);
      }
    });

    test('sorts products by rating (high to low)', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products?sortBy=rating&sortOrder=desc'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      const products = data.data.products;
      if (products.length > 1) {
        expect(products[0].rating).toBeGreaterThanOrEqual(products[1].rating);
      }
    });

    test('returns empty array when no products match filters', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products?category=NonExistent'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.products).toHaveLength(0);
      expect(data.data.total).toBe(0);
    });

    test('handles invalid page parameter', async () => {
      const request = createMockRequest('http://localhost:3000/api/gosellr/products?page=invalid');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.page).toBe(1); // Should default to page 1
    });

    test('handles invalid limit parameter', async () => {
      const request = createMockRequest('http://localhost:3000/api/gosellr/products?limit=invalid');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.limit).toBe(10); // Should default to limit 10
    });

    test('handles invalid price parameters', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products?minPrice=invalid&maxPrice=invalid'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      // Should ignore invalid price parameters and return all products
      expect(data.data.products.length).toBeGreaterThan(0);
    });

    test('handles invalid rating parameter', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products?minRating=invalid'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      // Should ignore invalid rating parameter and return all products
      expect(data.data.products.length).toBeGreaterThan(0);
    });
  });

  // ========================================
  // 4. POST ENDPOINT TESTS
  // ========================================

  describe('POST /api/gosellr/products', () => {
    test('creates product successfully', async () => {
      const newProduct = {
        name: 'Test Product',
        description: 'A test product description',
        price: 99.99,
        category: 'Electronics',
        subcategory: 'Gadgets',
        brand: 'TestBrand',
        images: ['https://example.com/image1.jpg'],
        stock: 50,
        sellerId: 'seller-1',
        features: ['Feature 1', 'Feature 2'],
        tags: ['test', 'electronics'],
        sku: 'TEST-001',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        newProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe(newProduct.name);
      expect(data.data.description).toBe(newProduct.description);
      expect(data.data.price).toBe(newProduct.price);
      expect(data.data.category).toBe(newProduct.category);
      expect(data.data.seller.id).toBe(newProduct.sellerId);
      expect(data.data.status).toBe('active');
      expect(data.data.id).toBeDefined();
      expect(data.data.createdAt).toBeDefined();
      expect(data.data.updatedAt).toBeDefined();
    });

    test('validates required fields', async () => {
      const invalidProduct = {
        description: 'A test product description',
        price: 99.99,
        // Missing required fields: name, category, sellerId
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        invalidProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Missing required field');
    });

    test('validates missing name field', async () => {
      const invalidProduct = {
        description: 'A test product description',
        price: 99.99,
        category: 'Electronics',
        sellerId: 'seller-1',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        invalidProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Missing required field: name');
    });

    test('validates missing category field', async () => {
      const invalidProduct = {
        name: 'Test Product',
        description: 'A test product description',
        price: 99.99,
        sellerId: 'seller-1',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        invalidProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Missing required field: category');
    });

    test('validates missing sellerId field', async () => {
      const invalidProduct = {
        name: 'Test Product',
        description: 'A test product description',
        price: 99.99,
        category: 'Electronics',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        invalidProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Missing required field: sellerId');
    });

    test('validates price is positive', async () => {
      const invalidProduct = {
        name: 'Test Product',
        description: 'A test product description',
        price: -10,
        category: 'Electronics',
        sellerId: 'seller-1',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        invalidProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Price must be positive');
    });

    test('validates stock is non-negative', async () => {
      const invalidProduct = {
        name: 'Test Product',
        description: 'A test product description',
        price: 99.99,
        category: 'Electronics',
        sellerId: 'seller-1',
        stock: -5,
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        invalidProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Stock must be non-negative');
    });

    test('sets default values correctly', async () => {
      const newProduct = {
        name: 'Test Product',
        description: 'A test product description',
        price: 99.99,
        category: 'Electronics',
        sellerId: 'seller-1',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        newProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.stock).toBe(0); // Default stock
      expect(data.data.rating).toBe(0); // Default rating
      expect(data.data.reviewCount).toBe(0); // Default review count
      expect(data.data.status).toBe('active'); // Default status
      expect(data.data.currency).toBe('USD'); // Default currency
      expect(data.data.images).toEqual([]); // Default empty images array
      expect(data.data.features).toEqual([]); // Default empty features array
      expect(data.data.tags).toEqual([]); // Default empty tags array
    });

    test('generates unique ID for new product', async () => {
      const product1 = {
        name: 'Product 1',
        description: 'First product',
        price: 100,
        category: 'Electronics',
        sellerId: 'seller-1',
      };

      const product2 = {
        name: 'Product 2',
        description: 'Second product',
        price: 200,
        category: 'Electronics',
        sellerId: 'seller-1',
      };

      const request1 = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        product1
      );
      const response1 = await POST(request1);
      const data1 = await response1.json();

      const request2 = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        product2
      );
      const response2 = await POST(request2);
      const data2 = await response2.json();

      expect(data1.data.id).not.toBe(data2.data.id);
    });

    test('handles server error gracefully', async () => {
      // Mock a scenario where the request.json() throws an error
      const request = {
        url: 'http://localhost:3000/api/gosellr/products',
        method: 'POST',
        json: jest.fn().mockRejectedValue(new Error('Server error')),
      } as any;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to create product');
    });
  });

  // ========================================
  // 5. PUT ENDPOINT TESTS
  // ========================================

  describe('PUT /api/gosellr/products', () => {
    test('updates product successfully', async () => {
      const updateData = {
        productId: 'prod-001',
        name: 'Updated Product Name',
        price: 199.99,
        stock: 25,
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'PUT',
        updateData
      );
      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('Updated Product Name');
      expect(data.data.price).toBe(199.99);
      expect(data.data.stock).toBe(25);
      expect(data.data.updatedAt).toBeDefined();
    });

    test('validates missing productId', async () => {
      const updateData = {
        name: 'Updated Product Name',
        price: 199.99,
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'PUT',
        updateData
      );
      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Missing productId');
    });

    test('handles non-existent product', async () => {
      const updateData = {
        productId: 'non-existent-product',
        name: 'Updated Product Name',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'PUT',
        updateData
      );
      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Product not found');
    });

    test('validates price is positive when updating', async () => {
      const updateData = {
        productId: 'prod-001',
        price: -50,
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'PUT',
        updateData
      );
      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Price must be positive');
    });

    test('validates stock is non-negative when updating', async () => {
      const updateData = {
        productId: 'prod-001',
        stock: -10,
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'PUT',
        updateData
      );
      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Stock must be non-negative');
    });

    test('updates multiple fields at once', async () => {
      const updateData = {
        productId: 'prod-001',
        name: 'Completely Updated Product',
        description: 'Updated description',
        price: 299.99,
        stock: 100,
        category: 'Updated Category',
        features: ['New Feature 1', 'New Feature 2'],
        tags: ['updated', 'product'],
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'PUT',
        updateData
      );
      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('Completely Updated Product');
      expect(data.data.description).toBe('Updated description');
      expect(data.data.price).toBe(299.99);
      expect(data.data.stock).toBe(100);
      expect(data.data.category).toBe('Updated Category');
      expect(data.data.features).toEqual(['New Feature 1', 'New Feature 2']);
      expect(data.data.tags).toEqual(['updated', 'product']);
    });

    test('handles server error gracefully', async () => {
      // Mock a scenario where the request.json() throws an error
      const request = {
        url: 'http://localhost:3000/api/gosellr/products',
        method: 'PUT',
        json: jest.fn().mockRejectedValue(new Error('Server error')),
      } as any;

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to update product');
    });
  });

  // ========================================
  // 6. DELETE ENDPOINT TESTS
  // ========================================

  describe('DELETE /api/gosellr/products', () => {
    test('deletes product successfully', async () => {
      const deleteData = {
        productId: 'prod-001',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'DELETE',
        deleteData
      );
      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Product deleted successfully');
    });

    test('validates missing productId', async () => {
      const deleteData = {};

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'DELETE',
        deleteData
      );
      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Missing productId');
    });

    test('handles non-existent product', async () => {
      const deleteData = {
        productId: 'non-existent-product',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'DELETE',
        deleteData
      );
      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Product not found');
    });

    test('handles server error gracefully', async () => {
      // Mock a scenario where the request.json() throws an error
      const request = {
        url: 'http://localhost:3000/api/gosellr/products',
        method: 'DELETE',
        json: jest.fn().mockRejectedValue(new Error('Server error')),
      } as any;

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to delete product');
    });
  });

  // ========================================
  // 7. INTEGRATION TESTS
  // ========================================

  describe('Integration Tests', () => {
    test('created product appears in GET response', async () => {
      // Create a product
      const newProduct = {
        name: 'Integration Test Product',
        description: 'A product for integration testing',
        price: 150.0,
        category: 'Test Category',
        sellerId: 'seller-999',
      };

      const createRequest = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        newProduct
      );
      const createResponse = await POST(createRequest);
      const createData = await createResponse.json();

      expect(createResponse.status).toBe(201);
      expect(createData.success).toBe(true);

      // Verify the product appears in GET response
      const getRequest = createMockRequest(
        'http://localhost:3000/api/gosellr/products?sellerId=seller-999'
      );
      const getResponse = await GET(getRequest);
      const getData = await getResponse.json();

      expect(getResponse.status).toBe(200);
      expect(getData.success).toBe(true);
      expect(getData.data.products).toHaveLength(1);
      expect(getData.data.products[0].name).toBe('Integration Test Product');
    });

    test('product update is reflected in GET response', async () => {
      // Update a product
      const updateData = {
        productId: 'prod-001',
        name: 'Updated Integration Test Product',
        price: 250.0,
      };

      const updateRequest = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'PUT',
        updateData
      );
      const updateResponse = await PUT(updateRequest);
      const updateResponseData = await updateResponse.json();

      expect(updateResponse.status).toBe(200);
      expect(updateResponseData.success).toBe(true);

      // Verify the updated product appears in GET response
      const getRequest = createMockRequest(
        'http://localhost:3000/api/gosellr/products?name=Updated Integration Test Product'
      );
      const getResponse = await GET(getRequest);
      const getData = await getResponse.json();

      expect(getResponse.status).toBe(200);
      expect(getData.success).toBe(true);
      expect(getData.data.products).toHaveLength(1);
      expect(getData.data.products[0].name).toBe('Updated Integration Test Product');
      expect(getData.data.products[0].price).toBe(250.0);
    });

    test('deleted product does not appear in GET response', async () => {
      // Delete a product
      const deleteData = {
        productId: 'prod-001',
      };

      const deleteRequest = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'DELETE',
        deleteData
      );
      const deleteResponse = await DELETE(deleteRequest);
      const deleteData = await deleteResponse.json();

      expect(deleteResponse.status).toBe(200);
      expect(deleteData.success).toBe(true);

      // Verify the deleted product does not appear in GET response
      const getRequest = createMockRequest('http://localhost:3000/api/gosellr/products');
      const getResponse = await GET(getRequest);
      const getData = await getResponse.json();

      expect(getResponse.status).toBe(200);
      expect(getData.success).toBe(true);
      // The deleted product should not be in the list
      const deletedProduct = getData.data.products.find((p: any) => p.id === 'prod-001');
      expect(deletedProduct).toBeUndefined();
    });
  });

  // ========================================
  // 8. EDGE CASE TESTS
  // ========================================

  describe('Edge Case Tests', () => {
    test('handles very large price values', async () => {
      const newProduct = {
        name: 'Expensive Product',
        description: 'A very expensive product',
        price: 999999.99,
        category: 'Luxury',
        sellerId: 'seller-1',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        newProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.price).toBe(999999.99);
    });

    test('handles very large stock values', async () => {
      const newProduct = {
        name: 'High Stock Product',
        description: 'A product with high stock',
        price: 10.0,
        category: 'Bulk',
        sellerId: 'seller-1',
        stock: 999999,
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        newProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.stock).toBe(999999);
    });

    test('handles empty string values', async () => {
      const newProduct = {
        name: '',
        description: '',
        price: 10.0,
        category: 'Test',
        sellerId: 'seller-1',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        newProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Name cannot be empty');
    });

    test('handles special characters in product name', async () => {
      const newProduct = {
        name: 'Product with Special Characters: !@#$%^&*()',
        description: 'A product with special characters',
        price: 10.0,
        category: 'Test',
        sellerId: 'seller-1',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        newProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('Product with Special Characters: !@#$%^&*()');
    });

    test('handles very long product descriptions', async () => {
      const longDescription = 'A'.repeat(1000); // 1000 character description
      const newProduct = {
        name: 'Long Description Product',
        description: longDescription,
        price: 10.0,
        category: 'Test',
        sellerId: 'seller-1',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/gosellr/products',
        'POST',
        newProduct
      );
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.description).toBe(longDescription);
    });
  });
});
