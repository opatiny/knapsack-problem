import { readFileSync } from "fs";
import { bruteForceKnapsack } from "./bruteForce/bruteForceKnapsack";
import { geneticKnapsack } from "./geneticAlgorithm/geneticKnapsack";
import { printFinalItemsNames } from "./utils/printFinalItemsNames";
import { parseCsv } from "./utils/parseCsv";
import { join } from "node:path";
import { parseArgs } from "node:util";

// handle command line arguments
const args = parseArgs({
  options: {
    fileName: { type: "string", default: "items10.csv", short: "f" },
    bruteForce: { type: "boolean", default: true },
    debug: { type: "boolean", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

const fileName = args.values.fileName as string;
const bruteForce = args.values.bruteForce as boolean;
const debug = args.values.debug as boolean;

// loading data
const rawData = readFileSync(join(__dirname, "data", fileName), "utf-8");

const data = parseCsv(rawData);

const nbObjects = data.length;

// define variables
const bagWeight = 2; // [kg]

console.log(`Maximum bag weight: ${bagWeight} kg`);
console.log(`Number of objects to pick from: ${nbObjects}`);

// find the best solution(s) using brute force approach
if (bruteForce) {
  const bfSolutions = bruteForceKnapsack(data, bagWeight, {
    nbBestSolutions: 5,
  });

  console.log("\n Brute force solutions");
  console.table(bfSolutions, ["properties"]);
}

// apply genetic algorithm
const geneticSolution = geneticKnapsack(data, bagWeight, {
  generationSize: 500,
  generationSubsetSize: 20,
  debug,
});

console.log("\n Genetic algorithm solution");
console.table(geneticSolution, ["score", "weight"]);

console.log("\n Items to take with:");
printFinalItemsNames(data, geneticSolution.selection);
