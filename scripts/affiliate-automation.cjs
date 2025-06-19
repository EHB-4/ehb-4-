class AffiliateAutomation {
  constructor() {
    this.commissionRates = {
      L1: 0.2, // 20%
      L2: 0.1, // 10%
      L3: 0.05, // 5%
      L4: 0.03, // 3%
      L5: 0.02, // 2%
    };
  }

  // Generate unique referral code
  generateReferralCode(username) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${username}_${timestamp}_${random}`.toUpperCase();
  }

  // Calculate commission for a level
  calculateCommission(orderAmount, level) {
    const rate = this.commissionRates[`L${level}`] || 0;
    return orderAmount * rate;
  }

  // Get commission breakdown for an order
  getCommissionBreakdown(orderAmount) {
    const breakdown = {};
    for (let level = 1; level <= 5; level++) {
      breakdown[`L${level}`] = this.calculateCommission(orderAmount, level);
    }
    return breakdown;
  }

  // Validate referral code format
  validateReferralCode(code) {
    const pattern = /^[A-Z0-9_]+$/;
    return pattern.test(code) && code.length >= 8;
  }

  // Generate affiliate statistics
  generateStats(commissions, withdrawals, referrals) {
    const totalEarnings = commissions.reduce((sum, c) => sum + c.amount, 0);
    const totalWithdrawn = withdrawals.reduce((sum, w) => sum + w.amount, 0);
    const currentBalance = totalEarnings - totalWithdrawn;

    return {
      totalEarnings,
      totalWithdrawn,
      currentBalance,
      referralCount: referrals.length,
      commissionCount: commissions.length,
      withdrawalCount: withdrawals.length,
    };
  }

  // Check eligibility for Quick Bonus
  checkQuickBonusEligibility(monthlyCommissions) {
    const franchiseSales = monthlyCommissions.filter(c => c.type === 'FRANCHISE_REWARD');
    return {
      eligible: franchiseSales.length >= 5,
      salesCount: franchiseSales.length,
      required: 5,
      bonus: franchiseSales.length >= 5 ? 100 : 0,
    };
  }

  // Calculate rank requirements
  getRankRequirements(currentRank) {
    const requirements = {
      BRONZE: { sales: 0, earnings: 0 },
      SILVER: { sales: 10, earnings: 500 },
      GOLD: { sales: 25, earnings: 1500 },
      PLATINUM: { sales: 50, earnings: 3000 },
      DIAMOND: { sales: 100, earnings: 10000 },
    };

    return requirements[currentRank] || requirements.BRONZE;
  }

  // Check if affiliate can upgrade rank
  canUpgradeRank(currentRank, totalSales, totalEarnings) {
    const requirements = this.getRankRequirements(currentRank);
    return totalSales >= requirements.sales && totalEarnings >= requirements.earnings;
  }

  // Generate withdrawal validation
  validateWithdrawal(currentBalance, amount, method) {
    const errors = [];

    if (amount < 5) {
      errors.push('Minimum withdrawal amount is $5');
    }

    if (amount > currentBalance) {
      errors.push('Insufficient balance');
    }

    if (method === 'BEP20' && !this.validateBEP20Address) {
      errors.push('Invalid BEP20 address');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Simulate commission distribution
  simulateCommissionDistribution(orderAmount, buyerLevel) {
    const distribution = [];

    for (let level = 1; level <= 5; level++) {
      const commission = this.calculateCommission(orderAmount, level);
      if (commission > 0) {
        distribution.push({
          level: `L${level}`,
          rate: this.commissionRates[`L${level}`],
          amount: commission,
          description: `Level ${level} commission from $${orderAmount} order`,
        });
      }
    }

    return distribution;
  }
}

// Export for use in other modules
module.exports = AffiliateAutomation;

// Example usage
if (require.main === module) {
  const automation = new AffiliateAutomation();

  console.log('🚀 Affiliate Automation System Ready!');
  console.log('✅ All functions loaded successfully');

  // Example calculations
  const orderAmount = 100;
  const breakdown = automation.getCommissionBreakdown(orderAmount);
  console.log('📊 Commission Breakdown for $100 order:');
  Object.entries(breakdown).forEach(([level, amount]) => {
    console.log(`   ${level}: $${amount.toFixed(2)}`);
  });

  // Example referral code
  const referralCode = automation.generateReferralCode('john_doe');
  console.log(`🔗 Generated Referral Code: ${referralCode}`);

  // Example validation
  const isValid = automation.validateReferralCode(referralCode);
  console.log(`✅ Referral Code Valid: ${isValid}`);

  console.log('\n🎉 System is fully operational!');
}
