# Design Document

## Overview

Quick Split is a client-side single-page web application built with vanilla HTML, CSS, and JavaScript. The application requires no backend server or database, making it lightweight, fast, and easy to deploy. All calculations happen in the browser, ensuring privacy and instant results.

The application follows a simple, clean design philosophy with a focus on usability and mobile-first responsive design. The interface uses a card-based layout with clear visual hierarchy and immediate feedback for all user interactions.

## Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3 (with CSS Grid and Flexbox), Vanilla JavaScript (ES6+)
- **Testing**: Vitest for unit and property-based testing, fast-check for property-based testing library
- **Build Tool**: Vite for development server and optimized production builds
- **Deployment**: Static hosting (GitHub Pages, Netlify, or Vercel)

### Application Structure
```
quick-split/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── app.js             # Main application logic
├── calculator.js      # Bill calculation logic
├── tests/
│   ├── calculator.test.js    # Unit and property tests
│   └── app.test.js           # UI interaction tests
├── package.json
└── vite.config.js
```

## Components and Interfaces

### 1. Calculator Module (`calculator.js`)

The core calculation engine that handles all mathematical operations.

**Interface:**
```javascript
// Calculate equal split
function calculateEqualSplit(totalAmount, numberOfPeople, tipPercentage) {
  return {
    originalAmount: number,
    tipPercentage: number,
    tipAmount: number,
    totalWithTip: number,
    perPersonAmount: number,
    numberOfPeople: number
  }
}

// Validate inputs
function validateAmount(amount) {
  return { valid: boolean, error: string | null }
}

function validatePeopleCount(count) {
  return { valid: boolean, error: string | null }
}

function validateTipPercentage(percentage) {
  return { valid: boolean, error: string | null }
}

// Format currency
function formatCurrency(amount) {
  return string  // e.g., "$25.50"
}
```

### 2. UI Controller (`app.js`)

Manages DOM interactions, event handling, and updates the display.

**Responsibilities:**
- Capture user input from form fields
- Validate input and display error messages
- Trigger calculations when inputs change
- Update the results display
- Handle preset tip button clicks
- Manage reset functionality
- Provide visual feedback for interactions

**Key Functions:**
```javascript
function handleCalculate()
function handleTipPresetClick(percentage)
function handleReset()
function displayResults(calculationResult)
function displayError(fieldName, errorMessage)
function clearErrors()
```

### 3. UI Components

**Input Section:**
- Total Amount input field (type="number", step="0.01")
- Number of People input field (type="number", min="2")
- Tip Percentage input field (type="number", min="0", max="100")
- Preset tip buttons (10%, 15%, 18%, 20%)

**Results Section:**
- Original bill amount display
- Tip percentage and amount display
- Total with tip display
- Per person amount display (prominently styled)

**Action Buttons:**
- Calculate button (primary action)
- Reset button (secondary action)

## Data Models

### CalculationResult
```javascript
{
  originalAmount: number,      // Base bill amount
  tipPercentage: number,       // Tip as percentage (0-100)
  tipAmount: number,           // Calculated tip in currency
  totalWithTip: number,        // Original + tip
  perPersonAmount: number,     // Amount each person owes
  numberOfPeople: number       // Number of participants
}
```

### ValidationResult
```javascript
{
  valid: boolean,              // Whether input is valid
  error: string | null         // Error message if invalid
}
```

### InputState
```javascript
{
  totalAmount: string,         // Raw input value
  numberOfPeople: string,      // Raw input value
  tipPercentage: string,       // Raw input value
  selectedPreset: number | null // Active preset button
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After reviewing the prework analysis, several redundancies were identified:
- Properties 3.3 and 2.4 both verify that total with tip is displayed (consolidated into Property 4)
- Properties 3.4 and 1.3 both verify per-person calculation (kept as Property 2)
- Property 6.5 is covered by Property 6.2 (removed)

The following properties provide unique validation value:

Property 1: Division calculation correctness
*For any* valid positive total amount and valid number of people (>= 2), the per-person amount should equal the total divided by the number of people, rounded to two decimal places.
**Validates: Requirements 1.3, 1.4**

Property 2: Tip calculation correctness
*For any* valid total amount and valid tip percentage (0-100), the tip amount should equal the total multiplied by the tip percentage divided by 100.
**Validates: Requirements 2.2**

Property 3: Tip inclusion in split
*For any* valid inputs with a tip percentage, the per-person amount should be calculated as (originalAmount + tipAmount) / numberOfPeople, not (originalAmount / numberOfPeople) + tipAmount.
**Validates: Requirements 2.3**

Property 4: Complete result structure
*For any* valid calculation, the result object should contain originalAmount, tipPercentage, tipAmount, totalWithTip, perPersonAmount, and numberOfPeople fields.
**Validates: Requirements 2.4, 3.1, 3.2**

Property 5: Currency formatting consistency
*For any* monetary amount, the formatted string should contain a currency symbol ($) and exactly two decimal places.
**Validates: Requirements 3.5**

Property 6: Amount validation rejects invalid inputs
*For any* invalid amount input (negative, zero, non-numeric, or empty string), the validation function should return valid: false with an appropriate error message.
**Validates: Requirements 1.1, 1.5**

Property 7: People count validation
*For any* number of people less than 2 or non-numeric, the validation function should return valid: false with an appropriate error message.
**Validates: Requirements 1.2**

Property 8: Tip percentage validation bounds
*For any* tip percentage outside the range 0-100, the validation function should return valid: false with an appropriate error message.
**Validates: Requirements 2.1**

Property 9: Reset returns to initial state (idempotence)
*For any* application state, calling reset should clear all inputs and results, and calling reset again should produce the same empty state.
**Validates: Requirements 4.1, 4.2, 4.3**

Property 10: Preset button applies correct percentage
*For any* preset tip button (10%, 15%, 18%, 20%), clicking it should set the tip percentage to that exact value and trigger recalculation.
**Validates: Requirements 6.2**

Property 11: Custom tip deselects preset
*For any* active preset button state, when a user manually enters a different tip percentage, the preset button should become deselected.
**Validates: Requirements 6.4**

## Error Handling

### Input Validation Errors
- **Invalid Amount**: Display "Please enter a valid positive amount" when total amount is <= 0 or non-numeric
- **Invalid People Count**: Display "Please enter at least 2 people" when count is < 2 or non-numeric
- **Invalid Tip**: Display "Tip percentage must be between 0 and 100" when tip is outside valid range

### Error Display Strategy
- Show errors inline below the relevant input field
- Use red text and border color for error states
- Clear errors immediately when user corrects the input
- Prevent calculation when any validation errors exist

### Edge Cases
- **Zero tip**: Handle gracefully by treating as no tip (0%)
- **Empty inputs**: Treat as invalid and show appropriate error
- **Very large numbers**: JavaScript can handle numbers up to Number.MAX_SAFE_INTEGER (9007199254740991)
- **Decimal precision**: Always round to 2 decimal places to avoid floating-point errors

## Testing Strategy

### Unit Testing
We will use Vitest as our testing framework for both unit tests and property-based tests. Unit tests will cover:

- **Calculation functions**: Test specific examples of bill splitting calculations
- **Validation functions**: Test boundary cases (exactly 2 people, 0% tip, 100% tip, negative amounts)
- **Formatting functions**: Test currency formatting with various amounts
- **Edge cases**: Empty tip defaults to 0, very small amounts (< $1), very large amounts

Example unit tests:
- Split $100 among 4 people with 20% tip = $30 per person
- Split $50 among 2 people with 0% tip = $25 per person
- Validate that -$10 is rejected
- Validate that 1 person is rejected
- Format $25.5 as "$25.50"

### Property-Based Testing
We will use fast-check as our property-based testing library. Each property-based test will run a minimum of 100 iterations with randomly generated inputs.

Property-based tests will verify:
- **Mathematical correctness**: Division and tip calculations are correct for all valid inputs
- **Validation consistency**: Invalid inputs are always rejected with appropriate errors
- **Formatting consistency**: All monetary values are formatted correctly
- **State management**: Reset always returns to initial state
- **UI interactions**: Preset buttons and custom inputs work correctly

Each property-based test will be tagged with a comment explicitly referencing the correctness property from this design document using the format:
`// Feature: quick-split, Property X: [property description]`

### Test Organization
```
tests/
├── calculator.test.js
│   ├── Unit tests for calculation functions
│   ├── Property tests for Properties 1-8
│   └── Edge case tests
└── app.test.js
    ├── Unit tests for UI interactions
    ├── Property tests for Properties 9-11
    └── Integration tests
```

### Testing Requirements
- All tests must pass before considering a task complete
- Property-based tests must run at least 100 iterations
- Each correctness property must be implemented by a single property-based test
- Test coverage should include all public functions in calculator.js

## UI/UX Design

### Visual Design
- **Color Scheme**: 
  - Primary: #4F46E5 (Indigo) for buttons and accents
  - Success: #10B981 (Green) for results
  - Error: #EF4444 (Red) for validation errors
  - Background: #F9FAFB (Light gray)
  - Text: #111827 (Dark gray)

- **Typography**:
  - Font: System font stack (SF Pro, Segoe UI, Roboto)
  - Headings: 24px, bold
  - Body: 16px, regular
  - Results: 32px, bold for per-person amount

- **Spacing**: 
  - Use 8px grid system
  - Card padding: 24px
  - Input spacing: 16px between fields

### Responsive Breakpoints
- Mobile: < 640px (single column, full width)
- Tablet: 640px - 1024px (centered card, max-width 600px)
- Desktop: > 1024px (centered card, max-width 600px)

### Accessibility
- All inputs have associated labels
- Sufficient color contrast (WCAG AA compliant)
- Keyboard navigation support
- Focus indicators on all interactive elements
- ARIA labels for screen readers

## Performance Considerations

- **Load Time**: Target < 1 second on 3G connection
- **Bundle Size**: Keep total JS + CSS < 50KB (uncompressed)
- **Calculation Speed**: Instant (< 10ms) for all calculations
- **No External Dependencies**: Vanilla JS means no framework overhead

## Deployment

### Build Process
1. Vite builds optimized production bundle
2. Minifies HTML, CSS, and JavaScript
3. Generates source maps for debugging
4. Outputs to `dist/` directory

### Hosting Options
- **GitHub Pages**: Free, easy deployment from repository
- **Netlify**: Automatic deployments on git push
- **Vercel**: Zero-config deployment with preview URLs

### Environment
- No environment variables needed
- No backend configuration required
- Works entirely client-side

## Future Enhancements (Out of Scope for MVP)

- Custom split (unequal amounts per person)
- Multiple items with individual prices
- Tax calculation separate from tip
- Save/share calculation via URL
- Multiple currency support
- Dark mode toggle
- Print-friendly receipt view
