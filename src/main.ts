// document.getElementById("h1_hallo")!.innerText = "Memory App";

import './styles/style.scss';
import { gameTheme } from './db/games.theme';

init();

function init() {
    renderCards();
    setupClick();
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
