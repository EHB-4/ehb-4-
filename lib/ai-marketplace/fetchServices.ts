export interface AIService {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  pricing: {
    type: 'free' | 'pay-per-use' | 'subscription';
    price?: number;
    currency?: string;
  };
  rating: number;
  usageCount: number;
  isAvailable: boolean;
}

export async function fetchServices(): Promise<AIService[]> {
  try {
    const response = await fetch('/api/ai-marketplace/services');
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching AI services:', error);
    // Return mock data for development
    return [
      {
        id: '1',
        name: 'Text Generation AI',
        description: 'Advanced text generation and content creation',
        category: 'text',
        provider: 'OpenAI',
        pricing: { type: 'pay-per-use', price: 0.02, currency: 'USD' },
        rating: 4.5,
        usageCount: 1500,
        isAvailable: true,
      },
      {
        id: '2',
        name: 'Image Recognition',
        description: 'Computer vision and image analysis',
        category: 'vision',
        provider: 'Google',
        pricing: { type: 'subscription', price: 50, currency: 'USD' },
        rating: 4.2,
        usageCount: 800,
        isAvailable: true,
      },
    ];
  }
}
