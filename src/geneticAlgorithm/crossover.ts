import { ObjectSelection } from "./selectObjects";
import Random from "ml-random";

export interface CrossoverOptions {
  /**
   * Seed the random generator?
   *
   * @default undefined
   */
  seed?: number;
  /**
   * Minimum number of elements that have to be exchanged between the two selections.
   *
   * @default 1
   */
  minCrossoverLength?: number;

  /**
   * Specify a desired index for the crossover.
   *
   * @default undefined
   */
  crossoverIndex?: number;
}

/**
 * Takes two object selections and switches the end of the arrays.
 * The length of the crossover is computed randomly, but is at least 1,
 * except if specified otherwise in the options.
 * @param selection1 - First object selection.
 * @param selection2 - Second object selection.
 * @param options Crossover options.
 * @returns The crossed over object selections.
 */
export function crossover(
  selection1: ObjectSelection,
  selection2: ObjectSelection,
  options: CrossoverOptions = {}
): ObjectSelection[] {
  const { crossoverIndex, seed, minCrossoverLength = 1 } = options;

  let crossIndex: number;
  if (crossoverIndex !== undefined) {
    crossIndex = crossoverIndex;
  } else {
    const randomGenerator =
      seed !== undefined ? new Random(seed) : new Random();

    crossIndex = randomGenerator.randInt(
      minCrossoverLength,
      selection1.length - (minCrossoverLength + 1)
    );
  }

  const start1 = selection1.slice(0, crossIndex);
  const start2 = selection2.slice(0, crossIndex);
  const end1 = selection1.slice(crossIndex);
  const end2 = selection2.slice(crossIndex);
  return [start1.concat(end2), start2.concat(end1)];
}
