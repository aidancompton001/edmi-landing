// EDMI Design Tokens
// Source: docs/specs/DESIGN_SYSTEM.md (verified from edmi.com.ua)

export const colors = {
  // Brand
  primary: '#b8309e',
  accent: '#0057b8',
  gradientStart: '#8b3dc5',
  gradientEnd: '#0057b8',

  // Background
  bgDark: '#171717',
  bgLight: '#ffffff',
  bgLightAlt: '#f2f1ef',
  surfaceDark: 'rgba(255,255,255,0.03)',
  surfaceLight: 'rgba(0,0,0,0.02)',

  // Border
  borderDark: 'rgba(255,255,255,0.06)',
  borderLight: 'rgba(0,0,0,0.08)',

  // Text
  textPrimaryDark: '#E2E8F0',
  textSecondaryDark: '#94A3B8',
  textPrimaryLight: '#1A202C',
  textSecondaryLight: '#64748B',

  // Semantic
  success: '#48BB78',
  warning: '#F59E0B',
  error: '#EF4444',

  // Utility
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const fonts = {
  heading: 'Unbounded',
  headingBold: 'Unbounded-Bold',
  headingSemiBold: 'Unbounded-SemiBold',
  body: 'Inter',
  bodyRegular: 'Inter-Regular',
  bodyMedium: 'Inter-Medium',
  bodySemiBold: 'Inter-SemiBold',
  bodyBold: 'Inter-Bold',
} as const;

export const fontSizes = {
  h1: 32,
  h2: 24,
  h3: 20,
  body: 16,
  bodySmall: 14,
  caption: 12,
  price: 24,
  priceSmall: 18,
} as const;

export const lineHeights = {
  h1: 40,
  h2: 32,
  h3: 28,
  body: 24,
  bodySmall: 20,
  caption: 16,
  price: 32,
  priceSmall: 24,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const radius = {
  sm: 8,
  md: 15,
  lg: 20,
  xl: 30,
  full: 9999,
} as const;

export const sizes = {
  tabBarHeight: 60,
  headerHeight: 56,
  fabSize: 56,
  fabBottomOffset: 80,
  inputHeight: 48,
  buttonSmallHeight: 36,
  buttonMediumHeight: 48,
  buttonLargeHeight: 56,
  iconSmall: 20,
  iconDefault: 24,
  iconLarge: 28,
  screenPaddingH: 16,
  screenPaddingV: 16,
} as const;

export const shadows = {
  light: {
    small: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowColor: '#000',
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowColor: '#000',
      elevation: 4,
    },
    large: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 24,
      shadowColor: '#000',
      elevation: 8,
    },
  },
  dark: {
    small: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowColor: '#000',
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      shadowColor: '#000',
      elevation: 4,
    },
    large: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 24,
      shadowColor: '#000',
      elevation: 8,
    },
  },
} as const;

export const gradient = {
  primary: {
    colors: [colors.gradientStart, colors.gradientEnd],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;

export const animation = {
  pressScale: 0.97,
  cardPressScale: 0.98,
  fabPressScale: 0.95,
  springConfig: { damping: 15, stiffness: 150 },
  fabSpringConfig: { damping: 12, stiffness: 200 },
  timingDuration: 100,
  modalDuration: 300,
  shimmerDuration: 1500,
} as const;
