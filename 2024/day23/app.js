const startTime = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

let nodes = [];
input
  .split("\n")
  .forEach(line => {
    let connection = line.split("-")
    let node1 = nodes.find(n => n.id === connection[0]);
    if(!!node1) {
      node1.edges.push(connection[1]);
    } else {
      nodes.push({id: connection[0], edges: [connection[1]]})
    }
    let node2 = nodes.find(n => n.id === connection[1]);
    if(!!node2) {
      node2.edges.push(connection[0]);
    } else {
      nodes.push({id: connection[1], edges: [connection[0]]})
    }
  });

let tripleConnections = nodes
  .filter(n => n.id.substring(0,1) === 't')
  .reduce((all, n) => {
    let connections = [];
    n.edges.forEach(e => {
      nodes.find(n2 => n2.id === e).edges.forEach(e2 => {
        if(nodes.find(n3 => n3.id === e2).edges.includes(n.id)) {
          connections.push([n.id, e, e2].sort().join(","));
          // console.log(n.id, e, e2)
        }
      });
    })
    return [...all, ...connections];
  }, [])
  // remove dups
  tripleConnections = tripleConnections.filter((con, index) => tripleConnections.findIndex(c => c === con) === index);

  // console.log(tripleConnections)
console.log(`Part 1: ${tripleConnections.length}`);

let part2 = [];

// R is current clique / group
// P is candidate set / remaining verticies that can be added
// X is exclusion set / verticies that cannot be added
function findAllConnections(R, P, X) {
  if (P.length === 0 && X.length === 0) {
    if (R.length >= 1) {
      part2.push([...R])
    }
    return;
  }

  const pivot = P.concat(X)[0]; // choose pivot from P union X
  const pivotEdges = nodes.find(n => n.id === pivot).edges;

  P.filter(n => !pivotEdges.includes(n)).forEach(node => {
    findAllConnections(
      [...R, node],
      P.filter(n => nodes.find(n => n.id === node).edges.includes(n)),
      X.filter(n => nodes.find(n => n.id === node).edges.includes(n))
    );

    // update P and X for remaining interations as we no longer want to look at connections with that node.
    P = P.filter(n => n !== node);
    X.push(node);
  })
}
findAllConnections([], nodes.map(n => n.id), []);

console.log(`Part 2: ${part2.reduce((max, nc) => nc.length > max.length ? nc : max, []).sort()}`);
console.log(`Execution time: ${(Date.now() - startTime)/1000}s`);
