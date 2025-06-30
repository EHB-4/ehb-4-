import React, { useState } from 'react';

// Placeholder cart/order data
const cart = [
  { id: 1, name: 'Sample Physical Product', price: 100, quantity: 1 },
  { id: 2, name: 'Sample Digital Product', price: 50, quantity: 2 },
];

const paymentMethods = [
  'Stripe',
  'PayPal',
  'Crypto',
  'Bank Transfer',
  'Cash on Delivery',
];

export default function CheckoutPage() {
  const [shipping, setShipping] = useState({ name: '', address: '', phone: '' });
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send order to backend here
    setOrderPlaced(true);
  };

  const handlePayment = async () => {
    if (!payment) {
      setError('Please select a payment method');
      return;
    }

    try {
      const response = await fetch(`/api/payments/${payment.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'USD',
          payment_method: payment,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        setError('');
        setOrderPlaced(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
        <p className="mb-4">Your order has been placed successfully.</p>
        {/* AI Guidance: In a real app, show order summary and next steps here. */}
        <a href="/products" className="text-blue-600 underline">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">{success}</div>}
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <form onSubmit={handlePlaceOrder} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded px-3 py-2 mb-2"
            value={shipping.name}
            onChange={e => setShipping({ ...shipping, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border rounded px-3 py-2 mb-2"
            value={shipping.address}
            onChange={e => setShipping({ ...shipping, address: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border rounded px-3 py-2"
            value={shipping.phone}
            onChange={e => setShipping({ ...shipping, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <select
            value={payment}
            onChange={e => setPayment(e.target.value)}
            className="w-full border rounded px-3 py-2"
            aria-label="Select a payment method"
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <ul className="mb-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold text-lg">Total: ${total}</div>
        </div>
        <button
          type="submit"
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Pay
        </button>
      </form>
      {/* AI Guidance: In a real app, validate input, process payment, and save order to backend. */}
    </div>
  );
} 