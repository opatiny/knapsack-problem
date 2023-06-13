import {
  SelectionProperties,
  getSelectionProperties,
} from "./getSelectionProperties";
import { ObjectSelection, selectObjects } from "./selectObjects";
import { BagItem } from "..";
import { crossoverAll } from "./crossoverAll";
import { sortByScore } from "./sortByScore";
import { placeSolutionInArray } from "../utils/placeSolutionInArray";
import { getSuitableSelection } from "./getSuitableSelection";

export interface RandomOptions {
  /**
   * Seed for the random generator. No seed by default.
   *
   * @default undefined
   */
  seed?: number;
}

export interface KnapsackOptions extends RandomOptions {
  /**
   * @default 100
   */
  generationSize?: number;
  /**
   * @default 10
   */
  generationSubsetSize?: number;
  /**
   * @default 5
   */
  nbIterations?: number;
  /**
   * @default true
   */
  mutate?: boolean;
}

export interface Solution {
  selection: ObjectSelection;
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
  } = options;

  const nbObjects = data.length;

  let selections: ObjectSelection[] = [];
  let counter = 0;
  for (let i = 0; i < generationSubsetSize; i++) {
    const selection = getSuitableSelection(data, weight, { seed });
    const properties = getSelectionProperties(selection, data);
    selections.push(selection);
  }

  let bestSelections: ObjectSelection[] = selections;
  let bestSolutions: Solution[] = [];

  const nbCrossovers = Math.round(generationSize / generationSubsetSize);
  for (let i = 0; i < nbIterations; i++) {
    let crossovers: ObjectSelection[] = [];

    for (let j = 0; j < nbCrossovers; j++) {
      crossovers.push(...crossoverAll(bestSelections, { seed }));
    }
    for (let selection of crossovers) {
      const properties = getSelectionProperties(selection, data);
      const solution: Solution = { selection, properties };
      if (properties.weight <= weight) {
        placeSolutionInArray(bestSolutions, solution, generationSubsetSize);
      }

      bestSelections = bestSolutions.map((solution) => solution.selection);
    }
  }

  return bestSolutions[0];
}
