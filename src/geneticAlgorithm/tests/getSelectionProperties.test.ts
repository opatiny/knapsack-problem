import { test, expect } from "vitest";
import { readFileSync } from "fs";
import { getSelectionProperties } from "../getSelectionProperties";

const rawData = readFileSync(__dirname + "/../../data/testData.json", "utf-8");
const data = JSON.parse(rawData);

test("pick two objects", () => {
  expect(
    getSelectionProperties([false, false, true, true], data)
  ).toStrictEqual({
    totalWeight: 0.8,
    totalScore: 10,
  });
});
test("selection length error", () => {
  expect(() => {
    getSelectionProperties([false], data);
  }).toThrow("Selection array must have same length as data");
});
