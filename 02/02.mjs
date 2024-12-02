import { readFileSync } from "fs";

export function parseFile(filePath) {
  return readFileSync(filePath, "utf8");
}

export function parseInput(input) {
  const lines = input.split("\n");
  const levelLists = lines.map((line) => {
    const splittedStrings = line.trim().split(/\s+/);
    return splittedStrings.map((numberString) => parseInt(numberString));
  });

  return levelLists;
}

export function isSafeLevelListV1(levelList) {
  const minSafeInDeCreaseLevel = 1;
  const maxSafeInDeCreaseLevel = 3;

  let isIncreasing = undefined;
  let isSafe = true;

  // last element doesn't have a next
  for (let i = 0; i < levelList.length - 1; i++) {
    const currentElement = levelList[i];

    const nextElement = levelList[i + 1];
    const currentIsIncreasing = nextElement > currentElement;
    if (isIncreasing !== undefined && isIncreasing !== currentIsIncreasing) {
      // increasing/decreasing not consistent
      return false;
    }

    const difference = nextElement - currentElement;
    const normalizedDifference = difference >= 0 ? difference : difference * -1;
    if (
      normalizedDifference < minSafeInDeCreaseLevel ||
      normalizedDifference > maxSafeInDeCreaseLevel
    ) {
      return false;
    }

    isIncreasing = currentIsIncreasing;
  }

  return isSafe;
}

export function isSafeLevelList(levelList) {
  const minSafeInDeCreaseLevel = 1;
  const maxSafeInDeCreaseLevel = 3;

  let isSafe = true;

  const levelDifferences = levelList
    .slice(0, levelList.length - 1) // last element doesn't have a next
    .map((currentElement, i) => {
      const nextElement = levelList[i + 1];
      return nextElement - currentElement;
    });

  const allIncreasing = levelDifferences.every((difference) => difference > 0);
  const allDecreasing = levelDifferences.every((difference) => difference < 0);
  const allInTolerance = levelDifferences.every((difference) => {
    const normalizedDifference = difference >= 0 ? difference : difference * -1;
    return (
      normalizedDifference >= minSafeInDeCreaseLevel &&
      normalizedDifference <= maxSafeInDeCreaseLevel
    );
  });

  if ((!allIncreasing && !allDecreasing) || !allInTolerance) {
    isSafe = false;
  }

  return isSafe;
}

export function getNumberOfSafeLevelListsV1(levelLists) {
  const levelListsSafety = levelLists.map((levelList) =>
    isSafeLevelListV1(levelList)
  );

  return levelListsSafety.filter((value) => value).length;
}

export function getNumberOfSafeLevelLists(levelLists, useProblemDampener) {
  const safeValues = [];
  const unsafeValues = [];
  levelLists.forEach((levelList) => {
    if (isSafeLevelList(levelList)) {
      safeValues.push(levelList);
    } else {
      unsafeValues.push(levelList);
    }
  });

  if (!useProblemDampener) {
    return safeValues.length;
  }

  const additionalDampenedSafeValues =
    getAdditionalDampenedSafeValues(unsafeValues);

  return safeValues.length + additionalDampenedSafeValues.length;
}

export function getAdditionalDampenedSafeValues(unsafeValues) {
  const additionalDampenedSafeValues = [];
  unsafeValues.forEach((unsafeValue) => {
    for (let i = 0; i < unsafeValue.length; i++) {
      let unsafeValueCopy = getArrayCopyWithoutElement(unsafeValue, i);
      const currentSafe = isSafeLevelList(unsafeValueCopy);
      if (currentSafe) {
        additionalDampenedSafeValues.push(unsafeValueCopy);
        break;
      }
    }
  });
  return additionalDampenedSafeValues;
}

export function getArrayCopyWithoutElement(unsafeValue, i) {
  let unsafeValueCopy = [...unsafeValue];
  unsafeValueCopy.splice(i, 1);
  return unsafeValueCopy;
}

const filePath = "./input.txt";
const input = parseFile(filePath);
const levelLists = parseInput(input);
console.log(
  "02-1 v1: number of safe level lists is: " +
    getNumberOfSafeLevelListsV1(levelLists)
);
console.log(
  "02-1 v2: number of safe level lists is: " +
    getNumberOfSafeLevelLists(levelLists, false)
);
console.log(
  "02-2 v2: number of safe level lists with problem dampener is: " +
    getNumberOfSafeLevelLists(levelLists, true)
);
