const start = Date.now();
import * as _ from '../helpers.js'
// const input = _.readFile('./example.txt').trim();
const input = _.readFile('./input.txt').trim();

let grid = input
  .split("\n")
  .map(line => 
    line.split('')
    .map(i => ({space: i, beams: []}))
  );

function checkArr(row, col, dir) {
  if(row >= 0 && col >= 0 && row < grid.length && col < grid[row].length && !grid[row][col].beams.find(b => b === dir)) {
    return true;
  }
  return false;
}

// grid[0][0].beams = ['W'];
let checkSpaces;
function runAlg() {
while(checkSpaces.length) {
  let nextSpace = checkSpaces.splice(0, 1)[0];
  let entry = grid[nextSpace.x][nextSpace.y];
  grid[nextSpace.x][nextSpace.y].beams.push(nextSpace.direction);
  if(entry.space === '.') {
    if(nextSpace.direction === 'N') {
      if(checkArr(nextSpace.x + 1, nextSpace.y, 'N')) {
        checkSpaces.push({x: nextSpace.x + 1, y: nextSpace.y, direction: 'N'})
      }
    } else if(nextSpace.direction === 'S') {
      if(checkArr(nextSpace.x - 1, nextSpace.y, 'S')) {
        checkSpaces.push({x: nextSpace.x - 1, y: nextSpace.y, direction: 'S'})
      }
    } else if(nextSpace.direction === 'E') {
      if(checkArr(nextSpace.x, nextSpace.y - 1, 'E')) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y - 1, direction: 'E'})
      }
    } else if(nextSpace.direction === 'W') {
      if(checkArr(nextSpace.x, nextSpace.y + 1, 'W')) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y + 1, direction: 'W'})
      }
    }
  } else if (entry.space === '\\') {
    if(nextSpace.direction === 'N') {
      if(checkArr(nextSpace.x, nextSpace.y + 1, 'W')) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y + 1, direction: 'W'})
      }
    } else if(nextSpace.direction === 'S') {
      if(checkArr(nextSpace.x, nextSpace.y - 1, 'E')) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y - 1, direction: 'E'})
      }
    } else if(nextSpace.direction === 'E') {
      if(checkArr(nextSpace.x - 1, nextSpace.y, 'S')) {
        checkSpaces.push({x: nextSpace.x - 1, y: nextSpace.y, direction: 'S'})
      }
    } else if(nextSpace.direction === 'W') {
      if(checkArr(nextSpace.x + 1, nextSpace.y, 'N')) {
        checkSpaces.push({x: nextSpace.x + 1, y: nextSpace.y, direction: 'N'})
      }
    }
  } else if (entry.space === '/') {
    if(nextSpace.direction === 'N') {
      if(checkArr(nextSpace.x, nextSpace.y - 1, 'E')) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y - 1, direction: 'E'})
      }
    } else if(nextSpace.direction === 'S') {
      if(checkArr(nextSpace.x, nextSpace.y + 1, 'W')) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y + 1, direction: 'W'})
      }
    } else if(nextSpace.direction === 'E') {
      if(checkArr(nextSpace.x + 1, nextSpace.y, 'N')) {
        checkSpaces.push({x: nextSpace.x + 1, y: nextSpace.y, direction: 'N'})
      }
    } else if(nextSpace.direction === 'W') {
      if(checkArr(nextSpace.x - 1, nextSpace.y, 'S')) {
        checkSpaces.push({x: nextSpace.x - 1, y: nextSpace.y, direction: 'S'})
      }
    }
  } else if (entry.space === '|') {
    if(nextSpace.direction === 'N') {
      if(checkArr(nextSpace.x + 1, nextSpace.y, 'N')) {
        checkSpaces.push({x: nextSpace.x + 1, y: nextSpace.y, direction: 'N'})
      }
    } else if(nextSpace.direction === 'S') {
      if(checkArr(nextSpace.x - 1, nextSpace.y, 'S')) {
        checkSpaces.push({x: nextSpace.x - 1, y: nextSpace.y, direction: 'S'})
      }
    } else if(nextSpace.direction === 'E' || nextSpace.direction === 'W') {
      if(checkArr(nextSpace.x - 1, nextSpace.y, 'S')) {
        checkSpaces.push({x: nextSpace.x - 1, y: nextSpace.y, direction: 'S'})
      }
      if(checkArr(nextSpace.x + 1, nextSpace.y, 'N')) {
        checkSpaces.push({x: nextSpace.x + 1, y: nextSpace.y, direction: 'N'})
      }
    }
  } else if (entry.space === '-') {
    if(nextSpace.direction === 'N' || nextSpace.direction === 'S') {
      if(checkArr(nextSpace.x, nextSpace.y - 1)) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y - 1, direction: 'E'})
      }
      if(checkArr(nextSpace.x, nextSpace.y + 1)) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y + 1, direction: 'W'})
      }
    } else if(nextSpace.direction === 'E') {
      if(checkArr(nextSpace.x, nextSpace.y - 1)) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y - 1, direction: 'E'})
      }
    } else if(nextSpace.direction === 'W') {
      if(checkArr(nextSpace.x, nextSpace.y + 1)) {
        checkSpaces.push({x: nextSpace.x, y: nextSpace.y + 1, direction: 'W'})
      }
    }
  }
}
// console.log(grid.map(r => r.map(e => e.beams.length).join("")).join("\n"))
let res = _.sum(grid.map(r => r.filter(g => g.beams.length > 0).length))
return res;
}

function cleanUp() {
  grid = grid.map(r => r.map(e => ({...e, beams: []})))
}

 let energizes = [];
 for(let i = 0; i < grid.length; i++){
   checkSpaces = [{x: i, y: 0, direction: 'W'}];
   energizes.push(runAlg())
   cleanUp()
   checkSpaces = [{x: i, y: grid[0].length - 1, direction: 'E'}];
   energizes.push(runAlg())
   cleanUp()
 }
 for(let i = 0; i < grid[0].length; i++){
   checkSpaces = [{x: 0, y: i, direction: 'N'}];
   energizes.push(runAlg())
   cleanUp()
   checkSpaces = [{x: grid.length - 1, y: i, direction: 'S'}];
   energizes.push(runAlg())
   cleanUp()
 }

//  console.log(energizes)
console.log(_.max(energizes))
  // console.log(_.sum(results.map(line => _.sum(line))))
  console.log(`Execution time: ${(Date.now() - start) / 1000.0}s`);
