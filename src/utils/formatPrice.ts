const formatCurrency = (
  value: number,
  currencyCode = "BRL",
  locale = "pt-BR"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(value);
};

export { formatCurrency };
