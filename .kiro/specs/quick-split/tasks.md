# Implementation Plan

- [x] 1. Set up project structure and development environment




  - Initialize npm project with Vite
  - Configure Vitest for testing
  - Install fast-check for property-based testing
  - Create basic file structure (index.html, styles.css, app.js, calculator.js)
  - Set up vite.config.js with test configuration
  - _Requirements: All_

- [x] 2. Implement core calculation logic



  - [x] 2.1 Create calculator.js with validation functions

    - Implement validateAmount() to check for positive numbers
    - Implement validatePeopleCount() to check for minimum 2 people
    - Implement validateTipPercentage() to check 0-100 range
    - _Requirements: 1.1, 1.2, 1.5, 2.1_

  - [x] 2.2 Write property test for amount validation


    - **Property 6: Amount validation rejects invalid inputs**
    - **Validates: Requirements 1.1, 1.5**

  - [x] 2.3 Write property test for people count validation


    - **Property 7: People count validation**
    - **Validates: Requirements 1.2**

  - [x] 2.4 Write property test for tip percentage validation


    - **Property 8: Tip percentage validation bounds**
    - **Validates: Requirements 2.1**

  - [x] 2.5 Implement calculateEqualSplit() function

    - Calculate tip amount from percentage
    - Calculate total with tip
    - Calculate per-person amount
    - Round all amounts to 2 decimal places
    - Return complete result object
    - _Requirements: 1.3, 1.4, 2.2, 2.3, 2.4_

  - [x] 2.6 Write property test for division calculation


    - **Property 1: Division calculation correctness**
    - **Validates: Requirements 1.3, 1.4**

  - [x] 2.7 Write property test for tip calculation


    - **Property 2: Tip calculation correctness**
    - **Validates: Requirements 2.2**

  - [x] 2.8 Write property test for tip inclusion in split


    - **Property 3: Tip inclusion in split**
    - **Validates: Requirements 2.3**

  - [x] 2.9 Write property test for result structure


    - **Property 4: Complete result structure**
    - **Validates: Requirements 2.4, 3.1, 3.2**

  - [x] 2.10 Implement formatCurrency() function

    - Add dollar sign prefix
    - Format to exactly 2 decimal places
    - Handle edge cases (very small/large numbers)
    - _Requirements: 3.5_

  - [x] 2.11 Write property test for currency formatting


    - **Property 5: Currency formatting consistency**
    - **Validates: Requirements 3.5**

  - [x] 2.12 Write unit tests for edge cases


    - Test zero tip defaults to 0%
    - Test very small amounts (< $1)
    - Test very large amounts
    - Test specific calculation examples
    - _Requirements: 2.5_

- [x] 3. Build HTML structure and basic styling





  - [x] 3.1 Create index.html with semantic markup


    - Add input fields for total amount, number of people, tip percentage
    - Add preset tip buttons (10%, 15%, 18%, 20%)
    - Add calculate and reset buttons
    - Add results display section
    - Include proper labels and ARIA attributes
    - _Requirements: 1.1, 1.2, 2.1, 6.1_

  - [x] 3.2 Implement responsive CSS styling


    - Set up mobile-first responsive layout
    - Style input fields and buttons with proper sizing (44x44px minimum)
    - Implement color scheme (indigo primary, green success, red error)
    - Add focus states and visual feedback
    - Ensure WCAG AA contrast compliance
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 3.3 Style results display section


    - Create clear visual hierarchy for breakdown
    - Make per-person amount prominent (32px, bold)
    - Format all monetary displays consistently
    - Add spacing and card layout
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 4. Implement UI controller and interactions





  - [x] 4.1 Create app.js with event handlers


    - Set up DOM element references
    - Implement handleCalculate() to process inputs
    - Implement handleReset() to clear form
    - Implement handleTipPresetClick() for preset buttons
    - Add input event listeners for real-time validation
    - _Requirements: 1.3, 4.1, 4.2, 6.2_


  - [x] 4.2 Implement input validation and error display


    - Call validation functions on input change
    - Display inline error messages below fields
    - Add error styling (red border, red text)
    - Clear errors when input becomes valid
    - Prevent calculation when validation fails
    - _Requirements: 1.5_




  - [x] 4.3 Implement results display logic
    - Show/hide results section based on calculation state
    - Display all breakdown components (original, tip, total, per-person)
    - Format all amounts using formatCurrency()
    - Update display immediately on calculation
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 4.4 Implement preset tip button interactions
    - Add active state styling for selected preset
    - Deselect preset when custom tip is entered
    - Trigger calculation when preset is clicked
    - _Requirements: 6.2, 6.3, 6.4, 6.5_

  - [x] 4.5 Implement reset functionality
    - Clear all input fields
    - Clear results display
    - Clear error messages
    - Deselect active preset button
    - Set focus to first input field
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 4.6 Write property test for reset idempotence


    - **Property 9: Reset returns to initial state**
    - **Validates: Requirements 4.1, 4.2, 4.3**

  - [x] 4.7 Write property test for preset button behavior


    - **Property 10: Preset button applies correct percentage**
    - **Validates: Requirements 6.2**

  - [x] 4.8 Write property test for custom tip deselection


    - **Property 11: Custom tip deselects preset**
    - **Validates: Requirements 6.4**

  - [x] 4.9 Write integration tests for UI interactions


    - Test complete calculation flow from input to display
    - Test error handling flow
    - Test reset flow
    - Test preset button flow
    - _Requirements: All_

- [x] 5. Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Polish and finalize



  - [x] 6.1 Add final UI polish


    - Smooth transitions and animations
    - Loading states if needed
    - Improve visual feedback on interactions
    - Test on multiple devices and browsers
    - _Requirements: 5.4_

  - [x] 6.2 Optimize for production


    - Run Vite build to create optimized bundle
    - Verify bundle size is < 50KB
    - Test production build locally
    - Ensure all functionality works in production mode
    - _Requirements: All_

  - [x] 6.3 Set up deployment


    - Configure deployment to GitHub Pages, Netlify, or Vercel
    - Add deployment scripts to package.json
    - Test deployed version
    - Verify responsive design on real devices
    - _Requirements: All_

  - [x] 6.4 Create README documentation


    - Document project purpose and features
    - Add setup and development instructions
    - Include testing instructions
    - Add deployment information
    - Include screenshots
    - _Requirements: All_

- [x] 7. Final Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.
