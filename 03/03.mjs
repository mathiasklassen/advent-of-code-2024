import { readFileSync } from "fs";

export function readFile(filePath) {
  return readFileSync(filePath, "utf8");
}

export function parseInput(input) {
  const lines = input.split("\n");
  return lines;
}

export function extractMultiplications(line) {
  return line.match(/mul\(\d{1,3},\d{1,3}\)/g);
}

export function extractMultiplicationsWithDosAndDonts(line) {
  return line.match(/do\(\)|don\'t\(\)|mul\(\d{1,3},\d{1,3}\)/g);
}

export function extractOnlyDoMultiplications(multiplicationsWithDosAndDonts) {
  const result = [];
  let doIt = true;
  multiplicationsWithDosAndDonts.forEach((element) => {
    if (element === "do()") {
      doIt = true;
      return;
    }

    if (element === `don't()`) {
      doIt = false;
      return;
    }

    if (!doIt) {
      return;
    }

    result.push(element);
  });

  return result;
}

export function doMultiplication(mulString) {
  const [x, y] = mulString.match(/\d{1,3},\d{1,3}/g)[0].split(",");
  return x * y;
}

const filePath = "./input.txt";
const input = readFile(filePath);
const lines = parseInput(input);

const extractedMultiplicationStrings = lines
  .map((line) => extractMultiplications(line))
  .flat();
const multiplications = extractedMultiplicationStrings.map((mulString) =>
  doMultiplication(mulString)
);
const sumOfMultiplications = multiplications.reduce(
  (sum, current) => sum + current
);
console.log("03-1: sum of multiplications is: ", sumOfMultiplications);

const extractedMultiplicationsWithDosAndDonts = lines
  .map((line) => extractMultiplicationsWithDosAndDonts(line))
  .flat();
const onlyDoMultiplications = extractOnlyDoMultiplications(
  extractedMultiplicationsWithDosAndDonts
);
const multiplicationsV2 = onlyDoMultiplications.map((mulString) =>
  doMultiplication(mulString)
);
const sumOfMultiplicationsV2 = multiplicationsV2.reduce(
  (sum, current) => sum + current
);
console.log("03-2: sum of multiplications is: ", sumOfMultiplicationsV2);
