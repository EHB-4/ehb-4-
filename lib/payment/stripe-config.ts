import Stripe from 'stripe';

// Stripe Configuration
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Payment Intent Configuration
export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    throw error;
  }
};

// Webhook Handler
export const handleStripeWebhook = async (event: Stripe.Event) => {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      // Handle successful payment
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedPayment.id);
      // Handle failed payment
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};

// Product Configuration
export const createStripeProduct = async (product: {
  name: string;
  description?: string;
  price: number;
  currency?: string;
}) => {
  try {
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
    });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(product.price * 100),
      currency: product.currency || 'usd',
    });

    return { product: stripeProduct, price: stripePrice };
  } catch (error) {
    console.error('Stripe product creation failed:', error);
    throw error;
  }
};
