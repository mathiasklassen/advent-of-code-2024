import { deepStrictEqual } from "node:assert";
import { test } from "node:test";
import { distance, similarity, sortList } from "./distance.mjs";

test("sortList", () => {
  const input = [46669, 54117, 25659, 18867, 94354];
  const expected = [18867, 25659, 46669, 54117, 94354];

  const result = sortList(input);

  deepStrictEqual(result, expected);
});

test("distance", () => {
  const list1 = [3, 4, 2, 1, 3, 3];
  const list2 = [4, 3, 5, 3, 9, 3];

  const expected = 11;

  const result = distance(list1, list2);

  deepStrictEqual(result, expected);
});

test("similarity", () => {
  const list1 = [3, 4, 2, 1, 3, 3];
  const list2 = [4, 3, 5, 3, 9, 3];

  const expected = 31;

  const result = similarity(list1, list2);

  deepStrictEqual(result, expected);
});
