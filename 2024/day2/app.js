// DOES NOT WORK
// MANUALLY CHECKED (with code identifying) test1 input & index 1 being wrong (basically index 3 can trigger wrong and it really be index 2)

const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();
// input = _.readFile('./test1.txt').trim();

function myFunc(i) {
  return +i;
}

let inputArray = input
  .split("\n")
  .map(line => 
    line.split(' ')
    // .map(i => _.useCache(myFunc, [i]))
    .map(i => myFunc(i))
  );

let part1 = inputArray.filter(report => report.reduce((agg, level, index, array) => {
    if(index === 0 || !agg.isSafe) {
      return agg;
    } else {
      if (index === 1 && (array[index - 1] - level) > 0) {
        agg.isDecresing = true;
      }

      if(agg.isDecresing) {
        if(array[index - 1] - level > 0 && array[index - 1] - level < 4) {
          return agg;
        } else {
          return { isSafe: false };
        }
      } else {
        if(level - array[index - 1] > 0 && level - array[index - 1] < 4) {
          return agg;
        } else {
          return { isSafe: false };
        }
      }
    }
  }, { isSafe: true, isDecresing: false }).isSafe).length;

console.log(`Part 1: ${part1}`);

// Missed checking indx 0 being wrong. So index 0 and 2 have issues....
let part2 = inputArray.filter(report => report.reduce((agg, level, index, array) => {
  // console.log(agg);
  if(index === 0 || !agg.isSafe) {
    return agg;
  } else {
    if (index === 1 && (array[index - 1] - level) > 0) {
      agg.isDecresing = true;
    }
    if(agg.skippedIndex === index - 1 && index === 2) {
      if ((array[index - 2] - level) > 0) {
        agg.isDecresing = true;
      } else {
        agg.isDecresing = false;
      }
    }

    if(agg.isDecresing) {
      if(agg.skippedIndex === index - 1) {
        if(array[index - 2] - level > 0 && array[index - 2] - level < 4) {
          return agg;
        } else {
          return { isSafe: false };
        }
      } else if(array[index - 1] - level > 0 && array[index - 1] - level < 4) {
        return agg;
      } else {
        if (agg.hasUsedSkip) {
          return { isSafe: false };
        } else {
          if (index === 2) {
            // console.log(array.join(" "));
            // return { isSafe: agg.isSafe, isDecresing: agg.isDecresing, hasUsedSkip: true, skippedIndex: index - 1 }
          }
          return { isSafe: agg.isSafe, isDecresing: agg.isDecresing, hasUsedSkip: true, skippedIndex: index }
        }
      }
    } else {
      if(agg.skippedIndex === index - 1) {
        if(level - array[index - 2] > 0 && level - array[index - 2] < 4) {
          return agg;
        } else {
          return { isSafe: false };
        }
      } else if(level - array[index - 1] > 0 && level - array[index - 1] < 4) {
        return agg;
      } else {
        if (agg.hasUsedSkip) {
          return { isSafe: false };
        } else {
          if (index === 2) {
            // console.log(array.join(" "));
            // return { isSafe: agg.isSafe, isDecresing: agg.isDecresing, hasUsedSkip: true, skippedIndex: index - 1 }
          }
          return { isSafe: agg.isSafe, isDecresing: agg.isDecresing, hasUsedSkip: true, skippedIndex: index }
        }
      }
    }
  }
}, { isSafe: true, isDecresing: false, hasUsedSkip: false, skippedIndex: -100 }).isSafe).map(arr => arr.toString());


console.log(`Part 2: ${part2.length}`)
// console.log(_.sum(results.map(line => _.sum(line))))
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
