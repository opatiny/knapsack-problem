import { readFileSync } from "fs";
import { parseCsv } from "../parseCsv";
import { test, expect } from "vitest";

test("one item", () => {
  const rawData = readFileSync(__dirname + "/../../data/simple.csv", "utf-8");

  const result = parseCsv(rawData);

  expect(result).toStrictEqual([{ name: "notebook", weight: 0.3, score: 4 }]);
});
