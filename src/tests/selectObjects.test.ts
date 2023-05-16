import { test, expect } from "vitest";
import { selectObjects } from "../selectObjects";

test("verify list length", () => {
  expect(selectObjects(5).booleanArray.length).toBe(5);
});

test("test seed", () => {
  expect(selectObjects(5, { seed: 0 })).toStrictEqual({
    booleanArray: [true, true, false, true, false],
    indices: [0, 1, 3],
  });
});
