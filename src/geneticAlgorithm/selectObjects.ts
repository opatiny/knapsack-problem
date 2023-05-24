import Random from "ml-random";

export type ObjectSelection = boolean[];

export interface SelectObjectsOptions {
  /**
   * Seed for the random generator. No seed by default.
   * @default undefined
   */
  seed?: number;
}

/**
 * Randomly select some indices that correspond to the position of the objects in the data.
 * @param totalNbObjects - Number of objects in data.
 * @param options Select objects options.
 * @returns A boolean array indicating the selected objects.
 */
export function selectObjects(
  totalNbObjects: number,
  options: SelectObjectsOptions = {}
): ObjectSelection {
  let booleanArray: boolean[] = [];

  const randomGenerator =
    options.seed !== undefined ? new Random(options.seed) : new Random();

  const values = [true, false];

  for (let i = 0; i < totalNbObjects; i++) {
    const currentValue = randomGenerator.choice(values)[0];
    booleanArray.push(currentValue);
  }
  return booleanArray;
}
