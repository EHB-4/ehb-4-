export function getSqlBadge(level) {
  switch ((level || '').toLowerCase()) {
    case 'free':
      return { text: 'Free', color: 'gray' };
    case 'basic':
      return { text: 'Basic', color: 'blue' };
    case 'normal':
      return { text: 'Normal', color: 'green' };
    case 'high':
      return { text: 'High', color: 'purple' };
    case 'vip':
      return { text: 'VIP', color: 'gold' };
    default:
      return { text: 'Unknown', color: 'gray' };
  }
} 