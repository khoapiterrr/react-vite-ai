import { describe, it, expect } from "vitest";
import { makeid, removeVietnameseTones } from "../stringUtils";

describe("stringUtils", () => {
  describe("makeid", () => {
    it("should generate a string of specified length", () => {
      const length = 10;
      const result = makeid(length);
      expect(result.length).toBe(length);
    });

    it("should only contain alphanumeric characters", () => {
      const result = makeid(20);
      expect(result).toMatch(/^[a-z0-9]+$/);
    });

    it("should generate different IDs on each call", () => {
      const id1 = makeid(10);
      const id2 = makeid(10);
      expect(id1).not.toBe(id2);
    });
  });

  describe("removeVietnameseTones", () => {
    it("should remove all Vietnamese tones", () => {
      const input = "Xin chào thế giới";
      const expected = "Xin chao the gioi";
      expect(removeVietnameseTones(input)).toBe(expected);
    });

    it("should handle Đ/đ characters", () => {
      const input = "Đây là một ví dụ";
      const expected = "Day la mot vi du";
      expect(removeVietnameseTones(input)).toBe(expected);
    });

    it("should handle mixed case", () => {
      const input = "Xin Chào Thế Giới";
      const expected = "Xin Chao The Gioi";
      expect(removeVietnameseTones(input)).toBe(expected);
    });

    it("should handle empty string", () => {
      expect(removeVietnameseTones("")).toBe("");
    });

    it("should handle string without tones", () => {
      const input = "Hello World";
      expect(removeVietnameseTones(input)).toBe(input);
    });
  });
});
