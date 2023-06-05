import { Solution } from "../geneticAlgorithm/geneticKnapsack";

export function placeSolutionInArray(
  solutionArray: Solution[],
  solution: Solution,
  maxLength: number
): void {
  if (solutionArray.length === 0) {
    solutionArray.push(solution);
  }
  for (let i = 0; i < solutionArray.length; i++) {
    if (solution.properties.score > solutionArray[i].properties.score) {
      solutionArray.splice(i, 0, solution);
      if (solutionArray.length > maxLength) {
        solutionArray.length = maxLength;
      }
      return;
    }
  }

  if (solutionArray.length < maxLength - 1) {
    solutionArray.push(solution);
    return;
  }
}
