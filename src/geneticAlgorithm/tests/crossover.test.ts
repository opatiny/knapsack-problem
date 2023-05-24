import { test, expect } from "vitest";
import { ObjectSelection } from "../selectObjects";
import { crossover } from "../crossover";

test("crossoverIndex = 2", () => {
  const selection1: ObjectSelection = [true, true, true, true];
  const selection2: ObjectSelection = [false, false, false, false];
  expect(
    crossover(selection1, selection2, { crossoverIndex: 1 })
  ).toStrictEqual([
    [true, false, false, false],
    [false, true, true, true],
  ]);
});
test("seed = 0", () => {
  const selection1: ObjectSelection = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];
  const selection2: ObjectSelection = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  expect(crossover(selection1, selection2, { seed: 2 })).toStrictEqual([
    [true, true, true, true, false, false, false],
    [false, false, false, false, true, true, true],
  ]);
});
