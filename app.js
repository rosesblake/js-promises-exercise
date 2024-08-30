// ## **Part 1: Number Facts**

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the ***json*** query key, specific to this API. [Details](http://numbersapi.com/#json).
// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

//     *(Note: You’ll need to make multiple requests for this.)*
const baseUrl = "http://numbersapi.com";

let facts = [];
for (let i = 0; i < 4; i++) {
  facts.push(axios.get(`${baseUrl}/4`));
}

Promise.all(facts)
  .then((factArr) => factArr.forEach((f) => console.log(f.data)))
  .catch((err) => console.log(err));

//   ## **Part 2: Deck of Cards**

//   1. Make a request to the [Deck of Cards API](http://deckofcardsapi.com/) to request a single card from a newly shuffled deck. Once you have the card, ***console.log*** the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
//   2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.

//       Once you have both cards, ***console.log*** the values and suits of both cards.

//   3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

const cardsUrl = "https://deckofcardsapi.com";

let deckId = null;

// shuffle the deck fnc
function shuffleDeck() {
  return axios
    .get(`${cardsUrl}/api/deck/new/shuffle`)
    .then((res) => {
      deckId = res.data.deck_id;
      console.log(deckId);
    })
    .catch((err) => console.log(err));
}

// draw a card
function drawCard() {
  if (!deckId) {
    console.log("Deck not initialized yet. Please shuffle the deck first.");
    return;
  }

  return axios
    .get(`${cardsUrl}/api/deck/${deckId}/draw`)
    .then((res) => {
      let card = res.data.cards[0];
      return `${card.value} of ${card.suit}`;
    })
    .catch((err) => console.log("Error drawing card:", err));
}

// Get the buttons
let shuffle = document.querySelector("#shuffle");
let draw = document.querySelector("#draw");

// shuffle the deck
shuffle.addEventListener("click", () => {
  shuffleDeck();
  let cardList = document.querySelector(".card-list");
  if (cardList) {
    cardList.remove();
  }
});

// Event listener to draw a card
draw.addEventListener("click", () => {
  drawCard()
    .then((res) => {
      // Check if the card list exists
      let cardList = document.querySelector(".card-list");
      if (!cardList) {
        // Create and append the card list if it doesn't exist
        cardList = document.createElement("ul");
        cardList.classList.add("card-list");
        document.body.append(cardList); // Append to the body or another container
      }

      // Create a new list item for the card and append it to the list
      let newCard = document.createElement("li");
      newCard.innerText = res;
      if (res !== undefined) {
        cardList.append(newCard);
      } else return console.log("no more cards");
    })
    .catch((err) => console.log("Error drawing card:", err));
});

shuffleDeck();
