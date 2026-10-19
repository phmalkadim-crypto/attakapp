export function formatIQD(amount: number): string {
  return `${amount.toLocaleString('ar-IQ')} د.ع`;
}

export function formatTimeRemaining(targetIsoDate: string): {
  formatted: string;
  isExpired: boolean;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const diff = new Date(targetIsoDate).getTime() - Date.now();
  if (diff <= 0) {
    return {
      formatted: 'منتهي',
      isExpired: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatted = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return {
    formatted,
    isExpired: false,
    hours,
    minutes,
    seconds,
  };
}

export function maskPhone(phone: string): string {
  if (!phone) return '07XXXXXXXXX';
  if (phone.length < 8) return '07XXXXXXXXX';
  const start = phone.slice(0, 3);
  const end = phone.slice(-2);
  return `${start}XXXXXX${end}`;
}

export function formatArabicDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('ar-IQ', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return isoDate;
  }
}
