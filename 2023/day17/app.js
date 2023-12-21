const start = Date.now();
import * as _ from '../helpers.js'
// const input = _.readFile('./example.txt').trim();
const input = _.readFile('./input.txt').trim();

// create nodes with directions for min Distance
let results = input
  .split("\n")
  .map(line => 
    line.split('')
    .map(block => {
      return {
        heatLoss: +block,
        calcMinHeatLoss: {
          fromEast: Math.min(),
          fromWest: Math.min(),
          fromNorth: Math.min(),
          fromSouth: Math.min(),
        },
        visited: {
          fromEast: false,
          fromWest: false,
          fromNorth: false,
          fromSouth: false,
        },
      }
    })
  );

function getHeatLossFromArr(i, j) {
  if(_.checkArrayBounds(results, i , j)) {
    return results[i][j].heatLoss
  } else {
    return 0;
  }
}

// set the starting values for both fromNorth and fromWest to not affect starting direction
results[0][0].calcMinHeatLoss.fromNorth = 0;
results[0][0].calcMinHeatLoss.fromWest = 0;

// list of unvisited node + direction to check next
let unvisited = [
  {i: 0, j:0, d: 'fromNorth'},
  {i: 0, j:0, d: 'fromWest'}
]
while(unvisited.length > 0) {
  // sort unvisited so that we start work on the node with the minimum distance 
  unvisited.sort((a, b) => {
    return results[a.i][a.j].calcMinHeatLoss[a.d] - results[b.i][b.j].calcMinHeatLoss[b.d]
  })

  // take the shortest distance one and use it's values
  let { i, j, d } = unvisited.splice(0, 1)[0] 
  // only do calculations if in bounds and we havent visisted / previously calced that direction
  if(_.checkArrayBounds(results, i , j) && !results[i][j].visited[d]) {
    let set = [
      // Part 1 Set
      // {k: i-1, l:j, calcHeatLoss: getHeatLossFromArr(i-1, j)},
      // {k: i-2, l:j, calcHeatLoss: getHeatLossFromArr(i-1, j) + getHeatLossFromArr(i-2, j)},
      // {k: i-3, l:j, calcHeatLoss: getHeatLossFromArr(i-1, j) + getHeatLossFromArr(i-2, j) + getHeatLossFromArr(i-3, j)},
      // {k: i+1, l:j, calcHeatLoss: getHeatLossFromArr(i+1, j)},
      // {k: i+2, l:j, calcHeatLoss: getHeatLossFromArr(i+1, j) + getHeatLossFromArr(i+2, j)},
      // {k: i+3, l:j, calcHeatLoss: getHeatLossFromArr(i+1, j) + getHeatLossFromArr(i+2, j) + getHeatLossFromArr(i+3, j)},
      // {k: i, l:j+1, calcHeatLoss: getHeatLossFromArr(i, j+1)},
      // {k: i, l:j+2, calcHeatLoss: getHeatLossFromArr(i, j+1) + getHeatLossFromArr(i, j+2)},
      // {k: i, l:j+3, calcHeatLoss: getHeatLossFromArr(i, j+1) + getHeatLossFromArr(i, j+2) + getHeatLossFromArr(i, j+3)},
      // {k: i, l:j-1, calcHeatLoss: getHeatLossFromArr(i, j-1)},
      // {k: i, l:j-2, calcHeatLoss: getHeatLossFromArr(i, j-1) + getHeatLossFromArr(i, j-2)},
      // {k: i, l:j-3, calcHeatLoss: getHeatLossFromArr(i, j-1) + getHeatLossFromArr(i, j-2) + getHeatLossFromArr(i, j-3)},
    ]

    // Part 2 Set
    // Builds for traversal of min 4 max 10 in each direction
    if(d === 'fromEast' || d === 'fromWest') {
      for(let k = i+4; k < _.min([results.length, i+11]); k++) {
        let calcHeatLoss = 0;
        for(let p = i+1; p < k+1; p++) {
          calcHeatLoss+= getHeatLossFromArr(p, j)
        }
        set.push({k, l:j, calcHeatLoss})
      }
  
      // if(i === 4 && j === results[0].length - 4 && d === 'fromWest') {
      //   console.log('going here')
      //   console.log(i - 4)
      //   console.log(_.max([0, i-11]))
      // }
      for(let k = i-4; k > _.max([-1, i-11]); k--) {
        let calcHeatLoss = 0;
        for(let p = i-1; p > k-1; p--) {
          calcHeatLoss+= getHeatLossFromArr(p, j)
        }
        set.push({k, l:j, calcHeatLoss})
      }
    } else {
      for(let l = j+4; l < _.min([results[0].length, j+11]); l++) {
        let calcHeatLoss = 0;
        for(let p = j+1; p < l+1; p++) {
          calcHeatLoss+= getHeatLossFromArr(i, p)
        }
        set.push({k:i, l, calcHeatLoss})
      }
  
      for(let l = j-4; l > _.max([-1, j-11]); l--) {
        let calcHeatLoss = 0;
        for(let p = j-1; p > l-1; p--) {
          calcHeatLoss+= getHeatLossFromArr(i, p)
        }
        set.push({k:i, l, calcHeatLoss})
      }
    }

    // for each path allowed, do calculation
    set.forEach(({k, l, calcHeatLoss}) => {
      if(_.checkArrayBounds(results, k , l)) {
        let heatLoss;
        let optionsNS = [
          results[i][j].calcMinHeatLoss.fromNorth,
          results[i][j].calcMinHeatLoss.fromSouth,
        ]
        let optionsEW = [
          results[i][j].calcMinHeatLoss.fromEast,
          results[i][j].calcMinHeatLoss.fromWest
        ]
        if(i === k && j < l && !results[k][l].visited['fromWest'] && d !== 'fromEast') {
          // going east
          heatLoss = _.min(optionsNS) + calcHeatLoss; 
          if(heatLoss < results[k][l].calcMinHeatLoss.fromWest) {
            results[k][l].calcMinHeatLoss.fromWest = heatLoss;
            unvisited.push({i: k, j: l, d: 'fromWest'})
          }
        } else if(i === k && j > l && !results[k][l].visited['fromEast'] && d !== 'fromWest') {
          // going west
          heatLoss = _.min(optionsNS) + calcHeatLoss;
          if(heatLoss < results[k][l].calcMinHeatLoss.fromEast) {
            results[k][l].calcMinHeatLoss.fromEast = heatLoss;
            unvisited.push({i: k, j: l, d: 'fromEast'})
          }
        } else if(i < k && j === l && !results[k][l].visited['fromNorth'] && d !== 'fromSouth') {
          // going south
          heatLoss = _.min(optionsEW) + calcHeatLoss;
          if(heatLoss < results[k][l].calcMinHeatLoss.fromNorth) {
            results[k][l].calcMinHeatLoss.fromNorth = heatLoss;
            unvisited.push({i: k, j: l, d: 'fromNorth'})
          }
        } else if(i > k && j === l && !results[k][l].visited['fromSouth'] && d !== 'fromNorth') {
          // going north
          heatLoss = _.min(optionsEW) + calcHeatLoss;
          if(heatLoss < results[k][l].calcMinHeatLoss.fromSouth) {
            results[k][l].calcMinHeatLoss.fromSouth = heatLoss;
            unvisited.push({i: k, j: l, d: 'fromSouth'})
          }
        }
      }
    })

    // set visited in that direction to tru to not revisit.
    results[i][j].visited[d] = true
  }
}

let i = 0
let j = results[0].length - 4
i = results.length - 1
j = results[0].length - 1
console.log(results[i][j].calcMinHeatLoss)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
