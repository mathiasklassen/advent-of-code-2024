import { deepStrictEqual } from "node:assert";
import { test } from "node:test";
import {
  extractLinesFromInput,
  fixIncorrectUpdate,
  getMiddleNumber,
  main,
  mainV2,
  parseOrderingRules,
  parseUpdates,
  splitOrderingFromPageUpdates,
  switchItems,
  updateOrderIsCorrect,
  updateToMap,
} from "./05.ts";

test("extractLinesFromInput ordering", () => {
  const input = `97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`;

  const expected = [
    "97|13",
    "97|61",
    "97|47",
    "75|29",
    "61|13",
    "75|53",
    "29|13",
    "97|29",
    "53|29",
    "61|53",
    "97|53",
    "61|29",
    "47|13",
    "75|47",
    "97|75",
    "47|61",
    "75|61",
    "47|29",
    "75|13",
    "53|13",
  ];

  const result = extractLinesFromInput(input);

  deepStrictEqual(result, expected);
});

test("extractLinesFromInput pages", () => {
  const input = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

  const expected = [
    "75,47,61,53,29",
    "97,61,53,29,13",
    "75,29,13",
    "75,97,47,61,53",
    "61,13,29",
    "97,13,75,29,47",
  ];

  const result = extractLinesFromInput(input);

  deepStrictEqual(result, expected);
});

test("splitOrderingFromPageUpdates", () => {
  const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

  const expected = [
    `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`,
    `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
  ];

  const result = splitOrderingFromPageUpdates(input);

  deepStrictEqual(result, expected);
});

test("parseOrderingRules", () => {
  const input = `47|53
97|13
97|61
97|47`;

  const expected = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
  ];

  const result = parseOrderingRules(input);

  deepStrictEqual(result, expected);
});

test("parseUpdates", () => {
  const input = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

  const expected = [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
    [75, 29, 13],
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47],
  ];

  const result = parseUpdates(input);

  deepStrictEqual(result, expected);
});

test("updateToMap", () => {
  const input = [75, 47, 61, 53, 29];

  const expected = new Map();
  expected.set(75, 0);
  expected.set(47, 1);
  expected.set(61, 2);
  expected.set(53, 3);
  expected.set(29, 4);

  const result = updateToMap(input);

  deepStrictEqual(result, expected);
});

test("getMiddleNumber", () => {
  const input = [75, 47, 61, 53, 29];

  const expected = 61;

  const result = getMiddleNumber(input);

  deepStrictEqual(result, expected);
});

test("updateOrderIsCorrect", () => {
  const inputs = [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
    [75, 29, 13],
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47],
  ];

  const orderingRules: [number, number][] = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13],
  ];

  const expected = [true, true, true, false, false, false];

  const result = inputs.map((input) =>
    updateOrderIsCorrect(input, orderingRules)
  );

  deepStrictEqual(result, expected);
});

test("main", () => {
  const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

  const expected = 143;

  const result = main(input);

  deepStrictEqual(result, expected);
});

test("switchItems", () => {
  const input = [75, 97, 47, 61, 53];
  const firstIndex = 1;
  const secondIndex = 2;

  const expected = [75, 47, 97, 61, 53];

  const result = switchItems(input, firstIndex, secondIndex);

  deepStrictEqual(result, expected);
});

test("fixIncorrectUpdate", () => {
  const inputs = [
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47],
  ];

  const orderingRules: [number, number][] = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13],
  ];

  const expected = [
    [97, 75, 47, 61, 53],
    [61, 29, 13],
    [97, 75, 47, 29, 13],
  ];

  const result = inputs.map((input) =>
    fixIncorrectUpdate(input, orderingRules)
  );

  deepStrictEqual(result, expected);
});

test("mainV2", () => {
  const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

  const expected = 123;

  const result = mainV2(input);

  deepStrictEqual(result, expected);
});
