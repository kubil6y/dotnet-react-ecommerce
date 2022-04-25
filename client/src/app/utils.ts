export class CustomFormat {
  public static Currency = (price: number): string => {
    return "$" + (price / 100).toFixed(2);
  };

  public static Subtotal = (price: number, quantity: number): string => {
    return this.Currency(price * quantity);
  };
}

export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
