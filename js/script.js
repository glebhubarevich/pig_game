'use strict';
let currentScore1 = 0;
let currentScore2 = 0;
let totalScore1 = 0;
let totalScore2 = 0;
let turn = false; //false === player 1, true === player 2
let diceState;

const fieldLeft = document.querySelector('.field__left');
const fieldRight = document.querySelector('.field__right');
const currentScoreLabel1 = document.querySelector('.current1');
const currentScoreLabel2 = document.querySelector('.current2');
const totalScoreLabel1 = document.querySelector('.totalScore1');
const totalScoreLabel2 = document.querySelector('.totalScore2');
const diceImage = document.querySelector('.dice__img');

const newGameButton = document.querySelector('.new_game');
newGameButton.addEventListener('click', function () {
	rollDiceButton.addEventListener('click', rollDice);
	holdButton.addEventListener('click', hold);
	turn === true ? switchPlayer() : true;
	currentScore1 = 0;
	currentScore2 = 0;
	totalScore1 = 0;
	totalScore2 = 0;
	diceState = 1;
	updateScores();
	fieldLeft.style.backgroundColor = '';
	fieldRight.style.backgroundColor = '';
	totalScoreLabel1.style.color = '';
	totalScoreLabel2.style.color = '';
});
const rollDiceButton = document.querySelector('.roll_dice');
rollDiceButton.addEventListener('click', rollDice);

const holdButton = document.querySelector('.hold');
holdButton.addEventListener('click', hold);

function randomDiceGenerator() {
	diceState = Math.trunc(Math.random() * 6) + 1;
}
function displayDiceRoll() {
	if (diceState >= 1 && diceState <= 6)
		diceImage.src = `img/dice-${diceState}.png`;
}
function updateScores() {
	currentScoreLabel1.textContent = currentScore1;
	currentScoreLabel2.textContent = currentScore2;
	totalScoreLabel1.textContent = totalScore1;
	totalScoreLabel2.textContent = totalScore2;
}
function switchPlayer() {
	if (turn === false) {
		turn = true;
		fieldLeft.classList.remove('active');
		fieldRight.classList.add('active');
	} else if (turn === true) {
		turn = false;
		fieldRight.classList.remove('active');
		fieldLeft.classList.add('active');
	}
}
function rollDice() {
	randomDiceGenerator();
	displayDiceRoll();
	if (diceState !== 1 && diceState >= 1 && diceState <= 6) {
		if (turn === false) {
			currentScore1 += diceState;
			updateScores();
		} else if (turn === true) {
			currentScore2 += diceState;
			updateScores();
		}
	} else if (diceState == 1) {
		currentScore1 = 0;
		currentScore2 = 0;
		updateScores();
		switchPlayer();
	}
}
function hold() {
	totalScore1 += currentScore1;
	totalScore2 += currentScore2;
	currentScore1 = 0;
	currentScore2 = 0;
	updateScores();
	if (totalScore1 >= 100) {
		fieldLeft.style.backgroundColor = '#69cf3a';
		totalScoreLabel1.style.color = '#ffffff';
		rollDiceButton.removeEventListener('click', rollDice);
		holdButton.removeEventListener('click', hold);
	} else if (totalScore2 >= 100) {
		fieldRight.style.backgroundColor = '#69cf3a';
		totalScoreLabel2.style.color = '#ffffff';
		rollDiceButton.removeEventListener('click', rollDice);
		holdButton.removeEventListener('click', hold);
	}
	switchPlayer();
}
