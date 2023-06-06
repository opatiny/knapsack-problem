import { BagItem } from "..";

export interface SelectionProperties {
  /**
   * Total weight in kg.
   */
  weight: number;
  /**
   * Sum of all the selected objects scores.
   */
  score: number;
}

/**
 * Compute weight and score of a selection.
 * @param selection The selected objects.
 * @param data The objects data.
 * @returns The selection stats.
 */
export function getSelectionProperties(
  selection: boolean[],
  data: BagItem[]
): SelectionProperties {
  if (selection.length != data.length) {
    throw new RangeError("Selection array must have same length as data");
  }
  let weight = 0;
  let score = 0;

  for (let i = 0; i < selection.length; i++) {
    if (selection[i]) {
      weight += data[i].weight;
      score += data[i].score;
    }
  }

  return { score, weight };
}
