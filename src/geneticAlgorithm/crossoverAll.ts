import { CrossoverOptions, crossover } from "./crossover";
import { RandomOptions } from "./geneticKnapsack";
import { ObjectSelection } from "./selectObjects";
import Random from "ml-random";

export function crossoverAll(
  selections: ObjectSelection[],
  options: CrossoverOptions = {}
): ObjectSelection[] {
  const { seed } = options;
  // ignore last selection if nb of selections is odd
  const nbSelections =
    selections.length % 2 ? selections.length - 1 : selections.length;

  const randomGenerator = seed !== undefined ? new Random(seed) : new Random();

  const indices = randomGenerator.choice(nbSelections, {
    size: nbSelections,
  });

  let result: ObjectSelection[] = [];
  for (let i = 0; i < nbSelections / 2; i++) {
    result.push(
      ...crossover(selections[indices[2 * i]], selections[indices[2 * i + 1]], {
        seed,
      })
    );
  }

  return result;
}
