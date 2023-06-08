import { BagItem } from "..";

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

  let result: BagItem[] = [];

  const rows = rawData.split("\n");
  const headers = rows.shift();
  for (let row of rows) {
    const values = row.split(separator);
    const name = values[0];
    const weight = Number(values[1]);
    const score = Number(values[2]);

    console.log({ name, weight, score });

    if (!(name && weight && score)) {
      throw new Error("invalid data format");
    }
    result.push({ name, weight, score });
  }

  return result;
}
