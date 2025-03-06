import {
  format,
  isToday as isTodayFns,
  isPast as isPastFns,
  isFuture as isFutureFns,
  addDays as addDaysFns,
  differenceInDays,
  startOfDay,
  endOfDay,
  isWithinInterval,
  formatDistanceToNow,
} from "date-fns";

/**
 * Format a date to a string with the specified format
 * @param date - Date to format
 * @param formatStr - Format string (e.g., 'yyyy-MM-dd')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  formatStr: string = "yyyy-MM-dd",
): string {
  return format(new Date(date), formatStr);
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns boolean indicating if the date is today
 */
export function isToday(date: Date | string): boolean {
  return isTodayFns(new Date(date));
}

/**
 * Check if a date is in the past
 * @param date - Date to check
 * @returns boolean indicating if the date is in the past
 */
export function isPast(date: Date | string): boolean {
  return isPastFns(new Date(date));
}

/**
 * Check if a date is in the future
 * @param date - Date to check
 * @returns boolean indicating if the date is in the future
 */
export function isFuture(date: Date | string): boolean {
  return isFutureFns(new Date(date));
}

/**
 * Add days to a date
 * @param date - Date to add days to
 * @param days - Number of days to add
 * @returns New date with days added
 */
export function addDays(date: Date | string, days: number): Date {
  return addDaysFns(new Date(date), days);
}

/**
 * Get the difference between two dates in days
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of days between the dates
 */
export function getDaysDifference(
  date1: Date | string,
  date2: Date | string,
): number {
  return Math.abs(differenceInDays(new Date(date1), new Date(date2)));
}

/**
 * Get the start of the day (00:00:00)
 * @param date - Date to get start of day for
 * @returns Date set to start of day
 */
export function getStartOfDay(date: Date | string): Date {
  return startOfDay(new Date(date));
}

/**
 * Get the end of the day (23:59:59)
 * @param date - Date to get end of day for
 * @returns Date set to end of day
 */
export function getEndOfDay(date: Date | string): Date {
  return endOfDay(new Date(date));
}

/**
 * Check if a date is within a date range
 * @param date - Date to check
 * @param startDate - Start of range
 * @param endDate - End of range
 * @returns boolean indicating if date is within range
 */
export function isDateInRange(
  date: Date | string,
  startDate: Date | string,
  endDate: Date | string,
): boolean {
  return isWithinInterval(new Date(date), {
    start: new Date(startDate),
    end: new Date(endDate),
  });
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param date - Date to get relative time for
 * @returns Relative time string
 */
export function getRelativeTime(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
