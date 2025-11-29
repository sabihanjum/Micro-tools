/**
 * Main application controller for Quick Split
 * Handles UI interactions and updates
 */

import {
  calculateEqualSplit,
  validateAmount,
  validatePeopleCount,
  validateTipPercentage,
  formatCurrency
} from './calculator.js';

// DOM element references
const form = document.getElementById('calculator-form');
const totalAmountInput = document.getElementById('total-amount');
const numberOfPeopleInput = document.getElementById('number-of-people');
const tipPercentageInput = document.getElementById('tip-percentage');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const presetButtons = document.querySelectorAll('.preset-btn');
const resultsSection = document.getElementById('results');

// Error message elements
const amountError = document.getElementById('amount-error');
const peopleError = document.getElementById('people-error');
const tipError = document.getElementById('tip-error');

/**
 * Handle calculate button click
 */
function handleCalculate() {
  clearErrors();
  
  // Validate all inputs
  const amountValidation = validateAmount(totalAmountInput.value);
  const peopleValidation = validatePeopleCount(numberOfPeopleInput.value);
  const tipValidation = validateTipPercentage(tipPercentageInput.value);
  
  let hasErrors = false;
  
  if (!amountValidation.valid) {
    displayError('amount', amountValidation.error);
    hasErrors = true;
  }
  
  if (!peopleValidation.valid) {
    displayError('people', peopleValidation.error);
    hasErrors = true;
  }
  
  if (!tipValidation.valid) {
    displayError('tip', tipValidation.error);
    hasErrors = true;
  }
  
  if (hasErrors) {
    return;
  }
  
  // Perform calculation
  const result = calculateEqualSplit(
    totalAmountInput.value,
    numberOfPeopleInput.value,
    tipPercentageInput.value || 0
  );
  
  displayResults(result);
}

/**
 * Handle reset button click
 */
function handleReset() {
  // Clear all inputs
  totalAmountInput.value = '';
  numberOfPeopleInput.value = '';
  tipPercentageInput.value = '';
  
  // Clear errors
  clearErrors();
  
  // Hide results
  resultsSection.classList.add('hidden');
  
  // Deselect preset buttons
  presetButtons.forEach(btn => btn.classList.remove('active'));
  
  // Focus first input
  totalAmountInput.focus();
}

/**
 * Handle preset tip button click
 * @param {number} percentage - The tip percentage to apply
 */
function handleTipPresetClick(percentage) {
  // Set the tip percentage
  tipPercentageInput.value = percentage;
  
  // Update active state
  presetButtons.forEach(btn => {
    if (Number(btn.dataset.tip) === percentage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Clear tip error if any
  tipError.textContent = '';
  tipPercentageInput.classList.remove('error');
}

/**
 * Display calculation results
 * @param {Object} result - The calculation result object
 */
function displayResults(result) {
  document.getElementById('result-original').textContent = formatCurrency(result.originalAmount);
  document.getElementById('result-tip-percent').textContent = `${result.tipPercentage}%`;
  document.getElementById('result-tip-amount').textContent = formatCurrency(result.tipAmount);
  document.getElementById('result-total').textContent = formatCurrency(result.totalWithTip);
  document.getElementById('result-per-person').textContent = formatCurrency(result.perPersonAmount);
  
  resultsSection.classList.remove('hidden');
}

/**
 * Display error message for a field
 * @param {string} fieldName - The field name ('amount', 'people', or 'tip')
 * @param {string} errorMessage - The error message to display
 */
function displayError(fieldName, errorMessage) {
  let errorElement, inputElement;
  
  switch (fieldName) {
    case 'amount':
      errorElement = amountError;
      inputElement = totalAmountInput;
      break;
    case 'people':
      errorElement = peopleError;
      inputElement = numberOfPeopleInput;
      break;
    case 'tip':
      errorElement = tipError;
      inputElement = tipPercentageInput;
      break;
  }
  
  if (errorElement && inputElement) {
    errorElement.textContent = errorMessage;
    inputElement.classList.add('error');
  }
}

/**
 * Clear all error messages
 */
function clearErrors() {
  amountError.textContent = '';
  peopleError.textContent = '';
  tipError.textContent = '';
  
  totalAmountInput.classList.remove('error');
  numberOfPeopleInput.classList.remove('error');
  tipPercentageInput.classList.remove('error');
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
resetBtn.addEventListener('click', handleReset);

presetButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    handleTipPresetClick(Number(btn.dataset.tip));
  });
});

// Real-time validation on input change
totalAmountInput.addEventListener('input', () => {
  const validation = validateAmount(totalAmountInput.value);
  if (!validation.valid && totalAmountInput.value !== '') {
    displayError('amount', validation.error);
  } else {
    amountError.textContent = '';
    totalAmountInput.classList.remove('error');
  }
});

numberOfPeopleInput.addEventListener('input', () => {
  const validation = validatePeopleCount(numberOfPeopleInput.value);
  if (!validation.valid && numberOfPeopleInput.value !== '') {
    displayError('people', validation.error);
  } else {
    peopleError.textContent = '';
    numberOfPeopleInput.classList.remove('error');
  }
});

tipPercentageInput.addEventListener('input', () => {
  const validation = validateTipPercentage(tipPercentageInput.value);
  if (!validation.valid && tipPercentageInput.value !== '') {
    displayError('tip', validation.error);
  } else {
    tipError.textContent = '';
    tipPercentageInput.classList.remove('error');
  }
  
  // Deselect preset when custom tip is entered
  const customValue = Number(tipPercentageInput.value);
  let matchesPreset = false;
  
  presetButtons.forEach(btn => {
    if (Number(btn.dataset.tip) === customValue) {
      matchesPreset = true;
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  if (!matchesPreset) {
    presetButtons.forEach(btn => btn.classList.remove('active'));
  }
});

// Export functions for testing
export {
  handleCalculate,
  handleReset,
  handleTipPresetClick,
  displayResults,
  displayError,
  clearErrors
};
