//my cod for my Memory  Game
let images = [
  "./img/ca1.jpg",
  "./img/ca2.jpg",
  "./img/ca3.jpg",
  "./img/ca4.jpg",
  "./img/ca5.jpg",
  "./img/ca6.jpg",
  "./img/ca7.jpg",
  "./img/ca8.jpg",
  "./img/ca9.jpg",
  "./img/ca10.jpg",
  "./img/ca1.jpg",
  "./img/ca2.jpg",
  "./img/ca3.jpg",
  "./img/ca4.jpg",
  "./img/ca5.jpg",
  "./img/ca6.jpg",
  "./img/ca7.jpg",
  "./img/ca8.jpg",
  "./img/ca9.jpg",
  "./img/ca10.jpg"
];

let card = document.getElementsByClassName("card");
let cards = [[card], [card], [card], [card], [card]];
let pickedCards = [...card];
let stepsCounter = 0;
let matchCounter = 0;

//here my cod suffle the cards
function shuffle() {
  for (let i = 0; i < 100; i++) {
    const x = Math.floor(Math.random() * (images.length - 1));
    const y = Math.floor(Math.random() * (images.length - 1));
    let temp = images[x];
    images[x] = images[y];
    images[y] = temp;
  }
}

//here my cod cate the card in the page, 4 rows and 5 cards in a row also it's crate event lisiner
function initCards() {
  let imageIndex = 0;
  for (let i = 0; i < 4; i++) {
    const element = document.createElement("div");
    element.classList.add("row");
    document.querySelector(".container").appendChild(element);

    for (var j = 0; j < 5; j++) {
      const element = document.createElement("div");
      element.className = `card-${i}-${j}`;
      const elements = document.querySelectorAll(".row");
      const rows = [...elements];
      rows[i].appendChild(element);
      element.style.backgroundImage = `url(${images[imageIndex]})`;
      element.style.position = "relative";
      element.style.backgroundSize = "100%";
      const elementCardCover = document.createElement("div");
      elementCardCover.id = `card-cover-${i}-${j}`;
      elementCardCover.className = `hide`;
      elementCardCover.style.backgroundImage = `url(${"./img/background.jpg"})`;
      elementCardCover.style.width = "100%";
      elementCardCover.style.height = "100%";
      elementCardCover.addEventListener("click", function() {
        pickCard(element);
      });
      element.appendChild(elementCardCover);
      cards[i][j] = element;
      imageIndex++;
    }
  }
}

//here its hide all the img with the same background
function hideAllCards() {
  for (let i = 0; i < 4; i++) {
    for (var j = 0; j < 5; j++) {
      cards[i][j].childNodes[0].classList.remove("hide");
    }
  }
}

//here its hide just the img that piket with the same background
function hidePickedCards() {
  for (let i = 0; i < 4; i++) {
    for (var j = 0; j < 5; j++) {
      if (pickedCards[0] == cards[i][j] || pickedCards[1] == cards[i][j]) {
        cards[i][j].childNodes[0].classList.remove("hide");
      }
    }
  }
}

//here the cod check how many card you pick and if there is match
function pickCard(element) {
  stepsCounter++;

  if (pickedCards.length < 2) {
    showCard(element);
    pickedCards[pickedCards.length] = element;
  }

  if (pickedCards.length == 2) {
    disableClick();
    let isMatch = false;
    if (
      pickedCards[0].style.backgroundImage ==
      pickedCards[1].style.backgroundImage
    ) {
      matchCounter++;
      isMatch = true;
      pickedCards[0].classList.add("match");
      pickedCards[1].classList.add("match");
    }

    setTimeout(function() {
      if (!isMatch) {
        hidePickedCards();
      } else {
        pickedCards[0].classList.remove("match");
        pickedCards[1].classList.remove("match");
      }
      pickedCards = [...card];

      if (matchCounter == images.length / 2) {
        finishGame();
      } else {
        enableClick();
      }
    }, 1000);
  }
}

function showCard(element) {
  for (let i = 0; i < 4; i++) {
    for (var j = 0; j < 5; j++) {
      let currentElement = cards[i][j];
      if (element == currentElement) {
        currentElement.childNodes[0].classList.toggle("hide");
      }
    }
  }
}

function disableClick() {
  for (let i = 0; i < 4; i++) {
    for (var j = 0; j < 5; j++) {
      cards[i][j].childNodes[0].classList.add("disable-pick-card");
    }
  }
}

function enableClick() {
  for (let i = 0; i < 4; i++) {
    for (var j = 0; j < 5; j++) {
      cards[i][j].childNodes[0].classList.remove("disable-pick-card");
    }
  }
}

//this funcshin finsh the game and start a new one
function finishGame() {
  alert("You won!!!");
  shuffle();
  initCards();
}

// The main code
shuffle();
initCards();
setTimeout(function() {
  hideAllCards();
}, 3000);
