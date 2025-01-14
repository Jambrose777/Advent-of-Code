const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

function myFunc(i) {
  return +i;
}

let parts = input
  .split("\n\n");

let pageRuleInstructions = 
  parts[0]
  .split("\n")
  .map(line => 
    line.split('|')
    // .map(i => _.useCache(myFunc, [i]))
    .map(i => myFunc(i))
  );

let pageUpdates = 
  parts[1]
  .split("\n")
  .map(line => 
    line.split(',')
    // .map(i => _.useCache(myFunc, [i]))
    .map(i => myFunc(i))
  );

let pageRules = [];

for (let i = 0; i <= 99; i++) {
  pageRules.push({page: i, comesBefore: []});
}

pageRuleInstructions.forEach(instruction => {
  pageRules[instruction[0]].comesBefore.push(instruction[1]);
});

let part1 = pageUpdates.filter(pages => {
  let isCorrectOrder = true;
  pages.forEach((page, index) => {
    if (pageRules[page].comesBefore.length > 0) {
      for(let i = 0; i < index; i++) {
        if(pageRules[page].comesBefore.includes(pages[i])) {
          isCorrectOrder = false;
        }
      }
    }
  });
  return isCorrectOrder;
}).map(pages => pages[pages.length / 2 - .5]);


console.log(`Part 1: ${_.sum(part1)}`);

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

let part2 = pageUpdates.filter(pages => {
  let isCorrectOrder = true;
  pages.forEach((page, index) => {
    if (pageRules[page].comesBefore.length > 0) {
      for(let i = 0; i < index; i++) {
        if(pageRules[page].comesBefore.includes(pages[i])) {
          isCorrectOrder = false;
        }
      }
    }
  });
  return !isCorrectOrder; // swap this
})
.map(pages => {
  let correctOrder = pages;
  for(let pageIndex = 0; pageIndex < pages.length; pageIndex++){
    for(let i = 0; i < pageIndex; i++) {
      if(pageRules[pages[pageIndex]].comesBefore.includes(pages[i])) {
        correctOrder = array_move(pages, pageIndex, i);
        pageIndex = i;
      }
    }
  }
  return correctOrder;
})
.map(pages => pages[pages.length / 2 - .5]);

console.log(`Part 2: ${_.sum(part2)}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
