import Random from "ml-random";

export interface ObjectSelection {
  booleanArray: boolean[];
  indices: number[];
}

export interface SelectObjectsOptions {
  seed?: number;
}

export function selectObjects(
  totalNbObjects: number,
  options: SelectObjectsOptions = {}
): ObjectSelection {
  let booleanArray: boolean[] = [];
  let indices: number[] = [];

  const randomGenerator =
    options.seed !== undefined ? new Random(options.seed) : new Random();

  const values = [true, false];

  for (let i = 0; i < totalNbObjects; i++) {
    const currentValue = randomGenerator.choice(values)[0];
    booleanArray.push(currentValue);
    if (currentValue) indices.push(i);
  }
  return { booleanArray, indices };
}
