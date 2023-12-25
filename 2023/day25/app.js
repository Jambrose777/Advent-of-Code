const start = Date.now();
import { isBuffer } from 'util';
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
// input = _.readFile('./input.txt').trim();

let graph = {
  verticies: [],
  edges: []
}

input
  .split("\n")
  .forEach(line => {
    if(!graph.verticies.includes(line.split(': ')[0])) {
      graph.verticies.push(line.split(': ')[0])
    }
    line.split(": ")[1].split(" ").forEach(node => {
      if(!graph.verticies.find(v => v == node)) {
        graph.verticies.push(node)
      }
      graph.edges.push({a: line.split(': ')[0], b: node})
    })
  }
);
console.log(graph)

function getMinCut(g) {
  let originalGraph = {verticies: [...g.verticies], edges: [...g.edges]}
  let currentPartition = []
  let currentBestPartition;
  let currentBestCut;
  while(g.verticies.length > 1) {
    console.log('g verticies', g.verticies.length)
    let cutOfThePhase = maximumAdjacencySearch(g, undefined)
    // console.log('cut', cutOfThePhase)
    if(currentBestCut)
      console.log('cutOfThePhase.w', cutOfThePhase.w, currentBestCut.w)
    if(!currentBestCut || cutOfThePhase.w < currentBestCut.w) {
      currentBestCut = cutOfThePhase;
      currentBestPartition = [...currentPartition];
      currentBestPartition.push(cutOfThePhase.t)
    }
    currentPartition.push(cutOfThePhase.t)
    g = mergeVerticiesFromCut(g, cutOfThePhase);
  }

  return constructMinCutResult(originalGraph, currentBestPartition)
}

function maximumAdjacencySearch(g, start) {
  if(!start) {
    start = g.verticies[0]
  }
  let maxAdjacencyOrderedList = [start]
  let cutWeight = []
  let candidates = [...g.verticies]
  candidates = candidates.filter(c => c !== start);

  while(candidates.length) {
    // console.log('candidates', candidates.length)
    let maxNextVertex = null;
    let maxWeight = Math.max()
    for (let i = 0; i < candidates.length; i++) {
      let next = candidates[i]
      let weightSum = 0;
      for(let j = 0; j < maxAdjacencyOrderedList.length; j++) {
        let s = maxAdjacencyOrderedList[j]
        let edge =  hasEdge(g, next, s)
        if(edge) {
          weightSum++;
        }
      }

      if(weightSum > maxWeight) {
        maxNextVertex = next
        maxWeight = weightSum
      }
    }
    
    // console.log(maxNextVertex)
    candidates = candidates.filter(c => c !== maxNextVertex)
    maxAdjacencyOrderedList.push(maxNextVertex)
    console.log('maxWeight', maxWeight)
    cutWeight.push(maxWeight)
  }

  let n = maxAdjacencyOrderedList.length
  return {
    s: maxAdjacencyOrderedList[n - 2],
    t: maxAdjacencyOrderedList[n - 1],
    w: cutWeight[cutWeight.length - 1]
  }
}

function  hasEdge(g, a, b) {
  if(g.edges.find(e => (e.a == a && e.b == b) || (e.a == b && e.b == a))) {
    return true;
  }
  return false
}

function mergeVerticiesFromCut(g, cutOfThePhase) {
  let toReturn = {
    verticies: [],
    edges: []
  }

  g.verticies.forEach(v => {
    let isS =  cutOfThePhase.s === v;
    let isT =  cutOfThePhase.t === v;
    if(!isS && !isT) {
      toReturn.verticies.push(v)
      edgesOfVertex(g, v).forEach(e => {
        if(e != cutOfThePhase.s && e != cutOfThePhase.t) {
          toReturn.edges.push({a: v, b: e})
        }
      })
    }

    if(isS) {
      toReturn.verticies.push(v)
      edgesOfVertex(g, v).forEach(e => {
        if(!e == cutOfThePhase.t) {
          toReturn.edges.push({a: v, b: e})
          // let mergableEdge =  hasEdge(g, cutOfThePhase.t, e)
          // if(mergableEdge) {
          // } else {
          //   toReturn.push(v, e)
          // }
        }
      })
    }
  })

  edgesOfVertex(g, cutOfThePhase.t).forEach(e => {
    if(e != cutOfThePhase.s) {
      let transferEdge = hasEdge(g, cutOfThePhase.s, e)
      if(!transferEdge) {
        toReturn.edges.push({a: cutOfThePhase.s, b: e})
      }
    }
  })

  return toReturn
}

function edgesOfVertex(g, v) {
  return g.edges.filter(e => (e.a == v || e.b == v)).map(e => e.a === v ? e.b : e.a)
}

function constructMinCutResult(originalGraph, partition) {
  let first = {
    verticies: [],
    edges: []
  }
  let second = {
    verticies: [],
    edges: []
  }
  let cuttingEdges = []
  // let cutWeight = 0;

  originalGraph.verticies.forEach(v => {
    if(partition.includes(v)) {
      first.verticies.push(v)
    } else {
      second.verticies.push(v)
    }
  })

  // let edgeSet = [];
  originalGraph.verticies.forEach(v => {
    let edges = edgesOfVertex(originalGraph, v)
    edges.forEach(e => {
      if(first.verticies.includes(v) && first.verticies.includes(e)) {
        first.edges.push({a: v, b: e})
      } else if (second.verticies.includes(v) && second.verticies.includes(e)) {
        second.edges.push({a: v, b: e})
      } else {
        cuttingEdges.push({a: v, b: e})
        // if()
        // cutWeight++;
      }
    })
  })

  return {
    first,
    second,
    cuttingEdges
  }
}

let part1 = getMinCut(graph);

console.log(part1.first.length * part1.second.length)

// console.log(`Part 1: ${part1}`)
// console.log(`Part 2: ${part2}`)
// console.log(_.sum(results.map(line => _.sum(line))))
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
