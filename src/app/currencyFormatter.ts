const defaultOptions = {
  significantDigits: 2,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  symbol: '$',
};

export const currencyFormatter = (
  value: number,
  options?: typeof defaultOptions,
) => {
  options = { ...defaultOptions, ...options };
  const stringValue = value.toFixed(options.significantDigits);

  const [currency, decimal] = stringValue.split('.');

  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator,
  )}${options.decimalSeparator}${decimal}`;
};
