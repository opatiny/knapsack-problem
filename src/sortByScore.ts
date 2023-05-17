import { Solution } from "./knapsack";

export function sortByScore(solutions: Solution[]): Solution[] {
  const copy = solutions.slice();
  return copy.sort((a, b) => {
    return a.properties.totalScore - b.properties.totalScore;
  });
}
