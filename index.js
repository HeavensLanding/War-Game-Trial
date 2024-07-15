// Define the suits and ranks for a standard deck of cards
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// Function to create a deck of cards
function createDeck() {
  let deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit: suit, rank: rank });
    }
  }
  return deck;
}

// Function to shuffle the deck
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Function to deal cards to two players
function dealCards(deck) {
  let player1 = [];
  let player2 = [];
  
  while (deck.length > 0) {
    player1.push(deck.shift());
    player2.push(deck.shift());
  }
  
  return [player1, player2];
}

// Function to compare card ranks
function compareCards(card1, card2) {
  const rank1 = ranks.indexOf(card1.rank);
  const rank2 = ranks.indexOf(card2.rank);
  
  if (rank1 > rank2) {
    return 1;
  } else if (rank1 < rank2) {
    return -1;
  } else {
    return 0;
  }
}

// Function to play a game of War
function playWar() {
  let deck = createDeck();
  shuffle(deck);
  
  let [player1, player2] = dealCards(deck);
  
  while (player1.length > 0 && player2.length > 0) {
    let card1 = player1.shift();
    let card2 = player2.shift();
    
    let result = compareCards(card1, card2);
    
    if (result === 1) {
      player1.push(card1, card2); // player1 wins this round
    } else if (result === -1) {
      player2.push(card1, card2); // player2 wins this round
    } else {
      // In case of a tie, continue drawing cards (war)
      let warCards = [card1, card2];
      while (result === 0 && player1.length > 0 && player2.length > 0) {
        warCards.push(player1.shift(), player2.shift());
        card1 = player1.shift();
        card2 = player2.shift();
        result = compareCards(card1, card2);
      }
      
      if (result === 1) {
        player1.push(...warCards); // player1 wins the war
      } else {
        player2.push(...warCards); // player2 wins the war
      }
    }
  }
  
  if (player1.length > player2.length) {
    console.log("Player 1 wins!");
  } else {
    console.log("Player 2 wins!");
  }
}

// Example usage:
playWar();