/**
 * Calculator module for Quick Split bill splitting application
 * Handles all calculation logic and validation
 */

/**
 * Validate that an amount is a positive number
 * @param {number|string} amount - The amount to validate
 * @returns {{valid: boolean, error: string|null}} Validation result
 */
export function validateAmount(amount) {
  const num = Number(amount);
  
  if (amount === '' || amount === null || amount === undefined) {
    return { valid: false, error: 'Please enter a valid positive amount' };
  }
  
  if (isNaN(num)) {
    return { valid: false, error: 'Please enter a valid positive amount' };
  }
  
  if (num <= 0) {
    return { valid: false, error: 'Please enter a valid positive amount' };
  }
  
  return { valid: true, error: null };
}

/**
 * Validate that people count is at least 2
 * @param {number|string} count - The number of people
 * @returns {{valid: boolean, error: string|null}} Validation result
 */
export function validatePeopleCount(count) {
  const num = Number(count);
  
  if (count === '' || count === null || count === undefined) {
    return { valid: false, error: 'Please enter at least 2 people' };
  }
  
  if (isNaN(num)) {
    return { valid: false, error: 'Please enter at least 2 people' };
  }
  
  if (num < 2) {
    return { valid: false, error: 'Please enter at least 2 people' };
  }
  
  return { valid: true, error: null };
}

/**
 * Validate that tip percentage is between 0 and 100
 * @param {number|string} percentage - The tip percentage
 * @returns {{valid: boolean, error: string|null}} Validation result
 */
export function validateTipPercentage(percentage) {
  // Empty tip defaults to 0, which is valid
  if (percentage === '' || percentage === null || percentage === undefined) {
    return { valid: true, error: null };
  }
  
  const num = Number(percentage);
  
  if (isNaN(num)) {
    return { valid: false, error: 'Tip percentage must be between 0 and 100' };
  }
  
  if (num < 0 || num > 100) {
    return { valid: false, error: 'Tip percentage must be between 0 and 100' };
  }
  
  return { valid: true, error: null };
}

/**
 * Calculate equal split of a bill with tip
 * @param {number} totalAmount - The base bill amount
 * @param {number} numberOfPeople - Number of people splitting the bill
 * @param {number} tipPercentage - Tip percentage (0-100), defaults to 0
 * @returns {{originalAmount: number, tipPercentage: number, tipAmount: number, totalWithTip: number, perPersonAmount: number, numberOfPeople: number}}
 */
export function calculateEqualSplit(totalAmount, numberOfPeople, tipPercentage = 0) {
  const originalAmount = Number(totalAmount);
  const people = Number(numberOfPeople);
  const tip = Number(tipPercentage) || 0;
  
  const tipAmount = Math.round((originalAmount * tip / 100) * 100) / 100;
  const totalWithTip = originalAmount + tipAmount;
  const perPersonAmount = Math.round((totalWithTip / people) * 100) / 100;
  const totalWithTipRounded = Math.round(totalWithTip * 100) / 100;
  
  return {
    originalAmount,
    tipPercentage: tip,
    tipAmount,
    totalWithTip: totalWithTipRounded,
    perPersonAmount,
    numberOfPeople: people
  };
}

/**
 * Format a number as currency with $ symbol and 2 decimal places
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  const num = Number(amount);
  return `$${num.toFixed(2)}`;
}
