import { test, expect } from "vitest";
import { selectObjects } from "../selectObjects";
import { readFileSync } from "fs";
import { getSelectionProperties } from "../getSelectionProperties";

const rawData = readFileSync(__dirname + "/testData.json", "utf-8");
const data = JSON.parse(rawData);

test("pick two objects", () => {
  expect(getSelectionProperties([2, 3], data)).toStrictEqual({
    totalWeight: 0.8,
    totalScore: 10,
  });
});
