const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./example2.txt').trim();
input = _.readFile('./input.txt').trim();

let cache = new Map()

// cache with count added
function useCache(func, args, count) {
  const key = JSON.stringify(args);
  if(cache.has(key)) {
    let newItem = cache.get(key);
    newItem.nextCount += count;
    return newItem;
  } else {
    const result = func(...args, count);
    cache.set(key, result)
    return result;
  }
}

// use input to create first cache entries
input
  .split(" ")
  .forEach(stone => {
    useCache(findNextStones, [+stone], 1);
   });

// reset initial counts
for (let [key, stone] of cache) {
  stone.currentCount = stone.nextCount;
  stone.nextCount = 0;
}

// preforms iteration on cache
function blink2() {
  for (let [key, stone] of cache) {
    if(stone.currentCount > 0) {
      stone.nextStones.forEach(nStone => {
        useCache(findNextStones, [nStone], stone.currentCount);
      });
    }
  }
  for (let [key, stone] of cache) {
    stone.currentCount = stone.nextCount;
    stone.nextCount = 0;
  }
}

// finds next stone based on specified rules.
function findNextStones(stone, count) {
  let nextStones = [];
  if(stone === 0) {
    nextStones.push(1);
  } else if (("" + stone).length % 2 === 0) {
    nextStones.push(+("" + stone).substring(0, ("" + stone).length / 2));
    nextStones.push(+("" + stone).substring(("" + stone).length / 2));
  } else {
    nextStones.push(stone * 2024)
  }
  return { currentCount: 0, nextCount: count, nextStones: nextStones };
}

// blink 25 times
for(let i = 0; i < 25; i++) {
  blink2();
}

let part1 = 0;
for (let [key, stone] of cache) {
  part1 += stone.currentCount;
}

console.log(`Part 1: ${part1}`);

// part2 blink 75 times
for(let i = 0; i < 50; i++) {
  blink2();
}

let part2 = 0;
for (let [key, stone] of cache) {
  part2 += stone.currentCount;
}

console.log(`Part 2: ${part2}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
