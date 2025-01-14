const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
// input = _.readFile('./example2.txt').trim();
// input = _.readFile('./test.txt').trim();
input = _.readFile('./input.txt').trim();

let secretNumbers = input.split("\n").map(sn => ({sn, changes: []}));
let steps = 2000;
let bestBananas = new Map();

// loop through preforming operation 
for(let i = 0; i < steps; i++) {
  secretNumbers = secretNumbers.map((sn, index) => {
    // calculate new secret number
    let newsn = ((sn.sn ^ (sn.sn * 64)) >>> 0) % 16777216;
    newsn = ((newsn ^ Math.floor(newsn / 32)) >>> 0) % 16777216;
    newsn = ((newsn ^ (newsn * 2048)) >>> 0) % 16777216;

    // calculate the change from the last secret number
    let change = (newsn % 10) - (sn.sn % 10);
    // only care about the last 4 changes
    if(sn.changes.length === 4) {
      sn.changes.shift();
    }
    sn.changes.push(change);

    // add change and total bananas to cache for the buyer (index)
    if(sn.changes.length === 4) {
      const key = sn.changes.join(",");
      if(bestBananas.has(key)) {
        let bananas = bestBananas.get(key);
        if(bananas[index] === undefined) {
          bananas[index] = newsn % 10;
          bestBananas.set(key, bananas);
        }
      } else {
        let bananas = {}
        bananas[index] = newsn % 10;
        bestBananas.set(key, bananas);
      }
    }

    return { sn: newsn, changes: sn.changes };
  })
}

// calculate the number of bananas each change sequence would produce
let part2 = [];
bestBananas.forEach((bananas, key) => {
  let sum = 0;
  Object.keys(bananas).forEach(index => {
    sum += bananas[index];
  })
  part2.push(sum);
})

console.log(`Part 1: ${_.sum(secretNumbers.map(sn => sn.sn))}`);
console.log(`Part 2: ${_.max(part2)}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
