import React, { useState } from 'react';

interface PaymentFormProps {
  amount: number;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: Error) => void;
}

export default function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // In a real app, this would integrate with Stripe
      // const response = await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: {
      //     number: formData.cardNumber,
      //     exp_month: parseInt(formData.expiryDate.split('/')[0]),
      //     exp_year: parseInt(formData.expiryDate.split('/')[1]),
      //     cvc: formData.cvc,
      //   },
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      onSuccess?.('payment_123');
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

      <div className="mb-6">
        <p className="text-lg font-medium text-gray-900">Total Amount</p>
        <p className="text-3xl font-bold text-blue-600">${amount.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Cardholder Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
              placeholder="123"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-xs text-gray-500">
          Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>
    </div>
  );
}

// AI Guidance: This component handles payment processing with Stripe integration.
// In a real app, you would need to:
// 1. Install and configure Stripe.js
// 2. Set up a backend endpoint to handle payment processing
// 3. Implement proper error handling and validation
// 4. Add loading states and success/error messages
