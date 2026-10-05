export const formatPrice = (amount: number, currency = 'INR') => {
  try {
    return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
};

export const formatDuration = (days?: number) => {
  if (!days) return '';
  if (days % 365 === 0) return `${days / 365} year${days === 365 ? '' : 's'}`;
  if (days % 30 === 0) return `${days / 30} month${days === 30 ? '' : 's'}`;
  return `${days} days`;
};

const dateFmt = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const dateTimeFmt = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const formatDate = (value?: string | Date | null) => (value ? dateFmt.format(new Date(value)) : '—');
export const formatDateTime = (value?: string | Date | null) => (value ? dateTimeFmt.format(new Date(value)) : '—');

/** Pull a readable message out of an axios error. */
export const apiMessage = (err: any, fallback = 'Something went wrong') =>
  err?.response?.data?.message ||
  (err?.code === 'ERR_NETWORK' || [502, 503, 504].includes(err?.response?.status) ? 'Cannot reach the server' : fallback);
