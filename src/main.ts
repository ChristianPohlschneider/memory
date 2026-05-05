import './styles/style.scss';
import { showGameOver, showDraw, setupHomeButton} from "./overlay";
import { gameTheme, themes, Theme } from './db/games.theme';

const fieldRef = document.getElementById("field");
let themeName: string;
let playerName: string;
let cardAmount: number;
let opponent: string;
let firstCard: HTMLButtonElement | null = null;
let secondCard: HTMLButtonElement | null = null;
let lockBoard = false;
let blueScore: number = 0;
let orangeScore: number = 0;

init();

function init() {
    setupClick();
};

const startBtn = document.getElementById("startBtn");
startBtn?.addEventListener("click", startGame);

function startGame() {
    const selectedTheme = document.querySelector('input[name="theme"]:checked');
    if (!(selectedTheme instanceof HTMLInputElement)) return;
    const themeName = selectedTheme.value;
    const selectedPlayer = document.querySelector('input[name="player"]:checked');
    if (!(selectedPlayer instanceof HTMLInputElement)) return;
    const playerName = selectedPlayer.value;
    const selectedCards = document.querySelector('input[name="size"]:checked');
    if (!(selectedCards instanceof HTMLInputElement)) return;
    const cardAmount = Number(selectedCards.value);
    setLocalStorage(themeName, playerName, cardAmount);
    window.location.href = "game.html";
};

function setLocalStorage(themeName: string, playerName: string, cardAmount: number) {
    localStorage.setItem("themeName", themeName);
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("cardAmount", cardAmount.toString());
};

function initGame() {
    if (!localStorage.getItem("themeName") || !localStorage.getItem("cardAmount") || !localStorage.getItem("playerName")) {
        themeName = "vibes-theme";
        playerName = "blue";
        cardAmount = 16;
    } else {
        themeName = localStorage.getItem("themeName")!;
        playerName = localStorage.getItem("playerName")!;
        cardAmount = Number(localStorage.getItem("cardAmount"));
    }
    getTheme(themeName, playerName, cardAmount);
};

document.addEventListener("DOMContentLoaded", initGame);

function getTheme(themeName: string = "vibes-theme", playerName: string = "blue", cardAmount: number = 16) {
    const theme = themes.find(t => t.theme === themeName);
    if (!theme) return;
    setThemePropertys(theme, playerName);
    if (playerName == "blue") {
        opponent = "orange"
    } else {
        opponent = "blue"
    }
    document.documentElement.style.setProperty("--opponent-name", `url("./assets/img/header/label-${opponent}.svg")`);
    renderCards(theme, cardAmount);
};

function setThemePropertys(theme: Theme, playerName: string) {
    document.documentElement.style.setProperty("--background-color", theme.background);
    document.documentElement.style.setProperty("--border-radius", theme.borderRadius);
    document.documentElement.style.setProperty("--border-color", theme.borderColor);
    document.documentElement.style.setProperty("--font-size", theme.fontSize);
    document.documentElement.style.setProperty("--card-back", theme.cardBack);
    document.documentElement.style.setProperty("--button-color", theme.buttonColor);
    document.documentElement.style.setProperty("--preview-background", theme.preview);
    document.documentElement.style.setProperty("--player-name", `url("./assets/img/header/label-${playerName}.svg")`);
}

function createCardPairs(cards: string[], amount: number): string[] {
    return cards.slice(0, amount).flatMap(c => [c, c]);
};

function createCardElement(theme: Theme, card: string): HTMLElement {
    const el = document.createElement("button");
    el.className = "card is-flipped";
    el.dataset.card = card;
    el.innerHTML = `
        <div class="card__inner">
            <div class="card__face"></div>
            <div class="card__face card__face--back"
                style="background-image: url('./assets/img/${theme.theme}/${card}.png')">
            </div>
        </div>
    `;
    return el;
};

function renderToField(elements: HTMLElement[]) {
    if (!fieldRef) return;
    fieldRef.innerHTML = "";
    elements.forEach(el => fieldRef.appendChild(el));
};

function renderCards(theme: Theme, cardAmount: number = 16) {
    const cards = createCardPairs(theme.cards, cardAmount / 2);
    shuffleArray(cards);
    renderToField(cards.map(c => createCardElement(theme, c)));
};

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const previewBox = document.querySelector(".settings__preview") as HTMLElement;
const radios = document.querySelectorAll(".customRadio input") as NodeListOf<HTMLInputElement>;
const DEFAULT_THEME = "vibes-theme";
const themeLabels: Record<string, string> = {
    "vibes-theme": "Code vibes theme",
    "games-theme": "Gaming theme"
};
const sizeLabels: Record<string, string> = {
    "16": "16 cards",
    "24": "24 cards",
    "36": "36 cards",
};
const DEFAULT_LINE = "./assets/img/settings/Line-6.svg";
const ACTIVE_LINE = "./assets/img/settings/Line-5.svg";

function getActiveTheme() {
    const activeInput = document.querySelector(".customRadio input:checked") as HTMLInputElement;
    return activeInput?.value ?? DEFAULT_THEME;
}

function applyPreview(themeName: string) {
    const previewBox = document.querySelector(".settings__preview");
    const theme = themes.find(t => t.theme === themeName);
    if (!theme || !previewBox) return;
    (previewBox as HTMLElement).style.backgroundImage = `url(${theme.preview})`;
}

radios.forEach((input) => {
    if (input.value === DEFAULT_THEME) {
        input.checked = true;
    }
});

applyPreview(DEFAULT_THEME);


document.querySelectorAll(".customRadio").forEach((label) => {
    const input = label.querySelector("input") as HTMLInputElement;
    label.addEventListener("mouseenter", () => {
        applyPreview(input.value);
    });
    label.addEventListener("mouseleave", () => {
        applyPreview(getActiveTheme());
    });
});

document.querySelector(".settings")?.addEventListener("mouseleave", () => {
    applyPreview(getActiveTheme());
});

radios.forEach((input) => {
    input.addEventListener("change", () => {
        applyPreview(input.value);
        updateSettingsBoard();
    });
    input.addEventListener("click", () => {
        if (input.checked) {
            updateSettingsBoard();
        }
    });
});

function updateThemeText(activeTheme: string) {
    const el = document.querySelector(".settings__gameTheme");
    const label = themeLabels[activeTheme] ?? "Game theme";
    if (el) el.textContent = label;
};

function updatePlayerText() {
    const el = document.querySelector(".settings__player");
    const input = document.querySelector("input[name='player']:checked") as HTMLInputElement | null;
    if (!el) return;
    el.textContent = input ? input.value : "Player";
};

function updateBoardSizeText() {
    const el = document.querySelector(".settings__size");
    const input = document.querySelector("input[name='size']:checked") as HTMLInputElement | null;
    if (!el) return;
    el.textContent = input ? (sizeLabels[input.value] ?? "Board size") : "Board size";
};

function updateLines() {
    const playerInput = document.querySelector("input[name='player']:checked") as HTMLInputElement | null;
    const sizeInput = document.querySelector("input[name='size']:checked") as HTMLInputElement | null;
    const linePlayer = document.querySelector(".settings__linePlayer") as HTMLImageElement | null;
    const lineSize = document.querySelector(".settings__lineSize") as HTMLImageElement | null;
    if (linePlayer) linePlayer.src = playerInput ? ACTIVE_LINE : DEFAULT_LINE;
    if (lineSize) lineSize.src = sizeInput ? ACTIVE_LINE : DEFAULT_LINE;
};

function updateSettingsBoard() {
    const activeTheme = getActiveTheme();
    updateThemeText(activeTheme);
    updatePlayerText();
    updateBoardSizeText();
    updateLines();
};

function setupClick() {
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
}

function flipCard(card: HTMLButtonElement) {
    card.classList.remove("is-flipped");
}

function checkMatch() {
    if (!firstCard || !secondCard) return;
    isMatch(firstCard, secondCard) ? handleMatch() : handleMismatch();
}

function isMatch(a: HTMLButtonElement, b: HTMLButtonElement): boolean {
    return a.dataset.card === b.dataset.card;
}

function handleMatch() {
    firstCard!.classList.add("matched");
    secondCard!.classList.add("matched");
    setScore(playerName);
    resetTurn();
    checkGameOver();
}

function handleMismatch() {
    lockBoard = true;
    setTimeout(() => {
        firstCard?.classList.add("is-flipped");
        secondCard?.classList.add("is-flipped");
        nextPlayer();
        resetTurn();
    }, 800);
}


function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function nextPlayer() {
    playerName = localStorage.getItem("playerName")!;
    playerName = opponent;
    localStorage.setItem("playerName", playerName);
    document.documentElement.style.setProperty("--player-name", `url("./assets/img/header/label-${playerName}.svg")`);
    if (playerName == "blue") {
        opponent = "orange"
    } else {
        opponent = "blue"
    }
}

function setScore(playerName: string) {
    if (playerName == "orange") {
        orangeScore++;
    } else {
        blueScore++;
    }
    const orangeCounter: HTMLElement | null = document.getElementById("orangeCounter");
    if (orangeCounter) {
        orangeCounter.innerHTML = String(orangeScore);
    };
    const blueCounter: HTMLElement | null = document.getElementById("blueCounter");
    if (blueCounter) {
        blueCounter.innerHTML = String(blueScore);
    }
}

function checkGameOver() {
    const allCards = document.querySelectorAll(".card");
    const matchedCards = document.querySelectorAll(".card.matched");
    if (allCards.length > 0 && allCards.length === matchedCards.length) {
        if (orangeScore < blueScore) {
            const winnerName: string = "blue";
            // const imgSrc = `./assets/img/overlay/${winnerName}.png`;
            // showGameOver(winnerName, imgSrc);
            handleShowGameOver(winnerName)
        } else if (blueScore < orangeScore) {
            const winnerName: string = "orange";
            handleShowGameOver(winnerName);
            // const imgSrc = `./assets/img/overlay/${winnerName}.png`;
            // showGameOver(winnerName, imgSrc);
        } else {
            showDraw();
        }
    }
}

function handleShowGameOver(winnerName: string) {
    const imgSrc = `./assets/img/overlay/${winnerName}.png`;
    showGameOver(winnerName, imgSrc);
    setupHomeButton();
    // const btn = document.getElementById("home-btn");
    // if (btn) {
    //     btn.onclick = () => window.location.href = "index.html";
    // }
}
