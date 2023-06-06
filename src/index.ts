import { readFileSync } from "fs";
import { bruteForceKnapsack } from "./bruteForce/bruteForceKnapsack";
import { geneticKnapsack } from "./geneticAlgorithm/geneticKnapsack";

export interface Object {
  /**
   * Object name.
   */
  name: string;
  /**
   * Score from 1 to 10.
   */
  score: number;
  /**
   * Weight of the object in kg.
   */
  weight: number;
}

// loading data
const rawData = readFileSync(__dirname + "/data/backpack.json", "utf-8");
const data = JSON.parse(rawData);

const nbObjects = data.length;

console.log("Number or objects to pick from: " + nbObjects);

// define variables
const bagWeight = 3; // [kg]
const nbBestSolutions = 5;

// find the best solution(s) using brute force approach

const bfSolutions = bruteForceKnapsack(data, bagWeight, { nbBestSolutions });

console.log("\n Brute force solutions");
console.table(bfSolutions);

console.log("Computing best solution with genetic algorithm...");
const geneticSolution = geneticKnapsack(data, bagWeight);

console.log("\n Genetic algorithm solution");
console.table(geneticSolution);
