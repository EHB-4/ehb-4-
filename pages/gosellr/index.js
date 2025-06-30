import ProductCard from '../../components/ProductCard';

const products = [
  {
    id: 1,
    name: 'AI Smart Speaker',
    price: 99.99,
    image: 'https://via.placeholder.com/300x200?text=AI+Smart+Speaker',
    sql: 'Free',
  },
  {
    id: 2,
    name: 'Blockchain Wallet',
    price: 49.99,
    image: 'https://via.placeholder.com/300x200?text=Blockchain+Wallet',
    sql: 'Basic',
  },
  {
    id: 3,
    name: 'Verified Freelancer Service',
    price: 199.99,
    image: 'https://via.placeholder.com/300x200?text=Freelancer+Service',
    sql: 'Premium',
  },
  {
    id: 4,
    name: 'E-Learning Course',
    price: 29.99,
    image: 'https://via.placeholder.com/300x200?text=E-Learning+Course',
    sql: 'Free',
  },
];

export default function GoSellrProductList() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">GoSellr Product Listings</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 