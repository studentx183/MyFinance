/**
 * Color Design Tokens
 * Centralized color palette for consistent styling across the application
 * 
 * Related design tokens:
 * - Border radius tokens: see tokens.ts
 * - Z-index tokens: see tokens.ts
 */

// Light theme colors
export const LIGHT_COLORS = {
  // Primary & Brand
  primary: "#007AFF",
  primaryLight: "#9ecbff",
  
  // Surface colors
  background: "#f1f1f1",
  surface: "#ffffff",
  surfaceSecondary: "#f8f9fa",
  
  // Border colors
  border: "#dddddd",
  borderLight: "#e9ecef",
  
  // Text colors
  text: "#333333",
  textSecondary: "#666666",
  textTertiary: "#999999",
  textSelected: "#ffffff",
  textOnPrimary: "#ffffff",
  
  // Semantic colors
  danger: "#ff3b30",
  dangerLight: "#FEF3F2",
  dangerBorder: "#D92D20",
  success: "#28a745",
  successLight: "#ECFDF3",
  successBorder: "#ABEFC6",
  successText: "#067647",
  warning: "#ffcc00",
  
  // Neutral colors
  black: "#000000",
  white: "#ffffff",
  overlay: "rgba(0, 0, 0, 0.5)",
  shadow: "#000000",
  textShadow: "rgba(0, 0, 0, 0.25)",
} as const;

// Dark theme colors
export const DARK_COLORS = {
  // Primary & Brand (keep brand colors consistent)
  primary: "#007AFF",
  primaryLight: "#5d9cec",
  
  // Surface colors
  background: "#121212",
  surface: "#1e1e1e",
  surfaceSecondary: "#2a2a2a",
  
  // Border colors
  border: "#404040",
  borderLight: "#333333",
  
  // Text colors
  text: "#ffffff",
  textSecondary: "#e0e0e0",
  textTertiary: "#a0a0a0",
  textSelected: "#ffffff",
  textOnPrimary: "#ffffff",
  
  // Semantic colors
  danger: "#ff6b6b",
  dangerLight: "#2a1a1a",
  dangerBorder: "#ff4444",
  success: "#51cf66",
  successLight: "#1a2a1a",
  successBorder: "#40c057",
  successText: "#51cf66",
  warning: "#ffd43b",
  
  // Neutral colors
  black: "#000000",
  white: "#ffffff",
  overlay: "rgba(0, 0, 0, 0.7)",
  shadow: "#000000",
  textShadow: "rgba(0, 0, 0, 0.5)",
} as const;

// Export current theme colors (defaulting to light theme)
// TODO: Implement theme switching logic
export const COLORS = LIGHT_COLORS;

// Types
export type ColorTheme = typeof LIGHT_COLORS;
export type ColorKey = keyof ColorTheme;
