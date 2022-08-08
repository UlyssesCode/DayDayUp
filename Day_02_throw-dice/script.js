'use strict';

//选择分数元素
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

let scores, currentScore, playing;
let currentPlayer = 0;

const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.src = `dice-0.png`;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document
    .querySelector(`.player--${1 - currentPlayer}`)
    .classList.remove('player--active');
};

function togglePlayer() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
}

//init the game
init();

//函数式地控制骰子
diceEl.addEventListener('click', function () {
  if (playing) {
    //Generate dice
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    let currentID = document.getElementById(`current--${currentPlayer}`);
    //Calc scores
    if (dice !== 1) {
      currentScore += dice;
      currentID.textContent = currentScore;
    } else {
      currentID.textContent = 0;
      currentScore = 0;
      togglePlayer();
    }
  }
});

// btnRoll.addEventListener('click', function () {
//   if (playing) {
//     //Generate dice
//     let dice = Math.trunc(Math.random() * 6) + 1;
//     diceEl.classList.remove('hidden');
//     diceEl.src = `dice-${dice}.png`;
//     let currentID = document.getElementById(`current--${currentPlayer}`);
//     //Calc scores
//     if (dice !== 1) {
//       currentScore += dice;
//       currentID.textContent = currentScore;
//     } else {
//       currentID.textContent = 0;
//       currentScore = 0;
//       togglePlayer();
//     }
//   }
// });

//Save acores
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    currentScore = 0;

    current0El.textContent = '0';
    current1El.textContent = '0';
    if (scores[currentPlayer] >= 100) {
      //End the Game
      playing = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    }
    togglePlayer();
  }
});

//Rese game
btnNew.addEventListener('click', init);

//rules

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCLoseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCLoseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (key) {
  key.key === 'Escape' ? closeModal() : '';
});
