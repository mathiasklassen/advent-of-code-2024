import { readFileSync } from "fs";

export function parseFile(filePath) {
  const fileContent = readFileSync(filePath, "utf8");

  const list1 = [];
  const list2 = [];

  const lines = fileContent.split("\n");
  lines.forEach((line) => {
    const [value1, value2] = line.trim().split(/\s+/);

    if (value1 && value2) {
      list1.push(parseInt(value1));
      list2.push(parseInt(value2));
    }
  });

  return { list1, list2 };
}

export function sortList(list) {
  return [...list.sort((a, b) => a - b)];
}

export function distance(list1, list2) {
  const list1Sorted = sortList(list1);
  const list2Sorted = sortList(list2);

  let result = 0;
  for (let i = 0; i < list1Sorted.length; i++) {
    const difference = list1Sorted[i] - list2Sorted[i];
    result += difference >= 0 ? difference : difference * -1;
  }

  return result;
}

export function similarity(list1, list2) {
  const map = new Map();
  const list2Sorted = sortList(list2);
  list2Sorted.forEach((value) => {
    const currentValue = map.get(value) ?? 0;
    map.set(value, currentValue + value);
  });

  let result = 0;
  for (let i = 0; i < list1.length; i++) {
    const currentLeft = list1[i];
    result += map.get(currentLeft) ?? 0;
  }
  return result;
}

const filePath = "./input.txt";
const { list1, list2 } = parseFile(filePath);
console.log("01-1 distance is: " + distance(list1, list2));
console.log("01-2 similarity is: " + similarity(list1, list2));
