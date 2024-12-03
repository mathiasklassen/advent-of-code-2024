import { deepStrictEqual } from "node:assert";
import { test } from "node:test";
import {
  doMultiplication,
  extractMultiplications,
  extractMultiplicationsWithDosAndDonts,
  extractOnlyDoMultiplications,
} from "./03.mjs";

test("extractMultiplications", () => {
  const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

  const expected = ["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"];

  const result = extractMultiplications(input);

  deepStrictEqual(result, expected);
});

test("doMultiplication", () => {
  const input = `mul(8,5)`;

  const expected = 40;

  const result = doMultiplication(input);

  deepStrictEqual(result, expected);
});

test("extractMultiplicationsWithDosAndDonts", () => {
  const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

  const expected = [
    "mul(2,4)",
    "don't()",
    "mul(5,5)",
    "mul(11,8)",
    "do()",
    "mul(8,5)",
  ];

  const result = extractMultiplicationsWithDosAndDonts(input);

  deepStrictEqual(result, expected);
});

test("extractOnlyDoMultiplications", () => {
  const input = [
    "mul(2,4)",
    "don't()",
    "mul(5,5)",
    "mul(11,8)",
    "do()",
    "mul(8,5)",
  ];

  const expected = ["mul(2,4)", "mul(8,5)"];

  const result = extractOnlyDoMultiplications(input);

  deepStrictEqual(result, expected);
});
