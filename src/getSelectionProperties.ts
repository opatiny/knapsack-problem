import { Object } from ".";

export interface SelectionProperties {
  totalWeight: number;
  totalScore: number;
}

export function getSelectionProperties(
  selection: number[],
  data: Object[]
): SelectionProperties {
  let totalWeight = 0;
  let totalScore = 0;

  for (let i = 0; i < selection.length; i++) {
    const index = selection[i];
    totalWeight += data[index].weight;
    totalScore += data[index].score;
  }

  return { totalScore, totalWeight };
}
