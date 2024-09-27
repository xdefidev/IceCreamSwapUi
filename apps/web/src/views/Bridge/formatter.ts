export const formatAmount = (amount: string | number) => {
  const number = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4, notation: 'compact' }).format(number)
}
