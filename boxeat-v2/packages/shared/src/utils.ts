export const formatPrice = (cents: number, currency: 'EUR' | 'USD' = 'EUR') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency
  }).format(cents / 100);
};
