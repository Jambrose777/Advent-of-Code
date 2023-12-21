const start = Date.now();
let input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const cardRank = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
const handRank = ['high', 'one', 'two', 'three', 'full', 'four', 'five'];

let allHands = input.split("\n").map(line => {
  let hand = line.split(" ")[0].split("")
  let bid = +line.split(" ")[1]

  let sortedHand = ([...hand]).sort((a, b) => cardRank.indexOf(b) - cardRank.indexOf(a))
  let rank = "";
  let counts = [];
  let jCounts = 0;
  hand.forEach(card => {
    let foundCard = counts.find(count => count.card === card)
    if(card === 'J') {
      jCounts++;
    } else if (foundCard) {
      foundCard.count++;
    } else {
      counts.push({card, count: 1})
    }
  })
  counts = counts.sort((a, b) => b.count - a.count)

  if(counts.length === 0) {
    rank = "five"
  }else {
  counts[0].count += jCounts;

  if(counts.length === 1) {
    rank = "five"
  } else if (counts.length === 5) {
    rank = "high"
  } else if (counts.length === 4) {
    rank = "one"
  } else if (counts.length === 3) {
    if(counts[0].count === 3) {
      rank = "three"
    } else {
      rank = "two"
    }
  } else if (counts[0].count === 4) {
    rank = "four"
  } else {
    rank = "full"
  }
}

// Hands don't need to be sorted for this problem, however that's dumb.
  // sortedHand = sortedHand.sort((a, b) => {
  //   let aCount = counts.find(c => c.card === a)
  //   let bCount = counts.find(c => c.card === b)

  //   if(!aCount ||)
  //   if(aCount.count === bCount.count) {
  //     return cardRank.indexOf(bCount.card) - cardRank.indexOf(aCount.card)
  //   } else {
  //     return bCount.count - aCount.count
  //   }
  // })

  return { hand, bid, rank, counts, sortedHand }
})

allHands = allHands.sort((a, b) => {
  if(handRank.indexOf(a.rank) === handRank.indexOf(b.rank)) {
    for(let i = 0; i < 5; i++) {
      if(cardRank.indexOf(a.hand[i]) !== cardRank.indexOf(b.hand[i])) {
        return  cardRank.indexOf(a.hand[i]) - cardRank.indexOf(b.hand[i])
      }
    }
  } else {
    return handRank.indexOf(a.rank) - handRank.indexOf(b.rank)
  }
})

let response = allHands.reduce((agg, hand, index) => agg + hand.bid * (index+1), 0)

console.log(response)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
