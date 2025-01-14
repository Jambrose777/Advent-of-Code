const startTime = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./example2.txt').trim();
input = _.readFile('./input.txt').trim();

let start = -1;
let end = -1;

let grid = input
  .split("\n")
  .map((line, i) => 
    line.split('')
    .map((text, j) => {
      if(text === "S") {
        start = { i, j }
      } else if(text === "E") {
        end = { i, j }
      }
      return text;
      // return { text, isWall: text === "#", bestCost: -1, bestPaths: [] };
    })
  );

let nodes = [] 
for(let i = 0; i < grid.length; i++) {
  for(let j = 0; j < grid[0].length; j++) {
    if(grid[i][j] !== "#") {
      let NSEdges = []; 
      let currentCount = 1000;
      let path = [];
      for(let k = i - 1; k > 0; k--) {
        currentCount++;
        path.push({i: k, j});
        if(grid[k][j] === "#") {
          k = 0;
        } else {
          NSEdges.push({ i: k, j, isFromNS: true, weight: currentCount, path: [...path]});
        }
      }
      currentCount = 1000;
      path = [];
      for(let k = i + 1; k < grid.length; k++) {
        currentCount++;
        path.push({i: k, j});
        if(grid[k][j] === "#") {
          k = grid.length;
        } else {
          NSEdges.push({ i: k, j, isFromNS: true, weight: currentCount, path: [...path]});
        }
      }
      nodes.push({i, j, isFromNS: false, edges: NSEdges, bestCost: -1, bestPaths: []});

      let EWEdges = []; 
      currentCount = 1000;
      path = [];
      for(let k = j - 1; k > 0; k--) {
        currentCount++;
        path.push({i, j: k});
        if(grid[i][k] === "#") {
          k = 0;
        } else {
          EWEdges.push({ i, j: k, isFromNS: false, weight: currentCount, path: [...path]});
        }
      }
      currentCount = 1000;
      path = [];
      for(let k = j + 1; k < grid[0].length; k++) {
        currentCount++;
        path.push({i, j: k});
        if(grid[i][k] === "#") {
          k = grid[0].length;
        } else {
          EWEdges.push({ i, j: k, isFromNS: false, weight: currentCount, path: [...path]});
        }
      }
      nodes.push({i, j, isFromNS: true, edges: EWEdges, bestCost: -1, bestPaths: []});
    }
  }
}

// build nodes
//direction is 1 N, 2E, 3S, 4West
let nodesToCheck = [ { i: start.i, j: start.j, isFromNS: true, currentCost: -1000 }, { i: start.i, j: start.j, isFromNS: false, currentCost: 0 }]
while(nodesToCheck.length) {
  let nodeToCheck = nodesToCheck.shift();
  let node = nodes.find(n => n.i === nodeToCheck.i && n.j === nodeToCheck.j && n.isFromNS === nodeToCheck.isFromNS)
  // console.log('next', node.i, node.j, node.isFromNS, node.bestCost, nodeToCheck.currentCost, node.edges.length)
  if(nodeToCheck.currentCost === node.bestCost || (node.i === start.i && node.j === start.j)) { 
    let pushed = false;
    // console.log(node.edges);
    node.edges.forEach(edge => {
      let node2 = nodes.find(n => n.i === edge.i && n.j === edge.j && n.isFromNS === edge.isFromNS);
      // console.log('node2', node2)
      if(node2.bestCost === -1 || node2.bestCost >= nodeToCheck.currentCost + edge.weight) {
        if(node2.bestCost !== nodeToCheck.currentCost + edge.weight) {
          node2.bestPaths = []; // reset
        }
        node2.bestCost = nodeToCheck.currentCost + edge.weight;
        // this doesnt work bc it doesnt count the number of nodes in road
        // doesnt account for T shapedup checking
        // can add path array to all edges, append that
        node2.bestPaths = [...node2.bestPaths, ...node.bestPaths, ...edge.path]; 
        // // remove dups maybe need to do here instead
        // console.log(node2)
        node2.bestPaths = node2.bestPaths.filter((path, index) => node2.bestPaths.findIndex(p => p.i === path.i && p.j === path.j) === index);
        pushed = true;
        nodesToCheck.push({ i: node2.i, j: node2.j, isFromNS: node2.isFromNS, currentCost: nodeToCheck.currentCost + edge.weight });
      }
    });

    if(pushed) {
      // console.log('before', nodesToCheck)
      nodesToCheck = nodesToCheck.sort((a, b) => a.currentCost - b.currentCost);
      // console.log('after', nodesToCheck)
    }
  }
}

let ends = nodes.filter(n => n.i === end.i && n.j === end.j);
console.log(`Part 1: ${_.min(ends.map(n => n.bestCost))}`);

let bestPaths = []; 
let bestCost = ends[0].bestCost;
ends.forEach(e => {
  if(e.bestCost === bestCost){
    bestPaths = [...e.bestPaths, ...bestPaths]
  } else if (e.bestCost < bestCost) {
    bestPaths = e.bestPaths;
  }
})

bestPaths = bestPaths.filter((path, index) => bestPaths.findIndex(p => p.i === path.i && p.j === path.j) === index);
console.log(`Part 2: ${bestPaths.length + 1}`);
console.log(`Execution time: ${(Date.now() - startTime)/1000}s`);
