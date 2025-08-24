/**
 * Design System Tokens
 * Centralized design tokens for consistent styling across the application
 */

export const BORDER_RADIUS = {
  xs: 8,      // Small elements like toast notifications, cards
  sm: 10,     // Small components 
  md: 12,     // Modal backdrops, medium components
  lg: 16,     // Modal containers, inputs, larger components
  xl: 30,     // Rounded buttons
  xxl: 32,    // Tab items, large rounded elements
  full: 50,   // Fully rounded elements like circular buttons
} as const;

export const Z_INDEX = {
  base: 1,        // Base level elements
  low: 2,         // Slightly elevated elements (selected tabs)
  medium: 3,      // Medium elevation (buttons)
  high: 5,        // High elevation (modals)
  overlay: 10,    // Overlay elements (blur views, dropdowns)
  modal: 15,      // Modal overlays
  tooltip: 20,    // Tooltips and popovers
  notification: 25, // Toast notifications
  maximum: 30,    // Maximum z-index for critical elements
} as const;

// Type for border radius values
export type BorderRadiusSize = keyof typeof BORDER_RADIUS;

// Type for z-index values
export type ZIndexLevel = keyof typeof Z_INDEX;

/**
 * Helper function to get border radius value
 * @param size - The border radius size key
 * @returns The border radius value in pixels
 */
export const getBorderRadius = (size: BorderRadiusSize): number => {
  return BORDER_RADIUS[size];
};

/**
 * Helper function to get z-index value
 * @param level - The z-index level key
 * @returns The z-index value
 */
export const getZIndex = (level: ZIndexLevel): number => {
  return Z_INDEX[level];
};
