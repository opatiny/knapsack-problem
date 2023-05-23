import { ObjectSelection } from "./selectObjects";
import Random from "ml-random";

export interface CrossoverOptions {
  /**
   * Seed the random generator?
   * @default false
   */
  seed?: number;
  /**
   * Minimum number of elements that have to be exchanged between the two selections.
   *
   * @default 1
   */
  minCrossoverLength?: number;
}

export function crossover(
  selection1: ObjectSelection,
  selection2: ObjectSelection,
  options: CrossoverOptions = {}
): ObjectSelection[] {
  const { seed, minCrossoverLength = 1 } = options;

  const randomGenerator = seed !== undefined ? new Random(seed) : new Random();

  const crossIndex = randomGenerator.randInt(
    minCrossoverLength,
    selection1.length - (minCrossoverLength + 1)
  );
}
