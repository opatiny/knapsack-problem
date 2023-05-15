import Random from "ml-random";

export interface SelectObjectsOptions {
  seed?: number;
}

export function selectObjects(
  totalNbObjects: number,
  options: SelectObjectsOptions = {}
): boolean[] {
  let result: boolean[] = [];

  const randomGenerator =
    options.seed !== undefined ? new Random(options.seed) : new Random();

  const values = [true, false];

  for (let i = 0; i < totalNbObjects; i++) {
    result.push(...randomGenerator.choice(values));
  }
  return result;
}
