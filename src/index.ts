import { readFileSync } from "fs";
import { bruteForceKnapsack } from "./bruteForce/bruteForceKnapsack";
import { geneticKnapsack } from "./geneticAlgorithm/geneticKnapsack";
import { printFinalItemsNames } from "./utils/printFinalItemsNames";
import { parseCsv } from "./utils/parseCsv";

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
const rawData = readFileSync(__dirname + "/data/items50.csv", "utf-8");

const data = parseCsv(rawData);

const nbObjects = data.length;

// define variables
const bagWeight = 2; // [kg]

console.log(`Maximum bag weight: ${bagWeight} kg`);
console.log(`Number of objects to pick from: ${nbObjects}`);

// find the best solution(s) using brute force approach

// const bfSolutions = bruteForceKnapsack(data, bagWeight, { nbBestSolutions: 5 });
//
// console.log("\n Brute force solutions");
// console.table(bfSolutions, ["properties"]);

// apply genetic algorithm
const geneticSolution = geneticKnapsack(data, bagWeight, {
  generationSize: 200,
  generationSubsetSize: 20,
});

console.log("\n Genetic algorithm solution");
console.table(geneticSolution, ["score", "weight"]);

console.log("\n Items to take with:");
printFinalItemsNames(data, geneticSolution.selection);
