import { readFileSync } from "fs";
import { bruteForceKnapsack } from "./bruteForce/bruteForceKnapsack";
import { geneticKnapsack } from "./geneticAlgorithm/geneticKnapsack";

export interface BagItem {
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
const rawData = readFileSync(__dirname + "/data/items10.json", "utf-8");

console.log(rawData);

const data = JSON.parse(rawData);

const nbObjects = data.length;

// define variables
const bagWeight = 1; // [kg]

console.log(`Maximum bag weight: ${bagWeight}`);
console.log(`Number of objects to pick from: ${nbObjects}`);

// find the best solution(s) using brute force approach

const bfSolutions = bruteForceKnapsack(data, bagWeight, { nbBestSolutions: 5 });

console.log("\n Brute force solutions");
console.table(bfSolutions);

// apply genetic algorithm
const geneticSolution = geneticKnapsack(data, bagWeight, {
  generationSize: 200,
  generationSubsetSize: 20,
});

console.log("\n Genetic algorithm solution");
console.table(geneticSolution);
