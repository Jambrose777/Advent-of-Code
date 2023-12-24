import fs from 'fs';

export function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

let cache = new Map()
export function getCache() {
  return cache;
}

export function useCache(func, args) {
  const key = JSON.stringify(args);
  if(cache.has(key)) {
    return cache.get(key);
  } else {
    const result = func(...args);
    cache.set(key, result)
    return result;
  }
}

export function useCacheWithIndex(func, args) {
  const key = JSON.stringify(args);
  if(cache.has(key)) {
    let index = 0;
    let cacheIndex = -1;
    cache.forEach((cValue, cKey) => {
      if(cKey === key) {
        cacheIndex = index;
      }
      index++;
    })
    return {result: cache.get(key), valueFromCache: true, cacheIndex: cacheIndex};
  } else {
    const result = func(...args);
    cache.set(key, result)
    return {result, valueFromCache: false, cacheIndex: cache.size - 1};
  }
}

export function checkArrayBounds(arr, row, col) {
  if(row >= 0 && col >= 0 && row < arr.length && col < arr[row].length) {
    return true;
  }
  return false;
}

export function transposeMatrix(matrix) {
  return matrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

export function rotateMatrix(matrix, degrees) {
  if(degrees == 90) {
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
  } else if (degrees == -90) {
    return matrix[0].map((val, index) => matrix.map(row => row[row.length-1-index]));
  } else if (degrees == 180) {
    let responseMatrix = matrix.map(row => [...row])
    responseMatrix.reverse().forEach(row => { row.reverse(); } );
    return responseMatrix;
  }
}

export function sum(arr) {
  return arr.reduce((agg, entry) => agg + entry, 0) 
}

export function product(arr) {
  return arr.reduce((agg, entry) => agg * entry, 1) 
}

export function max(arr) {
  return arr.reduce((agg, entry) => agg < entry ? entry : agg, arr[0]) 
}

export function min(arr) {
  return arr.reduce((agg, entry) => agg > entry ? entry : agg, arr[0]) 
}

export function factorial(num) {
  return num * (num > 1 ? factorial(num - 1) : 1)
}

export function power(base, exponent) {
  return base ** exponent
}

export function gcd(a, b) {
  return b == 0 ? a : gcd (b, a % b)
}

export function lcm(a, b) {
  return a / gcd(a, b) * b
}

export function lcmArr(arr) {
  return arr.reduce(lcm, 1)
}

export function range(min, max) {
  return [...Array(max - min + 1)].map((_, i) => min + i)
}

export function manhattanDistance(x1, y1, x2, y2) {
  return Math.abs((x2 - x1)) + Math.abs((y2 - y1));
}

export function combinations(total, chosen) {
  return factorial(total) / (factorial(chosen)*factorial(total - chosen))
}

export function combinationsWithReplacement(total, chosen) {
  return factorial(total + chosen - 1) / (factorial(chosen)*factorial(total - 1))
}

export function permutations(total, chosen) {
  return factorial(total) / factorial(total - chosen)
}

export function permutationsWithReplacement(total, chosen) {
  return total ** chosen;
}

let searchPath = [];
// { label, nextNodes: []{ label } }[]
export function depthFirstSearch(allNodes, startIndex, searchForNode) {
  const nodes = allNodes.map(node => ({...node, checked: false}));
  return dfsCheck(nodes, nodes[startIndex], searchForNode) || searchPath;
}

function dfsCheck(nodes, currentNode, searchForNode) {
  if(currentNode.checked) {
    return false;
  }
  searchPath.push(currentNode.label);
  currentNode.checked = true;
  if(searchForNode === currentNode.label) {
    return searchPath;
  }
  for(let i = 0; i < currentNode.nextNodes.length; i ++) {
    let response = dfsCheck(nodes, nodes.find(n => n.label === currentNode.nextNodes[i].label), searchForNode)
    if(response) {
      return response;
    }
  }
  return false;
}

let nextNodes = [];
// { label, nextNodes: []{ label } }[]
export function breadthFirstSearch(allNodes, startIndex, searchForNode) {
  const nodes = allNodes.map(node => ({...node, checked: false}));
  nextNodes = nextNodes.concat(nodes[startIndex].label)
  while(nextNodes.length) {
    let nextLabel = nextNodes.splice(0, 1)[0];
    let currentNode = nodes.find(n => n.label === nextLabel);
    if(!currentNode.checked) {
      searchPath.push(currentNode.label);
      currentNode.checked = true;
      if(searchForNode === currentNode.label) {
        return searchPath;
      }
      nextNodes = nextNodes.concat(currentNode.nextNodes.map(n => n.label));
    }
  }
  return searchPath;
}

function primeFactors(n) {
  const factors = [];
  let divisor = 2;

  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}

// dijkstra
// A*
