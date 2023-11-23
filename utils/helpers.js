export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const formatCurrency = (value) =>
  value ? value.toLocaleString('en', { currency: 'NGN' }) : 0;

export const limitText = (sentence, limit) =>
  limit
    ? sentence && sentence.length > limit
      ? sentence.slice(0, limit) + '...'
      : sentence
    : sentence;

export const dateLocale = (date, showYear) => {
  const conv = new Date(date);
  return conv.toLocaleDateString('en', {
    month: 'short',
    day: '2-digit',
    year:
      showYear === undefined
        ? 'numeric'
        : showYear === false
        ? undefined
        : 'numeric',
  });
};

export const dateTimeLocale = (date) => {
  const conv = new Date(date);
  return conv.toLocaleString('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const sumTotal = (numbers) => {
  let sum = 0;
  for (const value of numbers) {
    sum += value;
  }
  return sum;
};
