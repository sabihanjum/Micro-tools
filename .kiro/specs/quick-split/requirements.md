# Requirements Document

## Introduction

Quick Split is a single-purpose web application that solves the common problem of splitting bills among friends at restaurants or group outings. The tool allows users to quickly calculate how much each person owes, including tip calculations and support for unequal splits when some people ordered more expensive items.

## Glossary

- **Bill Splitter**: The web application system that calculates bill divisions
- **Total Amount**: The base bill amount before tip
- **Tip Percentage**: The percentage of the total amount to add as gratuity
- **Split Type**: The method of division (equal or custom)
- **Participant**: A person who is part of the bill split
- **Share**: The portion of the bill assigned to a specific participant

## Requirements

### Requirement 1

**User Story:** As a user, I want to enter the total bill amount and number of people, so that I can quickly see how much each person owes for an equal split.

#### Acceptance Criteria

1. WHEN a user enters a valid positive number as the total amount, THE Bill Splitter SHALL accept and store the value
2. WHEN a user enters a valid number of participants (minimum 2), THE Bill Splitter SHALL accept and store the value
3. WHEN both total amount and number of participants are provided, THE Bill Splitter SHALL calculate the amount per person by dividing the total by the number of participants
4. WHEN the calculation is complete, THE Bill Splitter SHALL display the result rounded to two decimal places
5. WHEN a user enters invalid input (negative numbers, zero, or non-numeric values), THE Bill Splitter SHALL prevent the calculation and display an error message

### Requirement 2

**User Story:** As a user, I want to add a tip percentage to the bill, so that I can include gratuity in the split calculation.

#### Acceptance Criteria

1. WHEN a user selects or enters a tip percentage, THE Bill Splitter SHALL validate it is between 0 and 100
2. WHEN a valid tip percentage is provided, THE Bill Splitter SHALL calculate the tip amount by multiplying the total amount by the tip percentage
3. WHEN the tip is calculated, THE Bill Splitter SHALL add the tip amount to the total amount before splitting
4. WHEN displaying results, THE Bill Splitter SHALL show both the tip amount and the final total including tip
5. WHERE a tip percentage is not provided, THE Bill Splitter SHALL default to zero tip

### Requirement 3

**User Story:** As a user, I want to see a clear breakdown of the calculation, so that I can verify the amounts are correct.

#### Acceptance Criteria

1. WHEN a calculation is performed, THE Bill Splitter SHALL display the original bill amount
2. WHEN a tip is included, THE Bill Splitter SHALL display the tip percentage and tip amount separately
3. WHEN showing the final result, THE Bill Splitter SHALL display the total amount including tip
4. WHEN showing per-person amounts, THE Bill Splitter SHALL display the amount each person owes
5. WHEN displaying monetary values, THE Bill Splitter SHALL format all amounts with currency symbols and two decimal places

### Requirement 4

**User Story:** As a user, I want to quickly reset the calculator, so that I can start a new calculation without manually clearing each field.

#### Acceptance Criteria

1. WHEN a user clicks the reset button, THE Bill Splitter SHALL clear all input fields
2. WHEN reset is triggered, THE Bill Splitter SHALL clear all calculated results
3. WHEN reset is complete, THE Bill Splitter SHALL return to the initial empty state
4. WHEN reset occurs, THE Bill Splitter SHALL maintain focus on the first input field for quick data entry

### Requirement 5

**User Story:** As a user, I want the interface to be simple and mobile-friendly, so that I can use it easily at a restaurant on my phone.

#### Acceptance Criteria

1. WHEN the application loads on any device, THE Bill Splitter SHALL display a responsive layout that adapts to screen size
2. WHEN viewed on mobile devices, THE Bill Splitter SHALL ensure all buttons and input fields are easily tappable (minimum 44x44 pixels)
3. WHEN displaying results, THE Bill Splitter SHALL use clear, readable typography with sufficient contrast
4. WHEN the user interacts with the interface, THE Bill Splitter SHALL provide immediate visual feedback
5. WHEN the application is used, THE Bill Splitter SHALL require no scrolling on standard mobile screens for basic functionality

### Requirement 6

**User Story:** As a user, I want preset tip percentage buttons, so that I can quickly select common tip amounts without typing.

#### Acceptance Criteria

1. WHEN the tip section is displayed, THE Bill Splitter SHALL show preset buttons for common tip percentages (10%, 15%, 18%, 20%)
2. WHEN a user clicks a preset tip button, THE Bill Splitter SHALL apply that percentage to the calculation
3. WHEN a preset button is selected, THE Bill Splitter SHALL provide visual feedback showing which option is active
4. WHEN a user enters a custom tip percentage, THE Bill Splitter SHALL deselect any active preset button
5. WHERE a preset button is clicked, THE Bill Splitter SHALL immediately recalculate the split amounts
