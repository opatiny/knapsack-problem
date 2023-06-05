import { test, expect } from "vitest";
import { ObjectSelection } from "../selectObjects";
import { mutate } from "../mutate";

test("mutateIndex = 1", () => {
  const selection: ObjectSelection = [true, true, true, true];
  mutate(selection, { mutateIndex: 1 });
  expect(selection).toStrictEqual([true, false, true, true]);
});
