# Code Review - GrowthExperts

**Date:** 2026-02-02
**Last Updated:** 2026-02-02 (data-astro-rerun refactor)
**Reviewer:** Claude (Astro/Frontend Code Reviewer)

**Files Reviewed:**
- `src/components/ui/PortfolioLightbox.astro`
- `src/pages/contact.astro` **(Updated - View Transitions fix)**
- `src/styles/global.css` **(Updated - text-highlight fix)**
- `src/components/sections/PortfolioMarquee.astro` **(Updated - mobile touch fix)**

---

## Summary

Overall, both files demonstrate solid Astro patterns with good accessibility foundations. The latest update to `contact.astro` correctly addresses View Transitions issues by using the recommended `astro:page-load` event pattern. However, there are still some performance concerns with large inline scripts and potential security considerations with innerHTML usage.

---

## Latest Changes Review (2026-02-02)

### contact.astro - View Transitions Fix

**Change:** Fixed service selector not working on mobile initial load with View Transitions

#### What Changed
| Line(s) | Change |
|---------|--------|
| 383-560 | Script wrapped in IIFE for proper scope management |
| 559 | Replaced multiple event listeners with single `astro:page-load` |
| 394-395 | Simplified initialization guard (form-level only) |
| - | Removed `DOMContentLoaded` and immediate fallback |
| - | Removed `_initialized` flags on individual elements |

#### Review: APPROVED

The changes correctly follow Astro View Transitions best practices:

1. **Single Event Listener** (line 559): Using only `astro:page-load` is correct per Astro docs - this event fires on both initial page load AND view transitions.

2. **IIFE Wrapper** (lines 383-560): Proper scope isolation prevents variable leakage across navigations.

3. **Simplified Guards**: Removing per-element `_initialized` flags is correct - View Transitions swap DOM elements, making these flags unreliable. The form-level guard (line 394-395) is sufficient.

4. **Removed Race Conditions**: Eliminating `DOMContentLoaded` and immediate fallbacks prevents double-initialization issues.

#### Remaining Concerns (Low Priority)
- XSS pattern with `innerHTML` still exists (lines 497-507, 535-546) - safe with current static strings
- Missing `autocomplete` attributes on form inputs
- Large inline script (~180 lines) - acceptable for View Transitions compatibility

---

### global.css - Text Highlight Fix

**Change:** Fixed `.text-highlight` class causing text cutoff on narrow viewports

#### Problem
On narrow viewports (320px), text with highlight effects was getting cut off. For example, "Real Business Growth" became "Real Business G" on mobile.

**Root Cause:** `whitespace-nowrap` on `.text-highlight` class prevented text wrapping, and combined with `overflow-hidden` on hero sections, this caused text clipping.

#### What Changed
| Line(s) | Change |
|---------|--------|
| 254 | Changed from `inline-block whitespace-nowrap` to `inline` |

#### Review: APPROVED

This is a CSS-only styling fix that correctly addresses a mobile responsiveness bug:

1. **`inline-block` → `inline`** (line 254): Allows the highlight pseudo-element to flow naturally with text instead of treating it as a block. This is more appropriate for marker-style highlights that span partial lines.

2. **Removed `whitespace-nowrap`**: Previously prevented text from wrapping, which caused text clipping when combined with container overflow constraints. Removing it allows natural line breaks.

**Impact:** The text highlight effect will now wrap correctly at line breaks instead of forcing content onto a single line. This fixes the mobile cutoff issue while preserving the visual highlight effect.

**No concerns** - This is a correct fix for the mobile responsiveness issue.

---

### PortfolioLightbox.astro - Event Delegation Refactor

**Change:** Refactored card click handling to use event delegation for better mobile reliability

#### What Changed
| Line(s) | Change |
|---------|--------|
| 236 | Added `cardClickHandler` variable for cleanup tracking |
| 244-249 | Added cleanup for card click handler during View Transitions |
| 256-259 | Added `resetLightboxInit()` function for DOM swap handling |
| 264-266 | Added `getCards()` helper for fresh DOM queries |
| 288-291 | `updateContent()` now queries cards fresh |
| 413-419 | `prev()` and `next()` now query cards fresh |
| 421-452 | Replaced per-card click handlers with event delegation |

#### Review: APPROVED

This is a well-structured refactor that addresses mobile reliability issues:

1. **Event Delegation** (lines 421-452): Using document-level event delegation for card clicks is more reliable than attaching handlers to individual cards. This is especially beneficial when:
   - Cards have CSS animations/transitions
   - DOM elements are replaced during View Transitions
   - Cards are dynamically added/removed

2. **Fresh DOM Queries** (line 264-266): The `getCards()` helper ensures we always work with the current DOM state, preventing stale reference issues after View Transitions.

3. **Proper Cleanup** (lines 244-249): The card click handler is now properly tracked and removed during View Transitions cleanup, preventing memory leaks and duplicate handlers.

4. **Reset Function** (lines 256-259): `resetLightboxInit()` correctly resets the initialization flag after DOM swap but before page-load, ensuring proper re-initialization.

#### Technical Notes
- Event delegation pattern: `document.addEventListener('click', handler)` with `e.target.closest('[data-portfolio-card]')` is the recommended approach for dynamic content
- The `stopPropagation()` on enlarge button prevents double-firing
- Keyboard handlers remain on individual cards (correct - keyboard events don't bubble the same way)

**No concerns** - This is a correct and well-implemented fix.

---

### contact.astro - View Transitions Enhancement

**Change:** Added proper initialization reset and form state restoration for View Transitions

#### What Changed
| Line(s) | Change |
|---------|--------|
| 384-388 | Added `resetFormInit()` function to reset initialization flag |
| 453-457 | Added check for pre-checked radios on reinitialization |
| 571-573 | Added `astro:after-swap` event listener to call `resetFormInit()` |

#### Review: APPROVED

This is a correct enhancement for View Transitions:

1. **Reset Before Page-Load** (lines 384-388, 571-573): Using `astro:after-swap` to reset the initialization flag is correct. This event fires after the DOM is swapped but before `astro:page-load`, ensuring the form can be properly reinitialized on the new DOM.

2. **Form State Restoration** (lines 453-457): Checking for already-checked radios handles two scenarios:
   - **Browser History**: Back/forward navigation may restore form values
   - **View Transitions**: State might persist in certain edge cases
   This ensures conditional fields are correctly shown based on the current form state.

#### Event Sequence
```
View Transition → astro:after-swap (reset flag) → astro:page-load (reinit)
```

**No concerns** - This completes the View Transitions pattern correctly.

---

### PortfolioMarquee.astro - Mobile Touch Fix

**Change:** Added CSS properties to improve mobile touch handling within CSS animations

#### What Changed
| Line(s) | Change |
|---------|--------|
| 273-275 | Added `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` |

#### Review: APPROVED

This is a CSS-only fix for mobile touch reliability:

1. **`touch-action: manipulation`** (line 273): Enables panning and zooming but disables double-tap-to-zoom. This is critical for reliable tap/click handling within CSS animations where the browser might otherwise delay touch events waiting for potential double-taps.

2. **`-webkit-tap-highlight-color: transparent`** (line 274): Removes the default blue/grey tap highlight on iOS Safari, providing cleaner visual feedback when tapping cards.

**Impact:** Fixes mobile touch/click issues on marquee cards where CSS animations can interfere with touch event detection.

**No concerns** - This is a correct fix for mobile touch handling.

---

### PortfolioLightbox.astro & contact.astro - data-astro-rerun Refactor

**Change:** Switched from `astro:page-load` event pattern to `data-astro-rerun` attribute

#### What Changed (Both Files)
| Change | Description |
|--------|-------------|
| Added `data-astro-rerun` | Script tag now uses `<script is:inline data-astro-rerun>` |
| Removed event listeners | Removed `astro:page-load`, `astro:after-swap`, `astro:before-swap` listeners |
| Handler storage | Handlers now stored on `window` object for cleanup across re-runs |
| Direct initialization | Init functions called directly instead of via event |

#### Review: APPROVED

This is a cleaner pattern for View Transitions:

1. **`data-astro-rerun`**: This Astro attribute forces the script to re-execute after every View Transition, eliminating the need for manual event listener management. This is the recommended approach for inline scripts that need to run after navigation.

2. **Window-scoped handler storage**: By storing handlers on `window._lightboxHandlers` and `window._contactFormHandlers`, the code can properly clean up previous handlers before reinitializing, preventing duplicate event listeners.

3. **Simplified flow**: Instead of:
   ```
   astro:before-swap → cleanup
   astro:after-swap → reset flag
   astro:page-load → init
   ```
   Now just:
   ```
   data-astro-rerun → cleanup + init
   ```

4. **Removed `_initialized` flags**: No longer needed since the script re-runs completely and handles cleanup internally.

**Benefits:**
- Simpler, more maintainable code
- Guaranteed script execution after View Transitions
- Proper handler cleanup prevents memory leaks
- Follows Astro best practices for View Transitions

**No concerns** - This is a correct and improved pattern for View Transitions.

---

## PortfolioLightbox.astro

### Positives

- **Accessibility (A11y):** Excellent use of `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby` (lines 13-16)
- **Focus Management:** Properly saves and restores focus on open/close (lines 240, 353-354, 366)
- **Keyboard Navigation:** Full support for Escape, ArrowLeft, ArrowRight (lines 422-436)
- **Touch Support:** Swipe gestures for mobile navigation (lines 438-457)
- **Motion Preferences:** Respects `prefers-reduced-motion` (lines 204-208)
- **View Transitions:** Properly handles `astro:page-load` event with initialization guards

### Issues

#### 1. **Potential XSS Vulnerability** (High Priority)
**File:** `PortfolioLightbox.astro:318-322`
```javascript
techStackEl.innerHTML = techStack
  .split(',')
  .filter(Boolean)
  .map(function(tech) { return '<span class="...">' + tech.trim() + '</span>'; })
  .join('');
```
**Issue:** Using `.innerHTML` with data from DOM data attributes. If data attributes are manipulated (e.g., via browser devtools or XSS), this could execute malicious code.

**Recommendation:** Use DOM element creation instead:
```javascript
techStackEl.innerHTML = '';
techStack.split(',').filter(Boolean).forEach(function(tech) {
  var span = document.createElement('span');
  span.className = 'px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full';
  span.textContent = tech.trim();
  techStackEl.appendChild(span);
});
```

#### 2. **Large Inline Script** (Medium Priority)
**File:** `PortfolioLightbox.astro:231-471`

**Issue:** ~240 lines of inline JavaScript using `is:inline`. This script:
- Cannot be code-split or lazy-loaded
- Is not minified by Astro's build process
- Adds to initial HTML payload

**Recommendation:** Consider extracting to a separate `.ts` file and using Astro's standard script handling if View Transitions compatibility allows.

#### 3. **Missing Image Loading State** (Low Priority)
**File:** `PortfolioLightbox.astro:39-44`

**Issue:** When navigating between portfolio items, there's no loading indicator while the new image loads. Users on slower connections may see a blank or stale image.

**Recommendation:** Add a loading spinner overlay or skeleton placeholder during image transitions.

#### 4. **Empty Initial Alt Text** (Low Priority)
**File:** `PortfolioLightbox.astro:43`
```html
<img id="lightbox-image" src="" alt="" ... />
```
**Issue:** While dynamically set, the empty alt could be announced briefly by screen readers.

**Recommendation:** Set a default alt like `alt="Loading portfolio image..."` or hide with `aria-hidden` until content is ready.

---

## contact.astro

### Positives

- **Schema.org Markup:** Proper LocalBusiness schema with full address (lines 16-36)
- **Form Accessibility:** Proper labels, required indicators, `role="radiogroup"` (line 77)
- **Error Handling:** Graceful fallback with phone number on error (line 563)
- **Live Regions:** Uses `aria-live="polite"` for form feedback (line 194)
- **View Transitions:** Initialization guards prevent double-binding

### Issues

#### 1. **Potential XSS in Feedback Messages** (Medium Priority)
**File:** `contact.astro:513-523, 556-566`
```javascript
feedbackDiv.innerHTML = `...${successMessage}...`;
```
**Issue:** While currently safe (static strings), this pattern is risky. If `successMessage` ever includes user input, it becomes an XSS vector.

**Recommendation:** Use DOM methods or ensure proper escaping.

#### 2. **Missing Autocomplete Attributes** (Medium Priority)
**File:** `contact.astro:147-169`

**Issue:** Form inputs lack `autocomplete` attributes, reducing UX for returning users.

**Recommendation:** Add these attributes:
```html
<!-- Line 152 -->
<input type="text" id="name" name="name" autocomplete="name" ... />

<!-- Line 167 -->
<input type="tel" id="phone" name="phone" autocomplete="tel" ... />

<!-- Line 121 -->
<input type="text" id="website" name="website" autocomplete="url" ... />
```

#### 3. **Large Inline Script** (Medium Priority)
**File:** `contact.astro:380-591`

**Issue:** ~210 lines of inline JavaScript. Same concerns as PortfolioLightbox regarding bundling and minification.

**Recommendation:** Consider extracting form logic to a reusable module.

#### 4. **Form Validation Conflict** (Low Priority)
**File:** `contact.astro:71`

**Issue:** Form lacks `novalidate` attribute but has custom JavaScript validation. This can cause:
- Double error messages (browser + custom)
- Inconsistent UX across browsers

**Recommendation:** Either:
- Add `novalidate` and rely solely on JS validation, OR
- Remove custom validation and let browser handle it

#### 5. **Missing Visual Loading Indicator** (Low Priority)
**File:** `contact.astro:476-477`

**Issue:** Button text changes to "Sending..." but no visual spinner. Users may not notice the text change.

**Recommendation:** Add a spinner SVG or animation alongside the text.

#### 6. **Conditional Required Fields Race Condition** (Low Priority)
**File:** `contact.astro:425-445`

**Issue:** The logic toggling `required` attributes on conditional fields could desync if rapid service switching occurs or if View Transitions interrupt the state.

**Recommendation:** Validate based on selected service at submit time rather than relying on `required` attribute state.

---

## Astro-Specific Recommendations

### Client Directives
Both files use `is:inline` scripts. Per Astro best practices:

| Current | Recommended |
|---------|-------------|
| `<script is:inline>` | Consider `<script>` (standard module) if View Transitions allow |

**Reason:** Standard scripts are:
- Bundled and minified
- Can be code-split
- Support TypeScript

### Component Reusability

The contact form logic could be extracted into a reusable component:
```
src/components/forms/ContactForm.astro
src/scripts/contactForm.ts
```

This would enable:
- Type safety with TypeScript
- Testing in isolation
- Reuse on other pages

---

## Performance Considerations

| Issue | Impact | Files |
|-------|--------|-------|
| Inline scripts not minified | Higher HTML payload | Both files |
| No image lazy loading in lightbox | Initial load delay | PortfolioLightbox |
| Multiple event listener registrations | Memory overhead on nav | Both files |

---

## Action Items

### High Priority
- [ ] Fix XSS vulnerability in PortfolioLightbox tech stack rendering (line 318-322)

### Medium Priority
- [ ] Add `autocomplete` attributes to contact form inputs
- [ ] Consider extracting inline scripts to modules
- [ ] Add loading states for images and form submission

### Low Priority
- [ ] Add `novalidate` or remove custom validation
- [ ] Add loading spinner to submit button
- [ ] Set default alt text on lightbox image

---

*This review follows the project's CLAUDE.md guidelines and Astro best practices.*
