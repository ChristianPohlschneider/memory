// document.getElementById("h1_hallo")!.innerText = "Memory App";

import './styles/style.scss';
import { gameTheme, themes } from './db/games.theme';

init();

function init() {
    getTheme("games-theme");
    renderCards();
    setupClick();
}

function getTheme(themeName: string = "vibes-theme") {
    const theme = themes.find(t => t.theme === themeName);

    if (!theme) return;

    document.documentElement.style.setProperty("--background-color", theme.background);
    document.documentElement.style.setProperty("--border-radius", theme.borderRadius);
    document.documentElement.style.setProperty("--border-color", theme.borderColor);
    document.documentElement.style.setProperty("--font-size", theme.fontSize);
    document.documentElement.style.setProperty("--card-back", theme.cardBack);
    document.documentElement.style.setProperty("--button-color", theme.buttonColor);
    
}

function renderCards() {
    const fieldRef = document.getElementById("field");

    if (!fieldRef) return;

    fieldRef.innerHTML = ""; // optional: vorher leeren

    // 🔁 Karten verdoppeln
    const cards = [...gameTheme, ...gameTheme];

    // 🔀 Karten mischen
    shuffleArray(cards);

    cards.forEach((theme: any) => {
        const card = document.createElement("button");
        card.className = `card`;

        card.innerHTML = `
            <div class="card__inner">
                <div class="card__face"></div>
                <div class="card__face card__face--back" style="background-image: url('./assets/img/games-theme/${theme}.png')"></div>
            </div>
        `;
        // public/assets/img/games-theme/card-1.png
        fieldRef.appendChild(card);
    });
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
