# Futurise Solutions - Dark Theme to Light Theme Migration

# IMPORTANT:

Before making any changes, first analyze the existing website and preserve its exact visual structure, interactions, animations, and user experience. Do not introduce any design improvements, layout adjustments, component replacements, or styling changes beyond the theme system.

## Project Overview

Convert the existing Futurise Solutions website from a Dark Theme to a Light Theme while preserving all existing functionality, UI structure, animations, responsiveness, and user experience.

**Website:** futurisesolutions.com

---

# Primary Objective

Create a complete Light Theme implementation while ensuring the website remains visually and functionally identical to the current version.

This is a **Theme Migration Project**, NOT a redesign project.

---

# Critical Requirements

## Do Not Change

The following elements must remain exactly as they are:

* Layout structure
* Section order
* Component hierarchy
* Navigation flow
* Typography
* Font family
* Font sizes
* Font weights
* Letter spacing
* Padding
* Margins
* Border radius
* Grid layouts
* Flex layouts
* Images
* Icons
* Illustrations
* Forms
* Buttons
* Cards
* Responsiveness
* Mobile experience
* SEO implementation
* Routing
* Backend integrations
* API calls
* Business logic

---

# Animation Preservation

All existing animations must remain untouched.

Preserve:

* Framer Motion animations
* AOS animations
* Scroll animations
* Hover animations
* Button interactions
* Card interactions
* Loading animations
* Entrance animations
* Exit animations
* Transform effects
* Keyframes
* Duration values
* Delay values
* Easing values
* Trigger conditions

### Important

Only colors should change.

No animation behavior should be modified.

---

# Theme System Implementation

Implement a scalable theme architecture.

## Required Themes

### Light Theme

(New default visual design)

### Dark Theme

(Current existing design)

---

# Theme Toggle

Add a theme toggle switch inside the Navbar.

Requirements:

* Easy to access
* Desktop compatible
* Mobile compatible
* Smooth transition between themes

---

# Theme Persistence

Store selected theme in Local Storage.

Requirements:

* User preference must persist after page refresh.
* User preference must persist after browser restart.
* No flash of incorrect theme on page load.
* Load preferred theme immediately.

---

# System Theme Detection

If no saved preference exists:

1. Detect system preference.
2. Apply preferred theme automatically.

Use:

prefers-color-scheme

---

# Light Theme Conversion Rules

Convert all dark theme colors into a professional modern light theme.

Apply changes to:

* Page backgrounds
* Section backgrounds
* Cards
* Inputs
* Forms
* Modals
* Navigation
* Footer
* Buttons
* Borders
* Shadows
* Hover states

Requirements:

* High readability
* Excellent contrast
* Accessibility friendly
* Professional SaaS/Agency appearance
* Consistent visual hierarchy

---

# Design Token Architecture

Create centralized theme variables.

Example structure:

## Colors

* Primary
* Secondary
* Accent
* Background
* Surface
* Card
* Border
* Text Primary
* Text Secondary
* Success
* Warning
* Error

## Shadows

* Small
* Medium
* Large

## Effects

* Glassmorphism variables
* Overlay variables

---

# Refactoring Requirements

Wherever possible:

* Replace hardcoded colors.
* Move colors into theme variables.
* Create reusable design tokens.
* Ensure future color palette changes are easy.

---

# Accessibility Requirements

Ensure:

* WCAG-friendly contrast ratios
* Readable text on all backgrounds
* Accessible button states
* Accessible form fields

---

# Quality Assurance Checklist

Verify:

* No layout shifts
* No animation regressions
* No responsiveness issues
* No broken components
* No visual glitches
* No performance degradation
* No SEO impact
* No functionality changes

---

# Deliverables

Provide:

## 1. Theme System

Complete implementation of Light and Dark themes.

## 2. Navbar Toggle

Working theme switcher.

## 3. Design Tokens

Centralized color architecture.

## 4. Migration Summary

List of all files modified.

## 5. Verification Report

Confirm:

* Layout unchanged
* Animations unchanged
* Functionality unchanged
* Responsiveness unchanged
* SEO unchanged

---

# Future Color Palette Support

The theme architecture should be designed so that a future Light Theme color palette can be applied by simply updating centralized theme variables without requiring component-level modifications.

---

# Final Instruction

Treat this project as a professional production-grade theme migration.

The final result should look and behave exactly like the current website with all UI, UX, interactions, animations, responsiveness, and functionality preserved.

The only difference should be the color system and the addition of a Navbar Theme Toggle.

# COLOR PALETTE
Use the attached color palette as the source of truth for the Light Theme. Do not create your own color palette.

# Code Cleanup

While implementing the theme migration, perform a safe code cleanup:

* Remove unused files that are not referenced anywhere in the project.
* Remove dead code, unused imports, unused variables, and commented-out code where safe.
* Remove duplicate styles, duplicate components, and duplicate utility functions if they are not being used.
* Consolidate repeated color values into the new theme system.
* Do not remove or modify any code that affects functionality, SEO, routing, animations, integrations, or business logic.
* Do not delete any file unless you have verified it is completely unused.
* Do not delete any file unless you have verified it is completely unused.

Provide a summary of all cleanup changes made.


