// document.getElementById("h1_hallo")!.innerText = "Memory App";

import './styles/style.scss';
import { gameTheme, themes, Theme } from './db/games.theme';

const fieldRef = document.getElementById("field");

init();

function init() {
    // getTheme("vibes-theme", 18);
    setupClick();
}

const startBtn = document.getElementById("startBtn");

startBtn?.addEventListener("click", startGame);

function startGame() {
    const selectedTheme = document.querySelector('input[name="theme"]:checked');
    if (!(selectedTheme instanceof HTMLInputElement)) return;
    const themeName = selectedTheme.value;
    const selectedCards = document.querySelector('input[name="size"]:checked');
    if (!(selectedCards instanceof HTMLInputElement)) return;
    const cardAmount = Number(selectedCards.value);
    
 localStorage.setItem("themeName", themeName);
  localStorage.setItem("cardAmount", cardAmount.toString());

    window.location.href = "game.html";
    getTheme(themeName, cardAmount);
}

function initGame() {
        const themeName = localStorage.getItem("themeName");
    const cardAmount = Number(localStorage.getItem("cardAmount"));

    if (!themeName || !cardAmount) {
        console.error("Missing game settings");
        window.location.href = "index.html"; // fallback
        return;
    }

    getTheme(themeName, cardAmount);
}

document.addEventListener("DOMContentLoaded", initGame);

function getTheme(themeName: string = "vibes-theme", cardAmount: number = 18) {
    const theme = themes.find(t => t.theme === themeName);
    if (!theme) return;
    document.documentElement.style.setProperty("--background-color", theme.background);
    document.documentElement.style.setProperty("--border-radius", theme.borderRadius);
    document.documentElement.style.setProperty("--border-color", theme.borderColor);
    document.documentElement.style.setProperty("--font-size", theme.fontSize);
    document.documentElement.style.setProperty("--card-back", theme.cardBack);
    document.documentElement.style.setProperty("--button-color", theme.buttonColor);
    renderCards(theme, cardAmount);
}

function createCardPairs(cards: string[], amount: number): string[] {
    return cards.slice(0, amount).flatMap(c => [c, c]);
}

function createCardElement(theme: Theme, card: string): HTMLElement {
    const el = document.createElement("button");
    el.className = "card";
    el.innerHTML = `
        <div class="card__inner">
            <div class="card__face"></div>
            <div class="card__face card__face--back"
                 style="background-image: url('./assets/img/${theme.theme}/${card}.png')">
            </div>
        </div>
    `;
    return el;
}

function renderToField(elements: HTMLElement[]) {
    if (!fieldRef) return;
    fieldRef.innerHTML = "";
    elements.forEach(el => fieldRef.appendChild(el));
}

function renderCards(theme: Theme, cardAmount: number = 18) {
    const cards = createCardPairs(theme.cards, cardAmount);
    shuffleArray(cards);
    renderToField(cards.map(c => createCardElement(theme, c)));
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setupClick() {
    const fieldRef = document.getElementById("field");
    if (fieldRef) {
        fieldRef.addEventListener("click", e => {
            const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
            if (card) {
                card.classList.toggle("is-flipped");
            }
        });
    }
}

function loadThemeImg(themeName: string = "vibes-theme") {

}
