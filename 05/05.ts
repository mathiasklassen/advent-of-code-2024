import { readFileSync } from "fs";

const filePath = "./input.txt";

export function readFile(): string {
  return readFileSync(filePath, "utf8");
}

export function splitOrderingFromPageUpdates(input: string): [string, string] {
  const lines = input.split("\n\n");
  return [lines[0], lines[1]];
}

export function extractLinesFromInput(input: string): string[] {
  const lines = input.split("\n");
  return lines;
}

export function parseOrderingRules(
  orderingRulesString: string
): [number, number][] {
  const lines = extractLinesFromInput(orderingRulesString);
  return lines.map((line) => {
    const pages = line.split("|").map((pageString) => parseInt(pageString));
    return [pages[0], pages[1]];
  });
}

export function parseUpdates(pageUpdatesString: string): number[][] {
  const lines = extractLinesFromInput(pageUpdatesString);
  return lines.map((line) => line.split(",").map((entry) => parseInt(entry)));
}

export function updateToMap(update: number[]): Map<number, number> {
  const map = new Map<number, number>();
  update.forEach((item, index) => map.set(item, index));
  return map;
}

export function getMiddleNumber(update: number[]): number {
  if (update.length % 2 === 0) {
    throw new Error(
      `update length is not uneven! ${JSON.stringify(update)} ${update.length}`
    );
  }

  return update[Math.floor(update.length / 2)];
}

export function updateOrderIsCorrect(
  update: number[],
  orderingRules: [number, number][]
): boolean {
  const updateMap = updateToMap(update);
  for (let index = 0; index < orderingRules.length; index++) {
    const [first, second] = orderingRules[index];

    const firstIsInUpdate = updateMap.has(first);
    const secondIsInUpdate = updateMap.has(second);

    if (!firstIsInUpdate || !secondIsInUpdate) {
      continue;
    }

    const firstPageIndex = updateMap.get(first) ?? 0;
    const secondPageIndex = updateMap.get(second) ?? 0;
    if (!(firstPageIndex < secondPageIndex)) {
      // violation
      return false;
    }
  }

  return true;
}

export function main(input: string): number {
  const [ordering, pageUpdates] = splitOrderingFromPageUpdates(input);
  const orderingParsed = parseOrderingRules(ordering);
  const updatesParsed = parseUpdates(pageUpdates);

  let middleSum = 0;
  updatesParsed.forEach((update) => {
    const updateOrderCorrect = updateOrderIsCorrect(update, orderingParsed);
    if (!updateOrderCorrect) {
      return;
    }

    // only correct
    middleSum += getMiddleNumber(update);
  });

  return middleSum;
}

/** same as updateOrderIsCorrect, only return values change */
export function updateOrderComparator(
  update: number[],
  orderingRules: [number, number][]
): number {
  const updateMap = updateToMap(update);
  for (let index = 0; index < orderingRules.length; index++) {
    const [first, second] = orderingRules[index];

    const firstIsInUpdate = updateMap.has(first);
    const secondIsInUpdate = updateMap.has(second);

    if (!firstIsInUpdate || !secondIsInUpdate) {
      continue;
    }

    const firstPageIndex = updateMap.get(first) ?? 0;
    const secondPageIndex = updateMap.get(second) ?? 0;
    if (!(firstPageIndex < secondPageIndex)) {
      // violation, switch items
      return 1;
    }
  }

  // leave order as is
  return -1;
}

export function fixIncorrectUpdate(
  incorrectUpdate: number[],
  orderingRules: [number, number][]
): number[] {
  return incorrectUpdate.sort((a, b) =>
    updateOrderComparator([a, b], orderingRules)
  );
}

export function mainV2(input: string): number {
  const [ordering, pageUpdates] = splitOrderingFromPageUpdates(input);
  const orderingParsed = parseOrderingRules(ordering);
  const updatesParsed = parseUpdates(pageUpdates);

  let middleSum = 0;
  updatesParsed.forEach((update) => {
    const updateOrderCorrect = updateOrderIsCorrect(update, orderingParsed);
    if (updateOrderCorrect) {
      return;
    }

    // only incorrect
    const fixedUpdate = fixIncorrectUpdate(update, orderingParsed);
    middleSum += getMiddleNumber(fixedUpdate);
  });

  return middleSum;
}

const file = readFile();
const result = main(file);

console.log("05-1: result is: ", result);

const resultV2 = mainV2(file);
console.log("05-2: result is: ", resultV2);
