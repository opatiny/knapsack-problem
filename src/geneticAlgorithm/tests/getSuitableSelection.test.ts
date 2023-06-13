import { readFileSync } from "fs";
import { test, expect } from "vitest";
import { getSuitableSelection } from "../getSuitableSelection";
import { getSelectionProperties } from "../getSelectionProperties";

const rawData = readFileSync(__dirname + "/../../data/testData.json", "utf-8");
const data = JSON.parse(rawData);

test("get a suitable selection", () => {
  const weight = 0.4;
  const result = getSuitableSelection(data, 0.4);
  console.log(result);
  const properties = getSelectionProperties(result, data);

  expect(properties.weight <= weight).toBe(true);
});
