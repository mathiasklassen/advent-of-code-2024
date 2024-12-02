import { deepStrictEqual } from "node:assert";
import { test } from "node:test";
import {
  getAdditionalDampenedSafeValues,
  getArrayCopyWithoutElement,
  getNumberOfSafeLevelLists,
  isSafeLevelList,
  parseInput,
} from "./02.mjs";

test("parseInput", () => {
  const input = `7 6 4 2 1
  1 2 7 8 9
  9 7 6 2 1
  1 3 2 4 5
  8 6 4 4 1
  1 3 6 7 9`;

  const expected = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ];

  const result = parseInput(input);

  deepStrictEqual(result, expected);
});

test("isSafeLevelList", () => {
  const inputs = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ];
  const expected = [true, false, false, false, false, true];

  inputs.forEach((input, index) => {
    const result = isSafeLevelList(input);

    deepStrictEqual(
      result,
      expected[index],
      `input ${input} should be ${expected[index]}`
    );
  });
});

test("getNumberOfSafeLevelLists", () => {
  const input = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ];
  const expected = 2;

  const result = getNumberOfSafeLevelLists(input, false);

  deepStrictEqual(result, expected);
});

test("getArrayCopyWithoutElement", () => {
  const input = [7, 6, 4, 2, 1];

  const expected = [7, 6, 4, 1];

  const result = getArrayCopyWithoutElement(input, 3);

  deepStrictEqual(result, expected);
});

test("getAdditionalDampenedSafeValues", () => {
  const inputs = [
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
  ];
  const expected = [
    [1, 2, 4, 5],
    [8, 6, 4, 1],
  ];

  const result = getAdditionalDampenedSafeValues(inputs);

  deepStrictEqual(result, expected);
});

test("getNumberOfSafeLevelLists with problem dampener", () => {
  const input = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ];
  const expected = 4;

  const result = getNumberOfSafeLevelLists(input, true);

  deepStrictEqual(result, expected);
});
