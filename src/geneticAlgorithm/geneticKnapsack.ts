import {
  SelectionProperties,
  getSelectionProperties,
} from "./getSelectionProperties";
import { ObjectSelection, selectObjects } from "./selectObjects";
import { crossoverAll } from "./crossoverAll";
import { sortByScore } from "./sortByScore";
import { placeSolutionInArray } from "../utils/placeSolutionInArray";
import { getSuitableSelection } from "./getSuitableSelection";
import Random from "ml-random";
import { crossover } from "./crossover";
import { mutate } from "./mutate";

export interface RandomOptions {
  /**
   * Seed for the random generator. No seed by default.
   *
   * @default undefined
   */
  seed?: number;
}

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

export interface KnapsackOptions extends RandomOptions {
  /**
   * Size of each generation.
   * @default 100
   */
  generationSize?: number;
  /**
   * Size of each generation subset.
   * @default 10
   */
  generationSubsetSize?: number;
  /**
   * Number of iterations of the algorithm.
   * @default 5
   */
  nbIterations?: number;
  /**
   * Specify the number of changes to apply to each selection for every iteration of the algorithm.
   * A change is either a crossover or a mutation.
   * @default 3
   */
  nbChanges?: number;
  /**
   * Probability of having a simple mutation instead of a crossover.
   * @default 0.8
   */
  mutationRate?: number;
  /**
   * Print debug information.
   * @default false
   */
  debug?: boolean;
}

export interface Solution {
  /**
   * Boolean string indicating which objects to take with.
   */
  selection: ObjectSelection;
  /**
   * Properties of the selection (weight and score).
   */
  properties: SelectionProperties;
}

/**
 * Find a good solution to the knapsack problem for a bag of a given weight.
 *
 * @param data The data with all the items to pick from.
 * @param weight - Maximal weight of the backpack.
 * @param options - Genetic Knapsack options.
 * @returns Genetic solution.
 */
export function geneticKnapsack(
  data: BagItem[],
  weight: number,
  options: KnapsackOptions = {}
): Solution {
  const {
    seed,
    generationSize = 100,
    generationSubsetSize = 10,
    nbIterations = 5,
    nbChanges = 3,
    mutationRate = 0.8,
    debug = false,
  } = options;

  const randomGenerator =
    options.seed !== undefined ? new Random(options.seed) : new Random();

  const nbObjects = data.length;

  // generate initial population with subsetSize suitable selections
  let selections: ObjectSelection[] = [];
  for (let i = 0; i < generationSubsetSize; i++) {
    const selection = getSuitableSelection(data, weight, { seed });
    selections.push(selection);
  }

  let bestSelections: ObjectSelection[] = selections;
  let bestSolutions: Solution[] = [];

  console.log({ bestSelections });

  // core of the algorithm that runs for each iteration
  for (let iteration = 0; iteration < nbIterations; iteration++) {
    let changedSelections: ObjectSelection[] = [];

    for (let j = 0; j < generationSize; j++) {
      let currentSelection = bestSelections[j % bestSelections.length];

      for (
        let changeIndex = 1;
        changeIndex < randomGenerator.randInt(1, nbChanges);
        changeIndex++
      ) {
        if (randomGenerator.random() < mutationRate) {
          const otherSelection =
            bestSelections[
              randomGenerator.randInt(0, bestSelections.length - 1)
            ];
          currentSelection = crossover(currentSelection, otherSelection, {
            seed,
          })[0];
        } else {
          mutate(currentSelection, { seed });
        }
        if (j === 1) {
          console.log(currentSelection);
        }
      }
      changedSelections.push(currentSelection);
    }

    for (let selection of changedSelections) {
      const properties = getSelectionProperties(selection, data);
      const solution: Solution = { selection, properties };
      if (properties.weight <= weight) {
        placeSolutionInArray(bestSolutions, solution, generationSubsetSize);
      }

      bestSelections = bestSolutions.map((solution) => solution.selection);

      if (debug) {
        console.log({ bestSolution: bestSolutions[0].properties });
      }
    }
  }

  return bestSolutions[0];
}
