const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
// input = _.readFile('./input.txt').trim();

let maze = input
  .split("\n")
  .map(line => line.split(''));

let pathStart = maze[0].join("").indexOf(".");
let pathEnd = maze[maze.length - 1].join("").indexOf(".");

let paths = [{ row: 0, col: pathStart, fromDir: 'N', pathLength: 0 }]
let pathLengths = [];

while(paths.length) {
  let path = paths.splice(0,1)[0];
  if(path.row === maze.length - 1) {
    pathLengths.push(path.pathLength)
  }
  if(path.fromDir != 'N') {
    if(_.checkArrayBounds(maze, path.row - 1, path.col)) {
      if([".", "^"].includes(maze[path.row - 1][path.col])) {
        paths.push({row: path.row - 1, col: path.col, fromDir: 'S', pathLength: path.pathLength + 1})
      }
    }
  }
  if(path.fromDir != 'S') {
    if(_.checkArrayBounds(maze, path.row + 1, path.col)) {
      if([".", "v"].includes(maze[path.row + 1][path.col])) {
        paths.push({row: path.row + 1, col: path.col, fromDir: 'N', pathLength: path.pathLength + 1})
      }
    }
  }
  if(path.fromDir != 'E') {
    if(_.checkArrayBounds(maze, path.row, path.col + 1)) {
      if([".", ">"].includes(maze[path.row][path.col + 1])) {
        paths.push({row: path.row, col: path.col + 1, fromDir: 'W', pathLength: path.pathLength + 1})
      }
    }
  }
  if(path.fromDir != 'W') {
    if(_.checkArrayBounds(maze, path.row, path.col - 1)) {
      if([".", "<"].includes(maze[path.row][path.col - 1])) {
        paths.push({row: path.row, col: path.col - 1, fromDir: 'E', pathLength: path.pathLength + 1})
      }
    }
  }
}

console.log(pathLengths)
console.log(`Part 1: ${_.max(pathLengths)}`)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
