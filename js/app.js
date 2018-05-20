//Create a list that holds all of your cards
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardsContainer = document.querySelector (".deck");

let openedCards = [];
let matchedCards = [];

/*
 * Create cards to start the game
 */

function createCards() {
  for(let i = 0; i < icons.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`
    cardsContainer.appendChild(card);

    //Add click event for each card
    click(card);
  }
}


/*
 * Click event
 */
function click(card) {
  //Card click event
  card.addEventListener("click", function(){

    const currentCard = this;
    const previousCard = openedCards[0];

    //Have existing opened card
    if(openedCards.length === 1) {

      card.classList.add("open", "show");
      openedCards.push(this);

      //Compare 2 cards
      compare(currentCard, previousCard);


    } else {

    //Don't have any opened cards
    currentCard.classList.add("open", "show");
    openedCards.push(this);
  }
});
}

/*
 * Compare cards
 */

 function compare(currentCard, previousCard) {
   if(currentCard.innerHTML === previousCard.innerHTML){

     //Cards matched
     currentCard.classList.add("match");
     previousCard.classList.add("match");

     matchedCards.push(currentCard, previousCard);

     openedCards = [];

     //Check if the game is over
     gameOver();

   } else {

     //Set timeout to see card
     setTimeout(function() {
       currentCard.classList.remove("open","show");
       previousCard.classList.remove("open","show");
       openedCards = [];
     }, 500);

   }
 }

/*
 * Game over function
 */

function gameOver() {
  if(matchedCards.length === icons.length) {
    alert("GAME OVER!");
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create cards to start the game
createCards();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
