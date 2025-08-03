import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "     ",
    expected: [],
  },
  {
    input: "hello    WORLD    ",
    expected: ["hello", "world"],
  },
  {
    input: "  HELLO    TO  Another woRLD",
    expected: ["hello", "to", "another", "world"],
  },
  {
    input: "  hello world  ",
    expected: ["hello", "world"],
  },

  // TODO: add more test cases
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
