import { showDraw, showGameOver } from "./overlay";

let themeName: string;
let playerName: string;
let opponent: string;
let firstCard: HTMLButtonElement | null = null;
let secondCard: HTMLButtonElement | null = null;
let lockBoard = false;
let blueScore: number = 0;
let orangeScore: number = 0;

/**
 * Sets up the click handler for the game field.
 *
 * @returns {void}
 */
export function setupClick() {
    const fieldRef = document.getElementById("field");
    if (!fieldRef) return;
    fieldRef.addEventListener("click", e => {
        const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
        if (!card || lockBoard || card === firstCard || card.classList.contains("matched")) return;
        flipCard(card);
        if (!firstCard) return void (firstCard = card);
        secondCard = card;
        checkMatch();
    });
};

/**
 * Flips a card back to its unflipped state by removing the "is-flipped" class.
 *
 * @param {HTMLButtonElement} card - The card element to flip.
 * @returns {void}
 */
export function flipCard(card: HTMLButtonElement) {
    card.classList.remove("is-flipped");
};

/**
 * Checks whether the currently selected cards match and triggers the
 * corresponding match or mismatch handling logic.
 *
 * @returns {void}
 */
export function checkMatch() {
    playerName = localStorage.getItem("playerName")!;
    if (!firstCard || !secondCard) return;
    isMatch(firstCard, secondCard) ? handleMatch(playerName) : handleMismatch(playerName);
};

/**
 * Determines whether two cards form a match by comparing their dataset values.
 *
 * @param {HTMLButtonElement} a - The first card element.
 * @param {HTMLButtonElement} b - The second card element.
 * @returns {boolean} True if both cards match, otherwise false.
 */
export function isMatch(a: HTMLButtonElement, b: HTMLButtonElement): boolean {
    return a.dataset.card === b.dataset.card;
};

/**
 * Handles the logic when two selected cards form a match.
 *
 * @param {string} playerName - The name of the current player.
 * @returns {void}
 */
export function handleMatch(playerName: string) {
    
    firstCard!.classList.add("matched", playerName);
    secondCard!.classList.add("matched", playerName);
    setScore(playerName);
    resetTurn();
    checkGameOver();
};

/**
 * Handles the logic when two selected cards do not match.
 *
 * @param {string} playerName - The name of the current player.
 * @returns {void}
 */
export function handleMismatch(playerName: string) {
    lockBoard = true;
    setTimeout(() => {
        firstCard?.classList.add("is-flipped");
        secondCard?.classList.add("is-flipped");
        nextPlayer(playerName);
        resetTurn();
    }, 800);
};

/**
 * Resets the current turn state by clearing selected cards
 * and unlocking the board.
 *
 * @returns {void}
 */
export function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
};

/**
 * Switches to the next player, updates localStorage values, and
 * updates the UI label based on the active theme and player.
 *
 * @param {string} playerName - The current player name (overwritten internally).
 * @returns {void}
 */
export function nextPlayer(playerName: string) {
    playerName = localStorage.getItem("playerName")!;
    themeName = localStorage.getItem("themeName")!;
    setOpponent(playerName);
    playerName = opponent;
    localStorage.setItem("playerName", playerName);
    document.documentElement.style.setProperty("--player-name", `url("../assets/img/header/${themeName}/label-${playerName}.svg")`);
    if (playerName == "blue") {
        opponent = "orange"
    } else {
        opponent = "blue"
    }
};

/**
 * Sets the opponent based on the current player.
 *
 * @param {string} playerName - The current player name.
 * @returns {void}
 */
export function setOpponent(playerName: string) {
if (playerName == "blue") {
        opponent = "orange"
    } else {
        opponent = "blue"
    }
};

/**
 * Updates the score for the given player and refreshes the score display in the UI.
 *
 * @param {string} playerName - The name of the player who scored ("orange" or "blue").
 * @returns {void}
 */
export function setScore(playerName: string) {
    if (playerName === "orange") {
        orangeScore++;
    } else {
        blueScore++;
    }
    document.querySelectorAll(".header__orangeScore")
        .forEach(el => el.textContent = String(orangeScore));
    document.querySelectorAll(".header__blueScore")
        .forEach(el => el.textContent = String(blueScore));
};

/**
 * Checks whether the game is finished and determines the winner.
 *
 * @returns {void}
 */
export function checkGameOver() {
    const allCards = document.querySelectorAll(".card");
    const matchedCards = document.querySelectorAll(".card.matched");
    if (allCards.length > 0 && allCards.length === matchedCards.length) {
        if (orangeScore < blueScore) {
            const winnerName: string = "blue";
            handleShowGameOver(winnerName)
        } else if (blueScore < orangeScore) {
            const winnerName: string = "orange";
            handleShowGameOver(winnerName);
        } else if (blueScore == orangeScore) {
            showDraw(themeName);
        }
    }
};

/**
 * Prepares and displays the game-over screen for the given winner.
 *
 * @param {string} winnerName - The name of the winning player.
 * @returns {void}
 */
export function handleShowGameOver(winnerName: string) {
    const imgSrc = `./assets/img/overlay/${themeName}-${winnerName}.png`;
    showGameOver(winnerName, imgSrc, themeName);
};