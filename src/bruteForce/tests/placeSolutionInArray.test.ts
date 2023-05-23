import { readFileSync } from "fs";
import { test, expect } from "vitest";
import { Solution } from "../../geneticAlgorithm/geneticKnapsack";
import { placeSolutionInArray } from "../placeSolutionInArray";

let solutionArray: Solution[] = [
  {
    selection: [true, true, false, true],
    properties: { totalScore: 30, totalWeight: 1 },
  },
  {
    selection: [true, false, false, true],
    properties: { totalScore: 25, totalWeight: 1 },
  },
  {
    selection: [false, true, false, false],
    properties: { totalScore: 20, totalWeight: 1 },
  },
];

test("add element to end of array", () => {
  solutionArray = solutionArray.slice();

  const solution = {
    selection: [false, false, true, false],
    properties: { totalScore: 15, totalWeight: 1 },
  };

  placeSolutionInArray(solutionArray, solution, 10);
  expect(solutionArray).toStrictEqual([
    {
      selection: [true, true, false, true],
      properties: { totalScore: 30, totalWeight: 1 },
    },
    {
      selection: [true, false, false, true],
      properties: { totalScore: 25, totalWeight: 1 },
    },
    {
      selection: [false, true, false, false],
      properties: { totalScore: 20, totalWeight: 1 },
    },
    {
      selection: [false, false, true, false],
      properties: { totalScore: 15, totalWeight: 1 },
    },
  ]);
});

test("maxLength reached", () => {
  solutionArray = solutionArray.slice();
  const solution = {
    selection: [false, false, true, false],
    properties: { totalScore: 40, totalWeight: 1 },
  };

  placeSolutionInArray(solutionArray, solution, 3);
  expect(solutionArray).toStrictEqual([
    {
      selection: [false, false, true, false],
      properties: { totalScore: 40, totalWeight: 1 },
    },
    {
      selection: [true, true, false, true],
      properties: { totalScore: 30, totalWeight: 1 },
    },
    {
      selection: [true, false, false, true],
      properties: { totalScore: 25, totalWeight: 1 },
    },
  ]);
});

test("array with length of 1", () => {
  solutionArray = [
    {
      selection: [false, false, true, false],
      properties: { totalScore: 20, totalWeight: 1 },
    },
  ];

  const solution = {
    selection: [false, false, true, false],
    properties: { totalScore: 40, totalWeight: 1 },
  };

  placeSolutionInArray(solutionArray, solution, 1);
  expect(solutionArray).toStrictEqual([
    {
      selection: [false, false, true, false],
      properties: { totalScore: 40, totalWeight: 1 },
    },
  ]);
});

test("initially empty array", () => {
  solutionArray = [];

  const solution = {
    selection: [false, false, true, false],
    properties: { totalScore: 40, totalWeight: 1 },
  };

  placeSolutionInArray(solutionArray, solution, 1);
  expect(solutionArray).toStrictEqual([
    {
      selection: [false, false, true, false],
      properties: { totalScore: 40, totalWeight: 1 },
    },
  ]);
});
