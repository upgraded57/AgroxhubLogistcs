export const currency = (value: string | number) =>
  new Intl.NumberFormat("ng-NG", { style: "currency", currency: "NGN" }).format(
    Number(value)
  );
