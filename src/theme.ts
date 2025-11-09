
export const colors = {
  green: '#3FAE49',
  orange: '#F47C20',
  gray: '#F4F4F4',
  text: '#1A1A1A',
  white: '#FFFFFF',
  error: '#e53935',
  success: '#2e7d32',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '800' as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  small: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
} as const;
