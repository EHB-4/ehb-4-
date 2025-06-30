export function formatPrice(amount, currency = 'PKR') {
  if (typeof amount !== 'number') return '';
  if (currency === 'PKR' || currency === 'Rs') {
    return `Rs ${amount.toLocaleString('en-PK')}`;
  }
  if (currency === 'USD' || currency === '$') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }
  // Fallback: generic
  return `${currency} ${amount.toLocaleString()}`;
} 