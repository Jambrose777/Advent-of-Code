const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

let maze = input
  .split("\n")
  .map(line => line.split(''));

maze = maze.map(r => r.map(e => ({space: e === '#' ? '#' : '.', visited: false})))
// console.log(maze)

let pathStart = maze[0].map(e => e.space).join("").indexOf(".");
let pathEnd = maze[maze.length - 1].map(e => e.space).join("").indexOf(".");

let graph = [{ name: 'S', row: 0, col: pathStart, neighbors: [] }];
let name = 0;

let paths = [{ row: 0, col: pathStart, fromDir: 'N', pathLength: 0, parent: 'S' }]

// create graph
while(paths.length) {
  let path = paths.splice(0,1)[0];
  let next = [];
  //  check if visited
  if(maze[path.row][path.col].visited) {
    let g = graph.find(node => node.row === path.row && node.col === path.col);
    if(!g) {
      console.log('error, already visted node but not in graph')
    }
    g.neighbors.push({name: path.parent, weight: path.pathLength})
    graph.find(node => node.name === path.parent).neighbors.push({name: g.name, weight: path.pathLength});
  } else if(path.row === maze.length - 1) {
    graph.push({ name: 'E', row: path.row, col: path.col, neighbors: [{ name: path.parent, weight: path.pathLength}] })
    graph.find(node => node.name === path.parent).neighbors.push({name: 'E', weight: path.pathLength});
    maze[path.row][path.col].visited = true;
  } else {
    if(path.fromDir != 'N') {
      if(_.checkArrayBounds(maze, path.row - 1, path.col)) {
        if([".", "^"].includes(maze[path.row - 1][path.col].space)) {
          next.push({row: path.row - 1, col: path.col, fromDir: 'S', pathLength: path.pathLength + 1, parent: path.parent})
        }
      }
    }
    if(path.fromDir != 'S') {
      if(_.checkArrayBounds(maze, path.row + 1, path.col)) {
        if([".", "v"].includes(maze[path.row + 1][path.col].space)) {
          next.push({row: path.row + 1, col: path.col, fromDir: 'N', pathLength: path.pathLength + 1, parent: path.parent})
        }
      }
    }
    if(path.fromDir != 'E') {
      if(_.checkArrayBounds(maze, path.row, path.col + 1)) {
        if([".", ">"].includes(maze[path.row][path.col + 1].space)) {
          next.push({row: path.row, col: path.col + 1, fromDir: 'W', pathLength: path.pathLength + 1, parent: path.parent})
        }
      }
    }
    if(path.fromDir != 'W') {
      if(_.checkArrayBounds(maze, path.row, path.col - 1)) {
        if([".", "<"].includes(maze[path.row][path.col - 1].space)) {
          next.push({row: path.row, col: path.col - 1, fromDir: 'E', pathLength: path.pathLength + 1, parent: path.parent})
        }
      }
    }
    if(next.length === 1) {
      paths = next.concat(paths);
    } else if (next.length > 1) {
      name++;
      graph.push({ name, row: path.row, col: path.col, neighbors: [{ name: path.parent, weight: path.pathLength}] })
      graph.find(node => node.name === path.parent).neighbors.push({name, weight: path.pathLength});
      paths = next.map(n => ({...n, pathLength: 1, parent: name})).concat(paths)
      maze[path.row][path.col].visited = true;
    } else {
      console.log('error: deadend')
    }
  }
}

let final = graph.find(g => g.name === 'E').neighbors[0];

let graphPaths = [{ name: 'S', route: ['S'], pathLength: 0 }]
let maxPathLength = 0;

while(graphPaths.length) {
  let path = graphPaths.splice(0,1)[0];
  if(path.name === final.name) {
    if(path.pathLength > maxPathLength) {
      maxPathLength = path.pathLength
      console.log(maxPathLength + final.weight, path.route)
    }
  } else {
    let g = graph.find(node => node.name === path.name);
    g.neighbors.forEach(neighbor => {
      if(!path.route.includes(neighbor.name)) {
        graphPaths = [{ name: neighbor.name, route: path.route.concat([neighbor.name]), pathLength: path.pathLength + neighbor.weight}].concat(graphPaths);
      }
    })
  }
}

console.log(`Part 2: ${maxPathLength + final.weight}`)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
