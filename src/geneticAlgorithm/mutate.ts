import Random from "ml-random";
import { ObjectSelection } from "./selectObjects";
import { RandomOptions } from "./geneticKnapsack";

export interface MutateOptions extends RandomOptions {
  /**
   * Specify a desired index for the mutation.
   *
   * @default undefined
   */
  mutateIndex?: number;
}

export function mutate(
  selection: ObjectSelection,
  options: MutateOptions = {}
): void {
  const { seed, mutateIndex } = options;

  const randomGenerator = seed !== undefined ? new Random(seed) : new Random();

  const index = mutateIndex
    ? mutateIndex
    : randomGenerator.randInt(selection.length);

  selection[index] = !selection[index];
}
