/*
 * Global variables
 */

const arr = ["fa fa-diamond","fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt","fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const iconsList = arr.concat(arr);
const cardsContainer = document.querySelector (".deck");
const modal = document.querySelector(".modal");

let openedCards = [];
let matchedCards = [];
let firstClick = true;
let currentTimer = 0;
let interval = 0;
let lastUpdateTime = new Date().getTime();
let mins = document.querySelector('span.minutes');
let secs = document.querySelector('span.seconds');
let cents = document.querySelector('span.centiseconds');
let starCount = 3;

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */

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

/*
 * Create cards to start the game
 */

function createCards() {

  const icons = shuffle(iconsList);

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

    // Only the first click calls timer function
    if(firstClick) {
      startTimer();
      firstClick = false;
    }

    //Have existing opened card
    if(openedCards.length === 1) {

      card.classList.add("open", "show", "disable");
      openedCards.push(this);
      console.log(openedCards.length);

      //Compare 2 cards
      compare(currentCard, previousCard);

    } else {

      //Don't have any opened cards
      currentCard.classList.add("open", "show", "disable");
      openedCards.push(this);
      console.log(openedCards.length);
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
       currentCard.classList.remove("open","show", "disable");
       previousCard.classList.remove("open","show", "disable");
     }, 500);

     openedCards = [];
   }

   //Add move
   addMove();
 }

/*
 * Game over function
 */

function gameOver() {
  if(matchedCards.length === iconsList.length) {
    //Delete cards
    cardsContainer.innerHTML = "";

    //Call 'createCards' function to start new game
    createCards();

    modalPop();
  }
}

/*
 * Count moves
 */
 const movesContainer = document.querySelector(".moves");
 let moves = 0;
 movesContainer.innerHTML = 0;
 function addMove() {
   moves++;
   movesContainer.innerHTML = moves;

   //Set the Raiting
   rating();

 }

 /*
 * Game Over Message
 */

 function modalPop() {

   // Display the modal
   modal.style.top = "0";

   // Add moves to the Modal
   const totalMoves = document.querySelector("#totalMoves");
   totalMoves.innerHTML = moves;

   // Add Rate
   const totalRate = document.querySelector("#totalRate");
   totalRate.innerHTML = starsContainer.innerHTML;

   // Stop Timer
   stopTimer();

   // Add time to the Modal
   const totalMinutes = document.querySelector("#totalMinutes");
   const totalSeconds = document.querySelector("#totalSeconds");
   const totalMiliseconds = document.querySelector("#totalMiliseconds");
   totalMinutes.innerHTML = mins.innerHTML;
   totalSeconds.innerHTML = secs.innerHTML;
   totalMiliseconds.innerHTML = cents.innerHTML;
 }

/*
 * Raiting system
 */

 const starsContainer = document.querySelector(".stars");
 const star = `<li><i class="fa fa-star"></i></li>`;
 starsContainer.innerHTML = star + star + star;
 function rating() {

   if( moves < 15) {
     starsContainer.innerHTML = star + star + star;
   } else if( moves < 20) {
     starsContainer.innerHTML = star + star;
   } else {
     starsContainer.innerHTML = star;
   }
 }

/*
 * Timer function
 */

 //Function returns 2 digit, for example: 1 = 01
 function twoDigit (n) {
   return ("00" + n).substr(-2);
 }

 //Updates the time
 function update () {
   let now = new Date().getTime(),

   //Delta time calculates time
   dt = now - lastUpdateTime;
   currentTimer += dt;

   let time = new Date(currentTimer);

   mins.innerHTML = twoDigit(time.getMinutes());
   secs.innerHTML = twoDigit(time.getSeconds());
   cents.innerHTML = twoDigit(Math.floor(time.getMilliseconds() / 10));

   lastUpdateTime = now;
 }

/*
 * Start and reset timer functions
 */

 function startTimer() {
   if (!interval) {
     lastUpdateTime = new Date().getTime();
     interval = setInterval(update, 1);
   }
 }

 function stopTimer() {
   clearInterval(interval);
   interval = 0;
 }

 function resetTimer() {
   stopTimer();
   currentTimer = 0;
   mins.innerHTML = secs.innerHTML = cents.innerHTML = twoDigit(0)
 }

/*
 * Restart the game
 */

 const restartBtn = document.querySelector(".restart");
 restartBtn.addEventListener("click", function() {

   //Delete cards
   cardsContainer.innerHTML = "";

   //Call 'createCards' function to start new game
   createCards();

   //Reset any related variables
   matchedCards = [];
   moves = 0;
   movesContainer.innerHTML = moves;
   starsContainer.innerHTML = star + star + star;
   firstClick = true;
   resetTimer();
   openedCards = [];
 })

/*
 * Restart the game in modal
 */

const restartBtnModal = document.querySelector(".play-again");
restartBtnModal.addEventListener("click", function() {

  // Hide the modal
  modal.style.top = "-200%";

  //Delete cards
  cardsContainer.innerHTML = "";

  //Call 'createCards' function to start new game
  createCards();

  //Reset any related variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = star + star + star;
  firstClick = true;
  resetTimer();
  openedCards = [];
})

/*
 * Create cards to start the game!
 */

createCards();
