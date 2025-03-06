import { describe, it, expect } from "vitest";
import { cleanDeepObject } from "../cleanDeepObject";

describe("cleanDeepObject", () => {
  it("should remove empty strings", () => {
    const input = {
      name: "John",
      email: "",
      age: 30,
    };

    const result = cleanDeepObject(input);
    expect(result).toEqual({
      name: "John",
      age: 30,
    });
  });

  it("should remove null values", () => {
    const input = {
      name: "John",
      email: null,
      age: 30,
    };

    const result = cleanDeepObject(input);
    expect(result).toEqual({
      name: "John",
      age: 30,
    });
  });

  it("should remove undefined values", () => {
    const input = {
      name: "John",
      email: undefined,
      age: 30,
    };

    const result = cleanDeepObject(input);
    expect(result).toEqual({
      name: "John",
      age: 30,
    });
  });

  it("should remove empty arrays", () => {
    const input = {
      name: "John",
      hobbies: [],
      age: 30,
    };

    const result = cleanDeepObject(input);
    expect(result).toEqual({
      name: "John",
      age: 30,
    });
  });

  it("should remove empty objects", () => {
    const input = {
      name: "John",
      address: {},
      age: 30,
    };

    const result = cleanDeepObject(input);
    expect(result).toEqual({
      name: "John",
      age: 30,
    });
  });

  it("should clean nested objects", () => {
    const input = {
      name: "John",
      address: {
        street: "",
        city: null,
        country: "USA",
      },
      hobbies: ["reading", ""],
      age: 30,
    };

    const result = cleanDeepObject(input);
    expect(result).toEqual({
      name: "John",
      address: {
        country: "USA",
      },
      hobbies: ["reading"],
      age: 30,
    });
  });

  it("should respect custom options", () => {
    const input = {
      name: "John",
      email: "",
      age: null,
      hobbies: [],
    };

    const result = cleanDeepObject(input, {
      emptyStrings: false,
      nullValues: false,
      emptyArrays: false,
    });

    expect(result).toEqual({
      name: "John",
      email: "",
      age: null,
      hobbies: [],
    });
  });

  it("should remove specific keys", () => {
    const input = {
      name: "John",
      email: "john@example.com",
      password: "secret",
      age: 30,
    };

    const result = cleanDeepObject(input, {
      cleanKeys: ["password"],
    });

    expect(result).toEqual({
      name: "John",
      email: "john@example.com",
      age: 30,
    });
  });

  it("should remove specific values", () => {
    const input = {
      name: "John",
      status: "pending",
      age: 30,
    };

    const result = cleanDeepObject(input, {
      cleanValues: ["pending"],
    });

    expect(result).toEqual({
      name: "John",
      age: 30,
    });
  });

  it("should handle arrays of objects", () => {
    const input = {
      users: [
        { name: "John", email: "" },
        { name: "Jane", email: "jane@example.com" },
      ],
    };

    const result = cleanDeepObject(input);
    expect(result).toEqual({
      users: [{ name: "John" }, { name: "Jane", email: "jane@example.com" }],
    });
  });
});
