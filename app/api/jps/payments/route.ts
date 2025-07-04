// Roman Urdu: JPS Payments API Route
// Commission payments aur transaction history handle karta hai

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Roman Urdu: Payment schemas
const PaymentSchema = z.object({
  placementId: z.string().min(1, 'Placement ID is required'),
  candidateId: z.string().min(1, 'Candidate ID is required'),
  jobId: z.string().min(1, 'Job ID is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  commissionRate: z.number().min(0).max(100, 'Commission rate must be between 0-100'),
  paymentMethod: z.enum(['bank_transfer', 'cash', 'check', 'online']).default('bank_transfer'),
  description: z.string().optional()
});

const CommissionCalculationSchema = z.object({
  placementId: z.string().min(1, 'Placement ID is required'),
  candidateSQLLevel: z.number().min(0).max(4, 'SQL Level must be between 0-4'),
  jobSalary: z.number().min(0, 'Job salary must be positive'),
  placementDate: z.string().min(1, 'Placement date is required')
});

// Roman Urdu: Mock payment service
class PaymentService {
  // Roman Urdu: Calculate commission based on SQL Level
  static calculateCommission(sqlLevel: number, jobSalary: number): number {
    const commissionRates = {
      0: 0.15, // 15% commission for SQL Level 0
      1: 0.12, // 12% commission for SQL Level 1
      2: 0.10, // 10% commission for SQL Level 2
      3: 0.08, // 8% commission for SQL Level 3
      4: 0.05  // 5% commission for SQL Level 4
    };

    const rate = commissionRates[sqlLevel as keyof typeof commissionRates] || 0.15;
    return jobSalary * rate;
  }

  // Roman Urdu: Process payment
  static async processPayment(data: z.infer<typeof PaymentSchema>) {
    try {
      // Roman Urdu: Mock payment processing (replace with real payment gateway)
      console.log('💳 Processing payment:', {
        placementId: data.placementId,
        amount: data.amount,
        method: data.paymentMethod,
        timestamp: new Date().toISOString()
      });

      // Roman Urdu: Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        paymentId,
        amount: data.amount,
        commissionRate: data.commissionRate,
        paymentMethod: data.paymentMethod,
        status: 'completed',
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      throw new Error('Failed to process payment');
    }
  }

  // Roman Urdu: Calculate commission for placement
  static async calculateCommissionForPlacement(data: z.infer<typeof CommissionCalculationSchema>) {
    try {
      const commission = this.calculateCommission(data.candidateSQLLevel, data.jobSalary);
      
      return {
        placementId: data.placementId,
        jobSalary: data.jobSalary,
        candidateSQLLevel: data.candidateSQLLevel,
        commissionRate: this.getCommissionRate(data.candidateSQLLevel),
        commissionAmount: commission,
        placementDate: data.placementDate,
        calculatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Commission calculation error:', error);
      throw new Error('Failed to calculate commission');
    }
  }

  // Roman Urdu: Get commission rate for SQL Level
  static getCommissionRate(sqlLevel: number): number {
    const rates = [0.15, 0.12, 0.10, 0.08, 0.05];
    return rates[sqlLevel] || 0.15;
  }

  // Roman Urdu: Generate payment report
  static async generatePaymentReport(filters: any = {}) {
    try {
      // Roman Urdu: Mock payment data
      const payments = [
        {
          id: '1',
          placementId: '1',
          candidateId: '1',
          jobId: '1',
          candidateName: 'Ahmed Khan',
          jobTitle: 'Senior React Developer',
          company: 'TechCorp Solutions',
          amount: 12000,
          commissionRate: 0.08,
          paymentMethod: 'bank_transfer',
          status: 'completed',
          paymentDate: new Date(Date.now() - 86400000).toISOString(),
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '2',
          placementId: '2',
          candidateId: '2',
          jobId: '2',
          candidateName: 'Sarah Ahmed',
          jobTitle: 'Full Stack Developer',
          company: 'Digital Solutions',
          amount: 9600,
          commissionRate: 0.08,
          paymentMethod: 'online',
          status: 'pending',
          paymentDate: new Date().toISOString(),
          createdAt: new Date().toISOString()
        }
      ];

      // Roman Urdu: Apply filters
      let filteredPayments = payments;
      
      if (filters.status) {
        filteredPayments = filteredPayments.filter(p => p.status === filters.status);
      }
      
      if (filters.startDate) {
        filteredPayments = filteredPayments.filter(p => 
          new Date(p.paymentDate) >= new Date(filters.startDate)
        );
      }
      
      if (filters.endDate) {
        filteredPayments = filteredPayments.filter(p => 
          new Date(p.paymentDate) <= new Date(filters.endDate)
        );
      }

      // Roman Urdu: Calculate summary
      const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
      const completedPayments = filteredPayments.filter(p => p.status === 'completed');
      const pendingPayments = filteredPayments.filter(p => p.status === 'pending');
      
      return {
        payments: filteredPayments,
        summary: {
          totalPayments: filteredPayments.length,
          totalAmount,
          completedAmount: completedPayments.reduce((sum, p) => sum + p.amount, 0),
          pendingAmount: pendingPayments.reduce((sum, p) => sum + p.amount, 0),
          averageCommission: totalAmount / filteredPayments.length || 0
        }
      };
    } catch (error) {
      console.error('Payment report generation error:', error);
      throw new Error('Failed to generate payment report');
    }
  }
}

// Roman Urdu: GET - Get payments and reports
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const placementId = searchParams.get('placementId');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    switch (type) {
      case 'payments':
        const filters = { status, startDate, endDate };
        const report = await PaymentService.generatePaymentReport(filters);
        return NextResponse.json(report);

      case 'commission':
        if (!placementId) {
          return NextResponse.json({ error: 'Placement ID is required' }, { status: 400 });
        }
        
        // Roman Urdu: Mock commission calculation
        const commissionData = {
          placementId,
          candidateSQLLevel: 3,
          jobSalary: 150000,
          placementDate: new Date().toISOString()
        };
        
        const commission = await PaymentService.calculateCommissionForPlacement(commissionData);
        return NextResponse.json(commission);

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Payments GET Error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 });
  }
}

// Roman Urdu: POST - Process payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'process-payment':
        const paymentData = PaymentSchema.parse(data);
        const paymentResult = await PaymentService.processPayment(paymentData);
        return NextResponse.json(paymentResult, { status: 201 });

      case 'calculate-commission':
        const commissionData = CommissionCalculationSchema.parse(data);
        const commissionResult = await PaymentService.calculateCommissionForPlacement(commissionData);
        return NextResponse.json(commissionResult, { status: 201 });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('Payments POST Error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 });
  }
} 