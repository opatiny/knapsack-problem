import { Solution } from "../geneticAlgorithm/geneticKnapsack";

export function placeSolutionInArray(
  solutionArray: Solution[],
  solution: Solution,
  maxLength: number
): Solution[] {
  for (let i = solutionArray.length - 1; i >= 0; i--) {
    if (
      solution.properties.totalScore > solutionArray[i].properties.totalScore
    ) {
      solutionArray.splice(i, 0, solution);
      continue;
    }
  }

  if (solutionArray.length <= maxLength) {
    return solutionArray;
  } else {
    return solutionArray.slice(0, maxLength - 1);
  }
}
