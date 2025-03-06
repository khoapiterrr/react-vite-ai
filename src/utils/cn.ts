import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind classes
 * @param inputs - Class names to combine
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a variant function for component styling
 * @param base - Base classes
 * @param variants - Variant classes
 * @returns Function to generate class names based on variants
 */
export function createVariant<T extends Record<string, string>>(
  base: string,
  variants: T
) {
  return (variant: keyof T, additionalClasses?: string) => {
    return cn(base, variants[variant], additionalClasses);
  };
}

/**
 * Creates a responsive variant function
 * @param base - Base classes
 * @param variants - Variant classes
 * @returns Function to generate responsive class names
 */
export function createResponsiveVariant<T extends Record<string, string>>(
  base: string,
  variants: T
) {
  return (
    variant: keyof T,
    responsiveClasses?: Record<string, string>,
    additionalClasses?: string
  ) => {
    return cn(
      base,
      variants[variant],
      responsiveClasses && Object.entries(responsiveClasses).map(([breakpoint, classes]) => 
        `${breakpoint}:${classes}`
      ),
      additionalClasses
    );
  };
}

/**
 * Creates a conditional variant function
 * @param base - Base classes
 * @param variants - Variant classes
 * @returns Function to generate conditional class names
 */
export function createConditionalVariant<T extends Record<string, string>>(
  base: string,
  variants: T
) {
  return (
    variant: keyof T,
    condition: boolean,
    additionalClasses?: string
  ) => {
    return cn(
      base,
      condition && variants[variant],
      additionalClasses
    );
  };
}

/**
 * Creates a size variant function
 * @param base - Base classes
 * @param sizes - Size classes
 * @returns Function to generate size-based class names
 */
export function createSizeVariant<T extends Record<string, string>>(
  base: string,
  sizes: T
) {
  return (size: keyof T, additionalClasses?: string) => {
    return cn(base, sizes[size], additionalClasses);
  };
}

/**
 * Creates a state variant function (hover, focus, active, etc.)
 * @param base - Base classes
 * @param states - State classes
 * @returns Function to generate state-based class names
 */
export function createStateVariant<T extends Record<string, string>>(
  base: string,
  states: T
) {
  return (state: keyof T, additionalClasses?: string) => {
    return cn(base, states[state], additionalClasses);
  };
} 