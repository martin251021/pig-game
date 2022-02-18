'use strict';

// označenie/výber elementov, s ktorými budeme pracovať kvoli zjednodušeniu
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores
let currentScore
let activePlayer
let playing

const init = function() {
    document.querySelector(".player--0").classList.remove("player--winner")
    document.querySelector(".player--1").classList.remove("player--winner")
    document.querySelector(`.player--0`).classList.add("player--active")
    document.querySelector(`.player--1`).classList.remove("player--active")
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add("hidden");
    playing = true;
}

init()

const switchPlayer = function() {
    currentScore = 0
    document.getElementById(`current--${activePlayer}`).textContent = 0
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active") // switch css štylu - odstranenie z aktualneho hráča
    activePlayer = activePlayer === 0 ? 1 : 0 // zmena hráča
    document.querySelector(`.player--${activePlayer}`).classList.add("player--active")
}

const winPlayer = function() {
    activePlayer === 0 ? document.querySelector(".player--0").classList.add("player--winner") : document.querySelector(".player--1").classList.add("player--winner")
}


btnRoll.addEventListener("click", function() {
    if(playing) {
    const dice = Math.trunc(Math.random() * 6) + 1 //generovanie náhodného čísla

    diceEl.classList.remove("hidden") //zobrazenie kocky
    diceEl.src = `dice-${dice}.png` //zobrazenie náhodného čísla pomocou správneho obrázku kocky

    if(dice !== 1) {
        currentScore += dice
        document.getElementById(`current--${activePlayer}`).textContent = currentScore // pridáva skore k tomu playerovi, ktory je aktivny
        
    } else {
        switchPlayer()
    }
    }

});

btnHold.addEventListener("click", function(){
    if(playing) {
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

        if(scores[activePlayer] >= 100) {
        diceEl.classList.add("hidden");      
        playing = false
        winPlayer()
    }   else {
        switchPlayer()
    }
    }

})

btnNew.addEventListener("click", init)
    























