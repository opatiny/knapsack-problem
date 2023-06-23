import { BagItem } from "../geneticAlgorithm/geneticKnapsack";
import { ObjectSelection } from "../geneticAlgorithm/selectObjects";

export function printFinalItemsNames(
  data: BagItem[],
  selection: ObjectSelection
): void {
  let finalItemsNames: string[] = [];
  for (let i = 0; i < selection.length; i++) {
    if (selection[i]) {
      console.log(`- ${data[i].name}`);
    }
  }
  console.log("\n");
}
