import { Object } from "..";

export interface SelectionProperties {
  totalWeight: number;
  totalScore: number;
}

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
