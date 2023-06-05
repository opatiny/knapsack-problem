import { Solution } from "../geneticAlgorithm/geneticKnapsack";
import { getSelectionProperties } from "../geneticAlgorithm/getSelectionProperties";
import { ObjectSelection } from "../geneticAlgorithm/selectObjects";
import { Object } from "..";
import { placeSolutionInArray } from "../utils/placeSolutionInArray";

export interface BruteForceKnapsackOptions {
  /**
   * @default 1
   */
  nbBestSolutions?: number;
}

export function bruteForceKnapsack(
  data: Object[],
  weight: number,
  options: BruteForceKnapsackOptions = {}
): Solution[] {
  const { nbBestSolutions = 1 } = options;

  const nbObjects = data.length;

  let solutions: Solution[] = [];

  for (let i = 0; i < 2 ** nbObjects; i++) {
    const currentSelection: ObjectSelection = [];
    for (let j = 0; j < nbObjects; j++) {
      if (i & (1 << j)) {
        currentSelection.push(true);
      } else {
        currentSelection.push(false);
      }
    }

    const properties = getSelectionProperties(currentSelection, data);
    if (properties.weight <= weight) {
      placeSolutionInArray(
        solutions,
        { selection: currentSelection, properties },
        nbBestSolutions
      );
    }
  }

  return solutions;
}
