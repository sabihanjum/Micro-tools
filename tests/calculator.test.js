/**
 * Tests for calculator.js
 * Unit tests and property-based tests for calculation logic
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  calculateEqualSplit,
  validateAmount,
  validatePeopleCount,
  validateTipPercentage,
  formatCurrency
} from '../calculator.js';

describe('Calculator Module', () => {
  // Placeholder for tests - will be implemented in subsequent tasks
  it('should be defined', () => {
    expect(calculateEqualSplit).toBeDefined();
    expect(validateAmount).toBeDefined();
    expect(validatePeopleCount).toBeDefined();
    expect(validateTipPercentage).toBeDefined();
    expect(formatCurrency).toBeDefined();
  });

  describe('Property-Based Tests', () => {
    // Feature: quick-split, Property 6: Amount validation rejects invalid inputs
    // Validates: Requirements 1.1, 1.5
    it('Property 6: Amount validation rejects invalid inputs', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant(''),
            fc.constant(null),
            fc.constant(undefined),
            fc.double({ max: 0 }), // negative or zero
            fc.string().filter(s => isNaN(Number(s)) && s !== '') // non-numeric strings
          ),
          (invalidAmount) => {
            const result = validateAmount(invalidAmount);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('Please enter a valid positive amount');
          }
        ),
        { numRuns: 100 }
      );
    });

    // Feature: quick-split, Property 7: People count validation
    // Validates: Requirements 1.2
    it('Property 7: People count validation', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant(''),
            fc.constant(null),
            fc.constant(undefined),
            fc.integer({ max: 1 }), // less than 2
            fc.string().filter(s => isNaN(Number(s)) && s !== '') // non-numeric strings
          ),
          (invalidCount) => {
            const result = validatePeopleCount(invalidCount);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('Please enter at least 2 people');
          }
        ),
        { numRuns: 100 }
      );
    });

    // Feature: quick-split, Property 8: Tip percentage validation bounds
    // Validates: Requirements 2.1
    it('Property 8: Tip percentage validation bounds', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.double({ min: 100.01 }), // greater than 100
            fc.double({ max: -0.01 }), // less than 0
            fc.string().filter(s => isNaN(Number(s)) && s !== '') // non-numeric strings
          ),
          (invalidTip) => {
            const result = validateTipPercentage(invalidTip);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('Tip percentage must be between 0 and 100');
          }
        ),
        { numRuns: 100 }
      );
    });

    // Feature: quick-split, Property 1: Division calculation correctness
    // Validates: Requirements 1.3, 1.4
    it('Property 1: Division calculation correctness', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.01, max: 1000000, noNaN: true }),
          fc.integer({ min: 2, max: 100 }),
          (totalAmount, numberOfPeople) => {
            const result = calculateEqualSplit(totalAmount, numberOfPeople, 0);
            const expected = Math.round((totalAmount / numberOfPeople) * 100) / 100;
            expect(result.perPersonAmount).toBe(expected);
          }
        ),
        { numRuns: 100 }
      );
    });

    // Feature: quick-split, Property 2: Tip calculation correctness
    // Validates: Requirements 2.2
    it('Property 2: Tip calculation correctness', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.01, max: 1000000, noNaN: true }),
          fc.integer({ min: 2, max: 100 }),
          fc.double({ min: 0, max: 100, noNaN: true }),
          (totalAmount, numberOfPeople, tipPercentage) => {
            const result = calculateEqualSplit(totalAmount, numberOfPeople, tipPercentage);
            const expected = Math.round((totalAmount * tipPercentage / 100) * 100) / 100;
            expect(result.tipAmount).toBe(expected);
          }
        ),
        { numRuns: 100 }
      );
    });

    // Feature: quick-split, Property 3: Tip inclusion in split
    // Validates: Requirements 2.3
    it('Property 3: Tip inclusion in split', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.01, max: 1000000, noNaN: true }),
          fc.integer({ min: 2, max: 100 }),
          fc.double({ min: 0.01, max: 100, noNaN: true }),
          (totalAmount, numberOfPeople, tipPercentage) => {
            const result = calculateEqualSplit(totalAmount, numberOfPeople, tipPercentage);
            // Verify that per-person amount is based on (original + tip) / people
            // Not (original / people) + tip
            const tipAmount = Math.round((totalAmount * tipPercentage / 100) * 100) / 100;
            const totalWithTip = totalAmount + tipAmount; // Don't round before dividing
            const expected = Math.round((totalWithTip / numberOfPeople) * 100) / 100;
            expect(result.perPersonAmount).toBe(expected);
          }
        ),
        { numRuns: 100 }
      );
    });

    // Feature: quick-split, Property 4: Complete result structure
    // Validates: Requirements 2.4, 3.1, 3.2
    it('Property 4: Complete result structure', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.01, max: 1000000, noNaN: true }),
          fc.integer({ min: 2, max: 100 }),
          fc.double({ min: 0, max: 100, noNaN: true }),
          (totalAmount, numberOfPeople, tipPercentage) => {
            const result = calculateEqualSplit(totalAmount, numberOfPeople, tipPercentage);
            // Verify all required fields exist
            expect(result).toHaveProperty('originalAmount');
            expect(result).toHaveProperty('tipPercentage');
            expect(result).toHaveProperty('tipAmount');
            expect(result).toHaveProperty('totalWithTip');
            expect(result).toHaveProperty('perPersonAmount');
            expect(result).toHaveProperty('numberOfPeople');
            // Verify all fields are numbers
            expect(typeof result.originalAmount).toBe('number');
            expect(typeof result.tipPercentage).toBe('number');
            expect(typeof result.tipAmount).toBe('number');
            expect(typeof result.totalWithTip).toBe('number');
            expect(typeof result.perPersonAmount).toBe('number');
            expect(typeof result.numberOfPeople).toBe('number');
          }
        ),
        { numRuns: 100 }
      );
    });

    // Feature: quick-split, Property 5: Currency formatting consistency
    // Validates: Requirements 3.5
    it('Property 5: Currency formatting consistency', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 1000000, noNaN: true }),
          (amount) => {
            const formatted = formatCurrency(amount);
            // Verify it starts with $
            expect(formatted).toMatch(/^\$/);
            // Verify it has exactly 2 decimal places
            expect(formatted).toMatch(/\.\d{2}$/);
            // Verify the numeric part matches the amount rounded to 2 decimals
            const numericPart = formatted.substring(1);
            const expected = amount.toFixed(2);
            expect(numericPart).toBe(expected);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Unit Tests - Edge Cases', () => {
    it('should default to 0% tip when tip is not provided', () => {
      const result = calculateEqualSplit(100, 2);
      expect(result.tipPercentage).toBe(0);
      expect(result.tipAmount).toBe(0);
      expect(result.totalWithTip).toBe(100);
    });

    it('should handle very small amounts (< $1)', () => {
      const result = calculateEqualSplit(0.50, 2, 0);
      expect(result.perPersonAmount).toBe(0.25);
    });

    it('should handle very large amounts', () => {
      const result = calculateEqualSplit(1000000, 2, 0);
      expect(result.perPersonAmount).toBe(500000);
    });

    it('should calculate specific example: $100 among 4 people with 20% tip', () => {
      const result = calculateEqualSplit(100, 4, 20);
      expect(result.originalAmount).toBe(100);
      expect(result.tipAmount).toBe(20);
      expect(result.totalWithTip).toBe(120);
      expect(result.perPersonAmount).toBe(30);
    });

    it('should calculate specific example: $50 among 2 people with 0% tip', () => {
      const result = calculateEqualSplit(50, 2, 0);
      expect(result.originalAmount).toBe(50);
      expect(result.tipAmount).toBe(0);
      expect(result.totalWithTip).toBe(50);
      expect(result.perPersonAmount).toBe(25);
    });
  });
});
