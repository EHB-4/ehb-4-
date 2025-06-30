export function calculateOrderTotal(cartItems = [], options = {}) {
  let total = 0;
  for (const item of cartItems) {
    total += (item.price || 0) * (item.quantity || 1);
  }
  // Apply discount if provided
  if (options.discount) {
    if (typeof options.discount === 'number') {
      // percent discount
      total = total - (total * options.discount) / 100;
    } else if (typeof options.discount === 'object') {
      // { type: 'percent'|'fixed', value: number }
      if (options.discount.type === 'percent') {
        total = total - (total * options.discount.value) / 100;
      } else if (options.discount.type === 'fixed') {
        total = total - options.discount.value;
      }
    }
  }
  return Math.max(0, Math.round(total * 100) / 100);
} 