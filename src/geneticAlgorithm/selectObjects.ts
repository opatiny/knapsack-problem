import Random from "ml-random";

export type ObjectSelection =  boolean[];


export interface SelectObjectsOptions {
  seed?: number;
}

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
