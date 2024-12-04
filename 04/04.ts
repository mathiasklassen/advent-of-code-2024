import { readFileSync } from "fs";

const filePath = "./input.txt";

export function readFile(): string {
  return readFileSync(filePath, "utf8");
}

export function extractLinesFromInput(input: string): string[] {
  const lines = input.split("\n");
  return lines;
}

export function countXMAS(singleString: string): number {
  const resultForward = singleString.match(/XMAS/g);
  const resultBackward = singleString.match(/SAMX/g);
  return (resultForward?.length ?? 0) + (resultBackward?.length ?? 0);
}

export function reverseString(line: string): string {
  return line.split("").reverse().join("");
}

export function getVerticalLines(horizontalLines: string[]): string[] {
  // precondition: all have the same length horizontal & vertical
  const arrays = horizontalLines.map((line) => line.split(""));
  return arrays[0].map((_element, index) =>
    arrays.map((line) => line[index]).join("")
  );
}

export function getDiagonalLines(
  horizontalLines: string[],
  variant: "BOTTOM_LEFT_TO_TOP_RIGHT" | "TOP_LEFT_TO_BOTTOM_RIGHT"
): string[] {
  // precondition: all have the same length horizontal & vertical

  // idea BOTTOM_LEFT_TO_TOP_RIGHT:
  // ABC
  // DEF
  // GHI
  // const x0 = arrays[0].shift(); => A
  // const x1 = arrays[1].shift() + arrays[0].shift(); => DB
  // const x2 = arrays[2].shift() + arrays[1].shift() + arrays[0].shift; => GEC
  // const x3 = arrays[2].shift() + arrays[1].shift() => HF
  // const x4 = arrays[2].shift() => I

  // idea TOP_LEFT_TO_BOTTOM_RIGHT:
  // reverse all lines and use same algorithm
  // ABC / CBA
  // DEF / FED
  // GHI / IHG
  // const x0 = arrays[0].shift(); => C
  // const x1 = arrays[1].shift() + arrays[0].shift(); => FB
  // const x2 = arrays[2].shift() + arrays[1].shift() + arrays[0].shift; => IEA
  // const x3 = arrays[2].shift() + arrays[1].shift() => HD
  // const x4 = arrays[2].shift() => G
  // reverse result back

  if (variant === "TOP_LEFT_TO_BOTTOM_RIGHT") {
    // reverse all lines
    horizontalLines = horizontalLines.map((line) => reverseString(line));
  }

  const arrays = horizontalLines.map((line) => line.split(""));

  let result: string[] = [];

  for (let verticalI = 0; verticalI < arrays.length; verticalI++) {
    const currentResult: string[] = [];
    for (let iterator = verticalI; iterator >= 0; iterator--) {
      // console.log(verticalI, iterator, arrays[verticalI]);

      if (arrays[verticalI].length === 0) {
        // console.log("empty, break");
        break;
      }

      const currentChar = arrays[iterator].shift() ?? "";
      // console.log("after shift", currentChar, arrays[verticalI]);
      currentResult.push(currentChar);
    }

    // console.log("pushing", currentResult);
    result.push(currentResult.join(""));
  }

  while (arrays[arrays.length - 1].length > 0) {
    const currentResult: string[] = [];
    for (let iterator = arrays.length - 1; iterator >= 0; iterator--) {
      if (arrays[iterator].length === 0) {
        // console.log("empty, continue");
        continue;
      }

      const currentChar = arrays[iterator].shift() ?? "";
      // console.log("after shift 2", currentChar, arrays[iterator]);
      currentResult.push(currentChar);
    }
    // console.log("pushing", currentResult);
    result.push(currentResult.join(""));
  }

  if (variant === "TOP_LEFT_TO_BOTTOM_RIGHT") {
    // reverse all lines
    result = result.map((line) => reverseString(line));
  }

  return result;
}

export function sumArray(numbers: number[]): number {
  return numbers.reduce((sum, current) => sum + current);
}

export function main(input: string): number {
  const horizontalLines = extractLinesFromInput(input);

  const horizontal = horizontalLines.map((line) => countXMAS(line));
  // console.log("horizontal", horizontal);
  const horizontalSum = sumArray(horizontal);
  // console.log("horizontal sum", horizontalSum);

  const vertical = getVerticalLines(horizontalLines).map((line) =>
    countXMAS(line)
  );
  // console.log("vertical", vertical);
  const verticalSum = sumArray(vertical);
  // console.log("vertical sum", verticalSum);

  const diagonal1 = getDiagonalLines(
    horizontalLines,
    "BOTTOM_LEFT_TO_TOP_RIGHT"
  ).map((line) => countXMAS(line));
  // console.log("diagonal1 BOTTOM_LEFT_TO_TOP_RIGHT", diagonal1);
  const diagonal1Sum = sumArray(diagonal1);
  // console.log("diagonal1 sum", diagonal1Sum);

  const diagonal2 = getDiagonalLines(
    horizontalLines,
    "TOP_LEFT_TO_BOTTOM_RIGHT"
  ).map((line) => countXMAS(line));
  // console.log("diagonal2 TOP_LEFT_TO_BOTTOM_RIGHT", diagonal2);
  const diagonal2Sum = sumArray(diagonal2);
  // console.log("diagonal2 sum", diagonal2Sum);

  return horizontalSum + verticalSum + diagonal1Sum + diagonal2Sum;
}

// only A's apart from border
export function findAllRelevantAIndizes(lines: string[]): number[][] {
  const AIndizes: number[][] = lines.map(() => []);
  lines.forEach((line, lineIndex) => {
    if (lineIndex === 0 || lineIndex === lines.length - 1) {
      // remove irrelevant A's on border
      return;
    }

    return line.split("").forEach((char, charIndex) => {
      if (charIndex === 0 || charIndex === line.length - 1) {
        // remove irrelevant A's on border
        return;
      }

      if (char !== "A") {
        return;
      }

      AIndizes[lineIndex].push(charIndex);
    });
  });

  return AIndizes;
}

export function getRelevantTextBeforeAndAfter(
  arrays: string[][],
  AIndex: [number, number]
): { before: [string, string]; after: [string, string] } {
  const beforeLeft = arrays[AIndex[0] - 1][AIndex[1] - 1];
  const beforeRight = arrays[AIndex[0] - 1][AIndex[1] + 1];
  const afterLeft = arrays[AIndex[0] + 1][AIndex[1] - 1];
  const afterRight = arrays[AIndex[0] + 1][AIndex[1] + 1];

  return {
    before: [beforeLeft, beforeRight],
    after: [afterLeft, afterRight],
  };
}

export function countMASv2(
  horizontalLines: string[],
  relevantAIndizes: number[][]
): number {
  const arrays = horizontalLines.map((line) => line.split(""));

  let count = 0;
  relevantAIndizes.forEach((relevantAIndizesLine, rowIndex) =>
    relevantAIndizesLine.forEach((colIndex) => {
      const { before, after } = getRelevantTextBeforeAndAfter(arrays, [
        rowIndex,
        colIndex,
      ]);
      const beforeString = before.join("");
      const afterString = after.join("");
      // console.log([rowIndex, colIndex], beforeString, afterString);
      if (
        // v1
        // M.S
        // .A.
        // M.S
        (beforeString === "MS" && afterString === "MS") ||
        // v2
        // M.M
        // .A.
        // S.S
        (beforeString === "MM" && afterString === "SS") ||
        // v3
        // S.M
        // .A.
        // S.M
        (beforeString === "SM" && afterString === "SM") ||
        // v4
        // S.S
        // .A.
        // M.M
        (beforeString === "SS" && afterString === "MM")
      ) {
        count++;
        return;
      }
    })
  );

  return count;
}

export function mainV2(input: string): number {
  const horizontalLines = extractLinesFromInput(input);
  const relevantAIndizes = findAllRelevantAIndizes(horizontalLines);
  return countMASv2(horizontalLines, relevantAIndizes);
}

const file = readFile();
const result = main(file);

console.log("04-1: count of XMAS is: ", result);

const resultV2 = mainV2(file);
console.log("04-2: count of XMAS is: ", resultV2);
