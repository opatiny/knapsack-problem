import { readFileSync } from "fs";

export interface Object {
  /**
   * Object name.
   */
  name: string;
  /**
   * Score from 1 to 10.
   */
  score: number;
  /**
   * Weight of the object in kg.
   */
  weight: number;
}

// loading data
const rawData = readFileSync("./data/backpack.json", "utf-8");
const data = JSON.parse(rawData);

const nbObjects = data.length;

console.log(nbObjects);
