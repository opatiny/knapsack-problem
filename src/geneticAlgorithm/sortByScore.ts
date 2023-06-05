import { Solution } from "./geneticKnapsack";

export function sortByScore(solutions: Solution[]): Solution[] {
  const copy = solutions.slice();
  return copy.sort((a, b) => {
    return a.properties.score - b.properties.score;
  });
}
