export const currency = (value: string | number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
  }).format(Number(value));
