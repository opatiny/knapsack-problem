import { test, expect } from "vitest";
import { selectObjects } from "../selectObjects";

test("verify list length", () => {
  expect(selectObjects(5).length).toBe(5);
});

test("test seed", () => {
  expect(selectObjects(5, { seed: 0 })).toStrictEqual(
     [true, true, false, true, false],
);
});
