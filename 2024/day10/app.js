const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
// input = _.readFile('./test.txt').trim();
input = _.readFile('./input.txt').trim();

function myFunc(i) {
  return +i;
}

let map = input
  .split("\n")
  .map(line => 
    line.split('')
    .map(i => myFunc(i))
    .map(i => ({ height: i , reachablePeaks: [], numReachablePeaks: 0}))
  );

//find trailHeads
let trailHeads = []; 
for(let i = 0; i < map.length; i++) {
  for(let j = 0; j < map[0].length; j++) {
    if(map[i][j].height === 0) {
      trailHeads.push({ i, j })
    }
  }
}

// find peaks
trailHeads.forEach(trailHead => {
  findPeak(trailHead.i, trailHead.j);
});

function findPeak(i, j) {
  // console.log(i, j, map[i][j])
  let reachablePeaks = [];
  let numReachablePeaks = 0;

  // base cases for if peaks have already been found for location & when at the peak
  if(map[i][j].reachablePeaks.length > 0) {
    return;
  } else if(map[i][j].height === 9) {
    map[i][j].reachablePeaks = [{ i, j }];
    map[i][j].numReachablePeaks = 1;
    return;
  } 

  // iterable for finding downstream peaks
  if(_.checkArrayBounds(map, i - 1, j) && map[i - 1][j].height === map[i][j].height + 1) {
    findPeak(i - 1, j);
    reachablePeaks.push(...map[i - 1][j].reachablePeaks);
    numReachablePeaks += map[i - 1][j].numReachablePeaks;
  }
  if(_.checkArrayBounds(map, i + 1, j) && map[i + 1][j].height === map[i][j].height + 1) {
    findPeak(i + 1, j);
    reachablePeaks.push(...map[i + 1][j].reachablePeaks);
    numReachablePeaks += map[i + 1][j].numReachablePeaks;
  }
  if(_.checkArrayBounds(map, i, j + 1) && map[i][j + 1].height === map[i][j].height + 1) {
    findPeak(i, j + 1);
    reachablePeaks.push(...map[i][j + 1].reachablePeaks);
    numReachablePeaks += map[i][j + 1].numReachablePeaks;
  }
  if(_.checkArrayBounds(map, i, j - 1) && map[i][j - 1].height === map[i][j].height + 1) {
    findPeak(i, j - 1);
    reachablePeaks.push(...map[i][j - 1].reachablePeaks);
    numReachablePeaks += map[i][j - 1].numReachablePeaks;
  }

  // remove dups
  reachablePeaks = reachablePeaks.filter((peak, index) => reachablePeaks.findIndex(p => p.i === peak.i && p.j === peak.j) === index);
  
  // set new reachable peaks
  map[i][j].reachablePeaks = reachablePeaks;
  map[i][j].numReachablePeaks = numReachablePeaks;
}

// collect sum
let part1 = trailHeads.map(trailhead => map[trailhead.i][trailhead.j].reachablePeaks.length);

console.log(`Part 1: ${_.sum(part1)}`);

let part2 = trailHeads.map(trailhead => map[trailhead.i][trailhead.j].numReachablePeaks);

console.log(`Part 2: ${_.sum(part2)}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
