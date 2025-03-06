import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  formatDate,
  isToday,
  isPast,
  isFuture,
  addDays,
  getDaysDifference,
  getStartOfDay,
  getEndOfDay,
  isDateInRange,
  getRelativeTime,
} from "../dateTime";

describe("dateTime", () => {
  describe("formatDate", () => {
    it("should format date with default format", () => {
      const date = new Date("2024-03-15T10:30:00");
      expect(formatDate(date)).toBe("2024-03-15");
    });

    it("should format date with custom format", () => {
      const date = new Date("2024-03-15T10:30:00");
      expect(formatDate(date, "dd/MM/yyyy HH:mm")).toBe("15/03/2024 10:30");
    });

    it("should handle string date input", () => {
      expect(formatDate("2024-03-15")).toBe("2024-03-15");
    });
  });

  describe("isToday", () => {
    it("should return true for today", () => {
      expect(isToday(new Date())).toBe(true);
    });

    it("should return false for other dates", () => {
      expect(isToday("2024-03-14")).toBe(false);
      expect(isToday("2024-03-16")).toBe(false);
    });
  });

  describe("isPast", () => {
    it("should return true for past dates", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isPast(yesterday)).toBe(true);
    });

    it("should return false for future dates", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isPast(tomorrow)).toBe(false);
    });
  });

  describe("isFuture", () => {
    it("should return true for future dates", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isFuture(tomorrow)).toBe(true);
    });

    it("should return false for past dates", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isFuture(yesterday)).toBe(false);
    });
  });

  describe("addDays", () => {
    it("should add days to date", () => {
      const date = new Date("2024-03-15");
      const result = addDays(date, 2);
      expect(formatDate(result)).toBe("2024-03-17");
    });

    it("should handle negative days", () => {
      const date = new Date("2024-03-15");
      const result = addDays(date, -1);
      expect(formatDate(result)).toBe("2024-03-14");
    });
  });

  describe("getDaysDifference", () => {
    it("should calculate days difference", () => {
      expect(getDaysDifference("2024-03-15", "2024-03-17")).toBe(2);
      expect(getDaysDifference("2024-03-17", "2024-03-15")).toBe(2);
    });
  });

  describe("getStartOfDay", () => {
    it("should set time to start of day", () => {
      const date = new Date("2024-03-15T10:30:00");
      const result = getStartOfDay(date);
      expect(formatDate(result, "yyyy-MM-dd HH:mm:ss")).toBe(
        "2024-03-15 00:00:00",
      );
    });
  });

  describe("getEndOfDay", () => {
    it("should set time to end of day", () => {
      const date = new Date("2024-03-15T10:30:00");
      const result = getEndOfDay(date);
      expect(formatDate(result, "yyyy-MM-dd HH:mm:ss")).toBe(
        "2024-03-15 23:59:59",
      );
    });
  });

  describe("isDateInRange", () => {
    it("should check if date is within range", () => {
      expect(isDateInRange("2024-03-15", "2024-03-14", "2024-03-16")).toBe(
        true,
      );
      expect(isDateInRange("2024-03-13", "2024-03-14", "2024-03-16")).toBe(
        false,
      );
      expect(isDateInRange("2024-03-17", "2024-03-14", "2024-03-16")).toBe(
        false,
      );
    });
  });

  describe("getRelativeTime", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return relative time for recent times", () => {
      const date = new Date();
      expect(getRelativeTime(date)).toBe("less than a minute ago");
    });

    it("should return minutes ago", () => {
      const date = new Date();
      vi.advanceTimersByTime(30 * 60 * 1000); // 30 minutes
      expect(getRelativeTime(date)).toBe("30 minutes ago");
    });

    it("should return hours ago", () => {
      const date = new Date();
      vi.advanceTimersByTime(2 * 60 * 60 * 1000); // 2 hours
      expect(getRelativeTime(date)).toBe("about 2 hours ago");
    });

    it("should return days ago", () => {
      const date = new Date();
      vi.advanceTimersByTime(3 * 24 * 60 * 60 * 1000); // 3 days
      expect(getRelativeTime(date)).toBe("3 days ago");
    });
  });
});
