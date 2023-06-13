import Random from "ml-random";
import { BagItem } from "..";
import { RandomOptions } from "./geneticKnapsack";
import { getSelectionProperties } from "./getSelectionProperties";
import { ObjectSelection, selectObjects } from "./selectObjects";

export function getSuitableSelection(
  data: BagItem[],
  weight: number,
  options: RandomOptions = {}
): ObjectSelection {
  const { seed } = options;

  const nbObjects = data.length;

  const selection = selectObjects(nbObjects, options);
  let properties = getSelectionProperties(selection, data);

  const randomGenerator = seed !== undefined ? new Random(seed) : new Random();

  while (properties.weight > weight) {
    const index = randomGenerator.randInt(nbObjects);
    selection[index] = !selection[index];
    properties = getSelectionProperties(selection, data);
  }

  return selection;
}
