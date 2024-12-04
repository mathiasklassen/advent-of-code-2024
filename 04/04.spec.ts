import { deepStrictEqual } from "node:assert";
import { test } from "node:test";
import {
  countXMAS,
  extractLinesFromInput,
  findAllRelevantAIndizes,
  getDiagonalLines,
  getRelevantTextBeforeAndAfter,
  getVerticalLines,
  main,
  mainV2,
  reverseString,
  sumArray,
} from "./04.ts";

test("extractLinesFromInput", () => {
  const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

  const expected = [
    "MMMSXXMASM",
    "MSAMXMSMSA",
    "AMXSXMAAMM",
    "MSAMASMSMX",
    "XMASAMXAMM",
    "XXAMMXXAMA",
    "SMSMSASXSS",
    "SAXAMASAAA",
    "MAMMMXMMMM",
    "MXMXAXMASX",
  ];

  const result = extractLinesFromInput(input);

  deepStrictEqual(result, expected);
});

test("countXMAS", () => {
  const input = "XMAXMASXMXMASXMASMXMASMAXMASAMX";

  const expected = 6;

  const result = countXMAS(input);

  deepStrictEqual(result, expected);
});

test("sumArray", () => {
  const input = [1, 2, 3];

  const expected = 6;

  const result = sumArray(input);

  deepStrictEqual(result, expected);
});

test("reverseString", () => {
  const input = "XMAS";

  const expected = "SAMX";

  const result = reverseString(input);

  deepStrictEqual(result, expected);
});

test("getVerticalLines", () => {
  // prettier-ignore
  const input = [
    "XMAS", 
    "XMAS", 
    "XMAS", 
    "XMAS"
  ];

  const expected = ["XXXX", "MMMM", "AAAA", "SSSS"];

  const result = getVerticalLines(input);

  deepStrictEqual(result, expected);
});

test("getDiagonalLines BOTTOM_LEFT_TO_TOP_RIGHT", () => {
  // prettier-ignore
  const input = [
    "MASX", 
    "ASXM", 
    "SXMA", 
    "XMAS"
  ];

  const expected = ["M", "AA", "SSS", "XXXX", "MMM", "AA", "S"];

  const result = getDiagonalLines(input, "BOTTOM_LEFT_TO_TOP_RIGHT");

  deepStrictEqual(result, expected);
});

test("getDiagonalLines TOP_LEFT_TO_BOTTOM_RIGHT", () => {
  // prettier-ignore
  const input = [
    "XMAS", 
    "SXMA", 
    "ASXM", 
    "MASX"
  ];

  const expected = ["S", "AA", "MMM", "XXXX", "SSS", "AA", "M"];

  const result = getDiagonalLines(input, "TOP_LEFT_TO_BOTTOM_RIGHT");

  deepStrictEqual(result, expected);
});

test("main", () => {
  const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

  const expected = 18;

  const result = main(input);

  deepStrictEqual(result, expected);
});

test("findAllRelevantAIndizes", () => {
  const input = [
    "MMMSXXMASM",
    "MSAMXMSMSA",
    "AMXSXMAAMM",
    "MSAMASMSMX",
    "XMASAMXAMM",
    "XMASAMXAMM",
  ];

  const expected = [[], [2], [6, 7], [2, 4], [2, 4, 7], []];

  const result = findAllRelevantAIndizes(input);

  deepStrictEqual(result, expected);
});

test("getRelevantTextBeforeAndAfter", () => {
  const input = [
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", "M", ".", "S", "."],
    [".", ".", "A", ".", "."],
    [".", "S", ".", "M", "."],
    [".", ".", ".", ".", "."],
  ];
  const relevantAIndex: [number, number] = [3, 2];

  const expected = {
    before: ["M", "S"],
    after: ["S", "M"],
  };

  const result = getRelevantTextBeforeAndAfter(input, relevantAIndex);

  deepStrictEqual(result, expected);
});

test("mainV2", () => {
  const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

  const expected = 9;

  const result = mainV2(input);

  deepStrictEqual(result, expected);
});
