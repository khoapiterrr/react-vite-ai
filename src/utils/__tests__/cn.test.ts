import { describe, it, expect } from "vitest";
import {
  cn,
  createVariant,
  createResponsiveVariant,
  createConditionalVariant,
  createSizeVariant,
  createStateVariant,
} from "../cn";

describe("cn", () => {
  it("should combine class names", () => {
    expect(cn("base", "additional")).toBe("base additional");
  });

  it("should handle conditional classes", () => {
    const isConditionTrue = true;
    const isConditionFalse = false;
    expect(cn("base", isConditionTrue && "conditional")).toBe(
      "base conditional",
    );
    expect(cn("base", isConditionFalse && "conditional")).toBe("base");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["base", "additional"])).toBe("base additional");
  });

  it("should handle objects with boolean values", () => {
    expect(cn({ base: true, conditional: false })).toBe("base");
  });

  it("should merge Tailwind classes correctly", () => {
    expect(cn("p-4 p-6")).toBe("p-6");
    expect(cn("text-red-500 text-blue-500")).toBe("text-blue-500");
  });
});

describe("createVariant", () => {
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
  };

  const getVariant = createVariant("base-class", variants);

  it("should combine base class with variant class", () => {
    expect(getVariant("primary")).toBe("base-class bg-blue-500 text-white");
  });

  it("should handle additional classes", () => {
    expect(getVariant("secondary", "extra-class")).toBe(
      "base-class bg-gray-500 text-white extra-class",
    );
  });
});

describe("createResponsiveVariant", () => {
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
  };

  const getResponsiveVariant = createResponsiveVariant("base-class", variants);

  it("should handle responsive classes", () => {
    const responsiveClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    expect(getResponsiveVariant("primary", responsiveClasses)).toBe(
      "base-class bg-blue-500 text-white sm:p-4 md:p-6 lg:p-8",
    );
  });

  it("should work without responsive classes", () => {
    expect(getResponsiveVariant("secondary")).toBe(
      "base-class bg-gray-500 text-white",
    );
  });

  it("should handle additional classes with responsive classes", () => {
    const responsiveClasses = {
      sm: "p-4",
      md: "p-6",
    };

    expect(
      getResponsiveVariant("primary", responsiveClasses, "extra-class"),
    ).toBe("base-class bg-blue-500 text-white sm:p-4 md:p-6 extra-class");
  });
});

describe("createConditionalVariant", () => {
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
  };

  const getConditionalVariant = createConditionalVariant(
    "base-class",
    variants,
  );

  it("should apply variant when condition is true", () => {
    expect(getConditionalVariant("primary", true)).toBe(
      "base-class bg-blue-500 text-white",
    );
  });

  it("should not apply variant when condition is false", () => {
    expect(getConditionalVariant("secondary", false)).toBe("base-class");
  });

  it("should handle additional classes", () => {
    expect(getConditionalVariant("primary", true, "extra-class")).toBe(
      "base-class bg-blue-500 text-white extra-class",
    );
  });
});

describe("createSizeVariant", () => {
  const sizes = {
    sm: "text-sm p-2",
    md: "text-base p-4",
    lg: "text-lg p-6",
  };

  const getSizeVariant = createSizeVariant("base-class", sizes);

  it("should apply size classes", () => {
    expect(getSizeVariant("md")).toBe("base-class text-base p-4");
  });

  it("should handle additional classes", () => {
    expect(getSizeVariant("lg", "extra-class")).toBe(
      "base-class text-lg p-6 extra-class",
    );
  });
});

describe("createStateVariant", () => {
  const states = {
    hover: "hover:bg-blue-500",
    focus: "focus:ring-2 focus:ring-blue-500",
    active: "active:bg-blue-600",
  };

  const getStateVariant = createStateVariant("base-class", states);

  it("should apply state classes", () => {
    expect(getStateVariant("hover")).toBe("base-class hover:bg-blue-500");
  });

  it("should handle additional classes", () => {
    expect(getStateVariant("focus", "extra-class")).toBe(
      "base-class focus:ring-2 focus:ring-blue-500 extra-class",
    );
  });
});
