import { readFileSync } from "fs";
import { test, expect } from "vitest";
import { Solution } from "../../geneticAlgorithm/geneticKnapsack";
import { placeSolutionInArray } from "../placeSolutionInArray";

let solutionArray: Solution[] = [
  {
    selection: [true, true, false, true],
    properties: { score: 30, weight: 1 },
  },
  {
    selection: [true, false, false, true],
    properties: { score: 25, weight: 1 },
  },
  {
    selection: [false, true, false, false],
    properties: { score: 20, weight: 1 },
  },
];

test("add element to end of array", () => {
  solutionArray = solutionArray.slice();

  const solution = {
    selection: [false, false, true, false],
    properties: { score: 15, weight: 1 },
  };

  placeSolutionInArray(solutionArray, solution, 10);
  expect(solutionArray).toStrictEqual([
    {
      selection: [true, true, false, true],
      properties: { score: 30, weight: 1 },
    },
    {
      selection: [true, false, false, true],
      properties: { score: 25, weight: 1 },
    },
    {
      selection: [false, true, false, false],
      properties: { score: 20, weight: 1 },
    },
    {
      selection: [false, false, true, false],
      properties: { score: 15, weight: 1 },
    },
  ]);
});

test("maxLength reached", () => {
  solutionArray = solutionArray.slice();
  const solution = {
    selection: [false, false, true, false],
    properties: { score: 40, weight: 1 },
  };

  placeSolutionInArray(solutionArray, solution, 3);
  expect(solutionArray).toStrictEqual([
    {
      selection: [false, false, true, false],
      properties: { score: 40, weight: 1 },
    },
    {
      selection: [true, true, false, true],
      properties: { score: 30, weight: 1 },
    },
    {
      selection: [true, false, false, true],
      properties: { score: 25, weight: 1 },
    },
  ]);
});

test("array with length of 1", () => {
  solutionArray = [
    {
      selection: [false, false, true, false],
      properties: { score: 20, weight: 1 },
    },
  ];

  const solution = {
    selection: [false, false, true, false],
    properties: { score: 40, weight: 1 },
  };

  placeSolutionInArray(solutionArray, solution, 1);
  expect(solutionArray).toStrictEqual([
    {
      selection: [false, false, true, false],
      properties: { score: 40, weight: 1 },
    },
  ]);
});

test("initially empty array", () => {
  solutionArray = [];

  const solution = {
    selection: [false, false, true, false],
    properties: { score: 40, weight: 1 },
  };

  placeSolutionInArray(solutionArray, solution, 1);
  expect(solutionArray).toStrictEqual([
    {
      selection: [false, false, true, false],
      properties: { score: 40, weight: 1 },
    },
  ]);
});
