import { Type } from "@/constants/type";

/**
 * Format amount as currency without currency symbol and no decimals
 * @param amount - The amount to format
 * @param type - Optional transaction type (expense/income) for sign
 * @returns Formatted amount string
 */
export const formatAmount = (
  amount: number,
  type?: number
): string => {
  // Format number with thousand separators but no decimals
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedAmount = formatter.format(Math.abs(amount));
  
  // If type is provided, add appropriate sign
  if (type !== undefined) {
    const sign = type === Type.EXPENSE ? '-' : '+';
    return `${sign}${formattedAmount}`;
  }
  
  return formattedAmount;
};
