export function formatCurrency(price: number): string {
  return "$" + (price / 100).toFixed(2);
}

export function formatSubtotal(price: number, quantity: number): string {
  return formatCurrency(price * quantity);
}

export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
