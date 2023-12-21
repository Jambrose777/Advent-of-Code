const start = Date.now();
let input = `Time:        44707080
Distance:   283113411341491`

let times = input.split('\n')[0].split(':')[1].split(" ").filter(time => time !== '').map(time => +time);
let distances = input.split('\n')[1].split(':')[1].split(" ").filter(time => time !== '').map(time => +time);

let recordBreaks = [];
for(let race = 0; race < times.length; race++) {
  let beatsRecord = 0;
  for(let pushDownTime = 1; pushDownTime < times[race]; pushDownTime++) {
    let remainingTime = times[race] - pushDownTime;
    let distance = remainingTime*pushDownTime;
    if(distance > distances[race]) {
      beatsRecord++;
    }
  } 
  recordBreaks.push(beatsRecord);
}

let result = recordBreaks.reduce((agg, val) => agg*val, 1)

console.log(result)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
