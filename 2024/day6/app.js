const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

let currentRow;
let currentCol;
let direction = 0;

// convert input to a grid
let part1 = input
  .split("\n")
  .map((line, i) => 
    line.split('')
    .map((cell, j) => {
      if(cell === '<' || cell === '^' || cell === '>' || cell === 'v') {
        currentRow = i;
        currentCol = j;

        if(cell === '<') {
           direction = 0;
        } else if(cell === '^') {
           direction = 1;
        } else if(cell === '>') {
           direction = 2;
        } else {
           direction = 3;
        }

        return 'X';
      }
      return cell;
    })
  );

  // create guard path until guard is out of map.
let searching = true;
while(searching) {
  let nextRow = currentRow;
  let nextCol = currentCol;

  if(direction === 0) {
    nextCol--;
  } else if(direction === 1) {
    nextRow--;
  } else if(direction === 2) {
    nextCol++;
  } else {
    nextRow++;
  }

  if(!_.checkArrayBounds(part1, nextRow, nextCol)) {
    part1[currentRow][currentCol] = 'X';
    searching = false;
  } else if(part1[nextRow][nextCol] === '#'){
    direction = (direction + 1) % 4;
  } else {
    part1[currentRow][currentCol] = 'X';
    currentRow = nextRow;
    currentCol = nextCol;
  }
}

// count number of spaces guard walked
part1 = part1.reduce((total, row) => total + row.reduce((total2, col) => total2 + (col === 'X' ? 1 : 0), 0), 0)

// console.log(`Part 1: ${part1.map(row => row.join('')).join('\n')}`);

console.log(`Part 1: ${part1}`);

let startingRow;
let startingCol;
let startingDirection = 0;

// convert input to a more modifyable grid with visitedDirections that the guard has been to the cell with
let part2 = input
  .split("\n")
  .map((line, i) => 
    line.split('')
    .map((cell, j) => {
      if(cell === '<' || cell === '^' || cell === '>' || cell === 'v') {
        startingRow = i;
        startingCol = j;

        if(cell === '<') {
          startingDirection = 0;
        } else if(cell === '^') {
          startingDirection = 1;
        } else if(cell === '>') {
          startingDirection = 2;
        } else {
          startingDirection = 3;
        }

        return { visitedDirections: [], text: 'S' };
      }
      return { visitedDirections: [], text: cell };
    })
  );

function searchForLoop(log) {
  let currentRow = startingRow;
  let currentCol = startingCol;
  let direction = startingDirection;
  let response;
  let searching = true;
  // if(log) console.log(part2);
  let iterations = 0;
  while(searching) {
    let nextRow = currentRow;
    let nextCol = currentCol;
  
    if(direction === 0) {
      nextCol--;
    } else if(direction === 1) {
      nextRow--;
    } else if(direction === 2) {
      nextCol++;
    } else {
      nextRow++;
    }
  
    if(log) console.log(currentRow, currentCol, part2[currentRow][currentCol])
    //   if(log) console.log('nextCol')
    //     if(log) console.log('nextRow')
    if(!_.checkArrayBounds(part2, nextRow, nextCol)) {
      if(log) console.log('OOB')
      response = false;
      searching = false;
    } else if (part2[currentRow][currentCol].visitedDirections.includes(direction)) {
      if(log) console.log('Loop')
      if(log) console.log(part2[currentCol][currentRow]);
      response = true;
      searching = false;
    } else if(part2[nextRow][nextCol].text === '#'){
      if(log) console.log('change direction', direction, (direction + 1) % 4)
      direction = (direction + 1) % 4;
    } else {
      if(log) console.log('next Coords', direction, nextRow, nextCol );
      part2[currentRow][currentCol].visitedDirections.push(direction);
      currentRow = nextRow;
      currentCol = nextCol;
    }
  }
  
  return response;
}

// resets grid to original state
function clearGrid() {
  part2 = part2.map(row => row.map(cell => ({visitedDirections: [], text: cell.text})));
  // part2[startingRow][startingCol].visitedDirections = [startingDirection];
}

// count number of loops alowed in the grid.
let loops = 0;
for(let i = 0; i < part2.length; i++) {
  for(let j = 0; j < part2[0].length; j++) {
    if(part2[i][j].text !== '#' && part2[i][j].text !== 'S') {
      part2[i][j].text = '#';
      let log = i === 0 && j === 0;
      if(searchForLoop()) { 
        loops++;
      };
      clearGrid();
      part2[i][j].text = '.';
    }
  }
}

console.log(`Part 2: ${loops}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
