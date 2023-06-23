import { BagItem } from "../geneticAlgorithm/geneticKnapsack";

export interface ParseCsvOptions {
  /**
   * @default ","
   */
  separator?: string;
}
/**
 *
 * @param rawData Data columns should be in the order "name", "weigth", "score"
 * @param options
 */
export function parseCsv(
  rawData: string,
  options: ParseCsvOptions = {}
): BagItem[] {
  const { separator = "," } = options;

  let entries: BagItem[] = [];

  // end of next line: ignore empty lines
  const rows = rawData.split(/\r?\n/).filter((line) => !line.match(/^\s*$/));

  const firstLine = rows.shift();
  let headers;
  if (!firstLine) {
    throw new Error("File is empty");
  } else {
    headers = firstLine.split(separator);
  }

  for (let i = 0; i < rows.length; i++) {
    const values = rows[i].split(separator);
    const name = values[0];
    const weight = Number(values[1]);
    const score = Number(values[2]);

    if (!(name && weight && score)) {
      throw new Error(`invalid data format on line ${i + 1}`);
    }
    entries.push({ name, weight, score });
  }

  return entries;
}
