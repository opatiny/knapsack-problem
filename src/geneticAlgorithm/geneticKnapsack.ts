import {
  SelectionProperties,
  getSelectionProperties,
} from "./getSelectionProperties";
import { ObjectSelection, selectObjects } from "./selectObjects";
import { Object } from "..";
import { crossoverAll } from "./crossoverAll";
import { sortByScore } from "./sortByScore";
import { placeSolutionInArray } from "../utils/placeSolutionInArray";

export interface RandomOptions {
  /**
   * Seed the random generator?
   *
   * @default undefined
   */
  seed?: number;
}

export interface KnapsackOptions extends RandomOptions {
  /**
   * @default 1000
   */
  maxInitialIterations?: number;
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

export function geneticKnapsack(
  data: Object[],
  weight: number,
  options: KnapsackOptions = {}
): Solution {
  const {
    seed,
    generationSize = 100,
    generationSubsetSize = 10,
    nbIterations = 5,
    maxInitialIterations = 10,
  } = options;

  const nbObjects = data.length;

  let selections: ObjectSelection[] = [];
  let counter = 0;
  while (selections.length < generationSubsetSize) {
    const selection = selectObjects(nbObjects);
    const properties = getSelectionProperties(selection, data);
    if (properties.weight <= weight) {
      selections.push(selection);
    }
  }
  counter++;
  if (counter > maxInitialIterations) {
    throw new Error(
      "Could not find enough initial selections with appropriate weight"
    );
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
