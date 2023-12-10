// Card class represents a single card
class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

// Deck class represents the deck of cards
class Deck {
  constructor() {
    this.cards = [];
    const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    const ranks = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];

    // Create a deck of cards by iterating over suits and ranks
    for (let suit of suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  // Shuffle the deck of cards using Fisher-Yates algorithm
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

// Player class represents a player in the game
class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.hand = [];
  }

  // Play a card by removing and returning the last card from the player's hand
  playCard() {
    return this.hand.pop();
  }

  takeCards(cards) {
    this.hand.unshift(...cards);
  }

  // Update the player's score by adding points
  updateScore(points) {
    this.score += points;
  }
}

// Game class manages the overall game logic
class Game {
  constructor() {
    this.deck = new Deck();
    this.player1 = new Player("Player 1");
    this.player2 = new Player("Player 2");
  }

  // Set up the game by shuffling the deck and distributing cards to players
  setup() {
    this.deck.shuffle();
    this.player1.hand = this.deck.cards.slice(0, 26);
    this.player2.hand = this.deck.cards.slice(26);
  }

  // Play the gam
  play() {
    this.setup();

    // Continue playing until a player runs out of cards
    while (this.player1.hand.length > 0) {
      const card1 = this.player1.playCard();
      const card2 = this.player2.playCard();

      // Print the cards played by each player
      console.log(`${this.player1.name}: ${card1.rank} of ${card1.suit}`);
      console.log(`${this.player2.name}: ${card2.rank} of ${card2.suit}`);

      // Compare the ranks of the cards and update scores accordingly
      if (card1.rank === card2.rank) {
        console.log("It's a tie!");
      } else if (this.compareCards(card1, card2)) {
        console.log(`${this.player1.name} wins the round!`);
        this.player1.updateScore(1);
      } else {
        console.log(`${this.player2.name} wins the round!`);
        this.player2.updateScore(1);
      }

      console.log(""); // Add a blank line for readability
    }

    // Display the final score
    this.displayResult();
  }

  // Compare the ranks of two cards and return true if card1 is greater than card2
  compareCards(card1, card2) {
    const ranks = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
    return ranks.indexOf(card1.rank) > ranks.indexOf(card2.rank);
  }

  // Display the scores and declare a winner
  displayResult() {
    console.log(`${this.player1.name}'s score: ${this.player1.score}`);
    console.log(`${this.player2.name}'s score: ${this.player2.score}`);

    if (this.player1.score > this.player2.score) {
      console.log(`${this.player1.name} wins the game!`);
    } else if (this.player1.score < this.player2.score) {
      console.log(`${this.player2.name} wins the game!`);
    } else {
      console.log("It's a tie!");
    }
  }
}

// Run the game
const game = new Game();
game.play();
