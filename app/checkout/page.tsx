import React from 'react';
import PaymentForm from '../../../components/PaymentForm';

// Placeholder data (in a real app, fetch from backend)
const orderData = {
  items: [
    {
      id: 1,
      name: 'Premium Headphones',
      price: 199.99,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      price: 49.99,
      quantity: 2,
    },
  ],
  shipping: 10,
  tax: 25,
};

export default function CheckoutPage() {
  const handlePayment = async (paymentData: any) => {
    // In a real app, this would process the payment through a payment gateway
    console.log('Processing payment:', paymentData);
  };

  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + orderData.shipping + orderData.tax;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-white rounded-lg shadow p-6">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping</span>
                <span>${orderData.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Tax</span>
                <span>${orderData.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <PaymentForm
            amount={total}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
}

// AI Guidance: This page handles the checkout process and payment processing.
// In a real app, it would integrate with a payment gateway and handle order creation. 