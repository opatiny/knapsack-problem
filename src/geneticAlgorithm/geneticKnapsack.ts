import {
  SelectionProperties,
  getSelectionProperties,
} from "./getSelectionProperties";
import { ObjectSelection, selectObjects } from "./selectObjects";
import { Object } from "..";

export interface KnapsackOptions {
  /**
   * @default 1000
   */
  maxInitialIterations?: number;
  /**
   * @default 10
   */
  generationSize?: number;
  /**
   * @default 5
   */
  nbIterations?: number;
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
    generationSize = 10,
    nbIterations = 5,
    maxInitialIterations = 1000,
  } = options;

  const nbObjects = data.length;

  let selections: ObjectSelection[] = [];
  let counter = 0;
  while (selections.length < generationSize) {
    const selection = selectObjects(nbObjects);
    const properties = getSelectionProperties(selection.indices, data);
    if (properties.totalWeight <= weight) {
      selections.push();
    }
  }
  counter++;
  if (counter > maxInitialIterations) {
    throw new Error();
  }
}
