export function formatCurrency(price: number): string {
  return "$" + (price / 100).toFixed(2);
}
