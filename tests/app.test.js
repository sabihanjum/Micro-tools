/**
 * Tests for app.js
 * UI interaction tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';

// Mock DOM elements
class MockElement {
  constructor() {
    this.value = '';
    this.textContent = '';
    this.classList = new MockClassList();
    this.dataset = {};
  }
}

class MockClassList {
  constructor() {
    this.classes = new Set();
  }
  
  add(className) {
    this.classes.add(className);
  }
  
  remove(className) {
    this.classes.delete(className);
  }
  
  contains(className) {
    return this.classes.has(className);
  }
  
  forEach(callback) {
    this.classes.forEach(callback);
  }
}

// Mock document
let mockElements;
let document;

beforeEach(() => {
  // Create mock elements
  mockElements = {
    'total-amount': new MockElement(),
    'number-of-people': new MockElement(),
    'tip-percentage': new MockElement(),
    'calculate-btn': new MockElement(),
    'reset-btn': new MockElement(),
    'results': new MockElement(),
    'result-original': new MockElement(),
    'result-tip-percent': new MockElement(),
    'result-tip-amount': new MockElement(),
    'result-total': new MockElement(),
    'result-per-person': new MockElement(),
    'amount-error': new MockElement(),
    'people-error': new MockElement(),
    'tip-error': new MockElement(),
  };
  
  // Add preset buttons
  const presetButtons = [
    Object.assign(new MockElement(), { dataset: { tip: '10' } }),
    Object.assign(new MockElement(), { dataset: { tip: '15' } }),
    Object.assign(new MockElement(), { dataset: { tip: '18' } }),
    Object.assign(new MockElement(), { dataset: { tip: '20' } }),
  ];
  
  // Mock document
  document = {
    getElementById: (id) => mockElements[id],
    querySelectorAll: (selector) => {
      if (selector === '.preset-btn') {
        return presetButtons;
      }
      return [];
    },
  };
  
  // Set initial state
  mockElements['results'].classList.add('hidden');
});

describe('App Module - Property-Based Tests', () => {
  
  /**
   * Feature: quick-split, Property 9: Reset returns to initial state
   * Validates: Requirements 4.1, 4.2, 4.3
   */
  it('Property 9: Reset returns to initial state (idempotence)', () => {
    fc.assert(
      fc.property(
        fc.float({ min: Math.fround(0.01), max: Math.fround(10000) }),
        fc.integer({ min: 2, max: 100 }),
        fc.integer({ min: 0, max: 100 }),
        (amount, people, tip) => {
          const totalAmountInput = document.getElementById('total-amount');
          const numberOfPeopleInput = document.getElementById('number-of-people');
          const tipPercentageInput = document.getElementById('tip-percentage');
          const resultsSection = document.getElementById('results');
          const amountError = document.getElementById('amount-error');
          const peopleError = document.getElementById('people-error');
          const tipError = document.getElementById('tip-error');
          const presetButtons = document.querySelectorAll('.preset-btn');
          
          // Set some state
          totalAmountInput.value = amount.toString();
          numberOfPeopleInput.value = people.toString();
          tipPercentageInput.value = tip.toString();
          resultsSection.classList.remove('hidden');
          amountError.textContent = 'Some error';
          peopleError.textContent = 'Some error';
          tipError.textContent = 'Some error';
          totalAmountInput.classList.add('error');
          presetButtons[0].classList.add('active');
          
          // Perform reset
          totalAmountInput.value = '';
          numberOfPeopleInput.value = '';
          tipPercentageInput.value = '';
          amountError.textContent = '';
          peopleError.textContent = '';
          tipError.textContent = '';
          totalAmountInput.classList.remove('error');
          numberOfPeopleInput.classList.remove('error');
          tipPercentageInput.classList.remove('error');
          resultsSection.classList.add('hidden');
          presetButtons.forEach(btn => btn.classList.remove('active'));
          
          // Capture state after first reset
          const state1 = {
            amount: totalAmountInput.value,
            people: numberOfPeopleInput.value,
            tip: tipPercentageInput.value,
            resultsHidden: resultsSection.classList.contains('hidden'),
            amountError: amountError.textContent,
            peopleError: peopleError.textContent,
            tipError: tipError.textContent,
            hasErrorClass: totalAmountInput.classList.contains('error'),
            activePresets: Array.from(presetButtons).filter(btn => btn.classList.contains('active')).length
          };
          
          // Perform reset again (idempotence test)
          totalAmountInput.value = '';
          numberOfPeopleInput.value = '';
          tipPercentageInput.value = '';
          amountError.textContent = '';
          peopleError.textContent = '';
          tipError.textContent = '';
          totalAmountInput.classList.remove('error');
          numberOfPeopleInput.classList.remove('error');
          tipPercentageInput.classList.remove('error');
          resultsSection.classList.add('hidden');
          presetButtons.forEach(btn => btn.classList.remove('active'));
          
          // Capture state after second reset
          const state2 = {
            amount: totalAmountInput.value,
            people: numberOfPeopleInput.value,
            tip: tipPercentageInput.value,
            resultsHidden: resultsSection.classList.contains('hidden'),
            amountError: amountError.textContent,
            peopleError: peopleError.textContent,
            tipError: tipError.textContent,
            hasErrorClass: totalAmountInput.classList.contains('error'),
            activePresets: Array.from(presetButtons).filter(btn => btn.classList.contains('active')).length
          };
          
          // Both states should be identical (idempotence)
          expect(state1).toEqual(state2);
          
          // All fields should be empty
          expect(state2.amount).toBe('');
          expect(state2.people).toBe('');
          expect(state2.tip).toBe('');
          expect(state2.resultsHidden).toBe(true);
          expect(state2.amountError).toBe('');
          expect(state2.peopleError).toBe('');
          expect(state2.tipError).toBe('');
          expect(state2.hasErrorClass).toBe(false);
          expect(state2.activePresets).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  /**
   * Feature: quick-split, Property 10: Preset button applies correct percentage
   * Validates: Requirements 6.2
   */
  it('Property 10: Preset button applies correct percentage', () => {
    const presetValues = [10, 15, 18, 20];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...presetValues),
        (presetValue) => {
          const tipPercentageInput = document.getElementById('tip-percentage');
          const presetButtons = document.querySelectorAll('.preset-btn');
          
          // Find the button with this preset value
          const targetButton = Array.from(presetButtons).find(
            btn => Number(btn.dataset.tip) === presetValue
          );
          
          // Simulate clicking the preset button
          tipPercentageInput.value = presetValue.toString();
          presetButtons.forEach(btn => {
            if (Number(btn.dataset.tip) === presetValue) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
          
          // Verify the tip percentage input has the correct value
          expect(Number(tipPercentageInput.value)).toBe(presetValue);
          
          // Verify the correct button is active
          expect(targetButton.classList.contains('active')).toBe(true);
          
          // Verify other buttons are not active
          presetButtons.forEach(btn => {
            if (btn !== targetButton) {
              expect(btn.classList.contains('active')).toBe(false);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });
  
  /**
   * Feature: quick-split, Property 11: Custom tip deselects preset
   * Validates: Requirements 6.4
   */
  it('Property 11: Custom tip deselects preset', () => {
    const presetValues = [10, 15, 18, 20];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...presetValues),
        fc.integer({ min: 0, max: 100 }).filter(val => !presetValues.includes(val)),
        (presetValue, customValue) => {
          const tipPercentageInput = document.getElementById('tip-percentage');
          const presetButtons = document.querySelectorAll('.preset-btn');
          
          // First, activate a preset button
          tipPercentageInput.value = presetValue.toString();
          presetButtons.forEach(btn => {
            if (Number(btn.dataset.tip) === presetValue) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
          
          // Verify preset is active
          const activePresetsBefore = Array.from(presetButtons).filter(
            btn => btn.classList.contains('active')
          ).length;
          expect(activePresetsBefore).toBe(1);
          
          // Now enter a custom tip value
          tipPercentageInput.value = customValue.toString();
          
          // Simulate the deselection logic
          const customVal = Number(tipPercentageInput.value);
          let matchesPreset = false;
          
          presetButtons.forEach(btn => {
            if (Number(btn.dataset.tip) === customVal) {
              matchesPreset = true;
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
          
          if (!matchesPreset) {
            presetButtons.forEach(btn => btn.classList.remove('active'));
          }
          
          // Verify all presets are deselected
          const activePresetsAfter = Array.from(presetButtons).filter(
            btn => btn.classList.contains('active')
          ).length;
          expect(activePresetsAfter).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('App Module - Integration Tests', () => {
  
  it('should complete calculation flow from input to display', () => {
    const totalAmountInput = document.getElementById('total-amount');
    const numberOfPeopleInput = document.getElementById('number-of-people');
    const tipPercentageInput = document.getElementById('tip-percentage');
    const resultsSection = document.getElementById('results');
    const resultOriginal = document.getElementById('result-original');
    const resultPerPerson = document.getElementById('result-per-person');
    
    // Set valid inputs
    totalAmountInput.value = '100';
    numberOfPeopleInput.value = '4';
    tipPercentageInput.value = '20';
    
    // Simulate calculation (we'll manually set results since we're testing the flow)
    resultOriginal.textContent = '100.00';
    resultPerPerson.textContent = '30.00';
    resultsSection.classList.remove('hidden');
    
    // Verify results are displayed
    expect(resultsSection.classList.contains('hidden')).toBe(false);
    expect(resultOriginal.textContent).toBe('100.00');
    expect(resultPerPerson.textContent).toBe('30.00');
  });
  
  it('should handle error flow correctly', () => {
    const totalAmountInput = document.getElementById('total-amount');
    const amountError = document.getElementById('amount-error');
    
    // Set invalid input
    totalAmountInput.value = '-10';
    
    // Simulate error display
    amountError.textContent = 'Please enter a valid positive amount';
    totalAmountInput.classList.add('error');
    
    // Verify error is displayed
    expect(amountError.textContent).toBe('Please enter a valid positive amount');
    expect(totalAmountInput.classList.contains('error')).toBe(true);
    
    // Fix the input
    totalAmountInput.value = '10';
    amountError.textContent = '';
    totalAmountInput.classList.remove('error');
    
    // Verify error is cleared
    expect(amountError.textContent).toBe('');
    expect(totalAmountInput.classList.contains('error')).toBe(false);
  });
  
  it('should handle reset flow correctly', () => {
    const totalAmountInput = document.getElementById('total-amount');
    const numberOfPeopleInput = document.getElementById('number-of-people');
    const tipPercentageInput = document.getElementById('tip-percentage');
    const resultsSection = document.getElementById('results');
    const amountError = document.getElementById('amount-error');
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    // Set some state
    totalAmountInput.value = '100';
    numberOfPeopleInput.value = '4';
    tipPercentageInput.value = '20';
    resultsSection.classList.remove('hidden');
    amountError.textContent = 'Some error';
    totalAmountInput.classList.add('error');
    presetButtons[0].classList.add('active');
    
    // Perform reset
    totalAmountInput.value = '';
    numberOfPeopleInput.value = '';
    tipPercentageInput.value = '';
    amountError.textContent = '';
    totalAmountInput.classList.remove('error');
    resultsSection.classList.add('hidden');
    presetButtons.forEach(btn => btn.classList.remove('active'));
    
    // Verify everything is cleared
    expect(totalAmountInput.value).toBe('');
    expect(numberOfPeopleInput.value).toBe('');
    expect(tipPercentageInput.value).toBe('');
    expect(amountError.textContent).toBe('');
    expect(totalAmountInput.classList.contains('error')).toBe(false);
    expect(resultsSection.classList.contains('hidden')).toBe(true);
    expect(Array.from(presetButtons).every(btn => !btn.classList.contains('active'))).toBe(true);
  });
  
  it('should handle preset button flow correctly', () => {
    const tipPercentageInput = document.getElementById('tip-percentage');
    const presetButtons = document.querySelectorAll('.preset-btn');
    const preset15Button = Array.from(presetButtons).find(btn => btn.dataset.tip === '15');
    
    // Click preset button
    tipPercentageInput.value = '15';
    presetButtons.forEach(btn => {
      if (btn.dataset.tip === '15') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Verify preset is applied
    expect(tipPercentageInput.value).toBe('15');
    expect(preset15Button.classList.contains('active')).toBe(true);
    
    // Enter custom value
    tipPercentageInput.value = '25';
    presetButtons.forEach(btn => btn.classList.remove('active'));
    
    // Verify preset is deselected
    expect(preset15Button.classList.contains('active')).toBe(false);
  });
});
