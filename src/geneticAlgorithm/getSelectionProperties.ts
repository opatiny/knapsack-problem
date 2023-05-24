import { Object } from "..";

export interface SelectionProperties {
  /**
   * Total weight in kg.
   */
  totalWeight: number;
  /**
   * Sum of all the selected objects scores.
   */
  totalScore: number;
}

/**
 * Compute weight and score of a selection.
 * @param selection The selected objects.
 * @param data The objects data.
 * @returns The selection stats.
 */
export function getSelectionProperties(
  selection: boolean[],
  data: Object[]
): SelectionProperties {
  if (selection.length != data.length) {
    throw new RangeError("Selection array must have same length as data");
  }
  let totalWeight = 0;
  let totalScore = 0;

  for (let i = 0; i < selection.length; i++) {
    if (selection[i]) {
      totalWeight += data[i].weight;
      totalScore += data[i].score;
    }
  }

  return { totalScore, totalWeight };
}
