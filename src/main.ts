import './styles/style.scss';
import { showGameOver, showDraw, setupOverlayButtons, setupExitButtons} from "./overlay";

import { gameTheme, themes, Theme } from './db/games.theme';
import { setupClick} from './game';

const fieldRef = document.getElementById("field");
let themeName: string;
let playerName: string;
let cardAmount: number;
let opponent: string;

init();

/**
 * Initializes the application and sets up click events.
 */
function init() {
    setupClick();
};

const startBtn = document.getElementById("startBtn") as HTMLButtonElement;;
startBtn?.addEventListener("click", startGame);

/**
 * Starts the game by reading the selected settings,
 * saving them to localStorage, and opening the game page.
 */
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

/**
 * Saves the selected game settings to localStorage.
 *
 * @param themeName - The selected game theme.
 * @param playerName - The selected player name.
 * @param cardAmount - The selected number of cards.
 */
function setLocalStorage(themeName: string, playerName: string, cardAmount: number) {
    localStorage.setItem("themeName", themeName);
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("cardAmount", cardAmount.toString());
};

/**
* Initializes the game settings from localStorage.
* Falls back to default values if no saved settings exist.
*/
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

/**
 * Applies the selected theme, sets player/opponent colors,
 * updates CSS variables, and renders the game cards.
 *
 * @param themeName - Name of the selected theme (default: "vibes-theme").
 * @param playerName - Name/color of the player (default: "blue").
 * @param cardAmount - Number of cards to render (default: 16).
 */
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

/**
 * Applies theme-related CSS variables to the document root.
 *
 * @param theme - Theme configuration object containing colors, images and styling values.
 * @param playerName - Selected player name used for player-specific assets.
 */
function setThemePropertys(theme: Theme, playerName: string) {
    document.documentElement.style.setProperty("--background-color", theme.background);
    document.documentElement.style.setProperty("--border-radius", theme.borderRadius);
    document.documentElement.style.setProperty("--border-color", theme.borderColor);
    document.documentElement.style.setProperty("--font-size", theme.fontSize);
    document.documentElement.style.setProperty("--card-back", theme.cardBack);
    document.documentElement.style.setProperty("--button-color", theme.buttonColor);
    document.documentElement.style.setProperty("--preview-background", theme.preview);
    document.documentElement.style.setProperty("--header-background", theme.headerColor);
    document.documentElement.style.setProperty("--player-background", theme.playerColor);
    document.documentElement.style.setProperty("--player-name", `url("./assets/img/header/${theme.theme}/label-${playerName}.svg")`);
    document.documentElement.style.setProperty("--player-orange", `url("./assets/img/header/${theme.theme}/label-orange.svg")`);
    document.documentElement.style.setProperty("--player-blue", `url("./assets/img/header/${theme.theme}/label-blue.svg")`);
    document.documentElement.style.setProperty("--confetti", theme.confetti);
}

/**
 * Creates shuffled card pairs for the memory game.
 *
 * @param cards - Array of available card identifiers.
 * @param amount - Number of unique cards to use (each will be duplicated to form pairs).
 * @returns Array containing paired cards.
 */
function createCardPairs(cards: string[], amount: number): string[] {
    return cards.slice(0, amount).flatMap(c => [c, c]);
};

/**
 * Creates a DOM element for a memory card.
 *
 * @param theme - Current theme configuration used for image paths.
 * @param card - Card identifier used to load the correct image.
 * @returns The generated HTML button element representing a card.
 */
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

/**
 * Renders a list of elements into the game field.
 *
 * @param elements - Array of HTML elements to append to the field.
 */
function renderToField(elements: HTMLElement[]) {
    if (!fieldRef) return;
    fieldRef.innerHTML = "";
    elements.forEach(el => fieldRef.appendChild(el));
};

/**
 * Renders the complete card set for the game.
 *
 * @param theme - Current theme configuration used for card assets.
 * @param cardAmount - Total number of cards to render (default: 16).
 */
function renderCards(theme: Theme, cardAmount: number = 16) {
    setupBoardLayout(cardAmount);
    const cards = createCardPairs(theme.cards, cardAmount / 2);
    shuffleArray(cards);
    renderToField(cards.map(c => createCardElement(theme, c)));
};

/**
 * Randomly shuffles the elements of an array using the Fisher-Yates algorithm.
 *
 * @param {any[]} array - The array to shuffle.
 * @returns {void}
 */
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

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

/**
 * Returns the currently selected theme value.
 *
 * @returns {string} The active theme value or the default theme if none is selected.
 */
function getActiveTheme() {
    const activeInput = document.querySelector(".customRadio input:checked") as HTMLInputElement;
    return activeInput?.value ?? DEFAULT_THEME;
}

/**
 * Configures the board layout by adjusting the number of grid columns
 * based on the total amount of cards.
 *
 * @param {number} cardAmount - The total number of cards on the board.
 * @returns {void}
 */
function setupBoardLayout(cardAmount: number) {
    if (!fieldRef) return;
    let columns = 4;
    if (cardAmount === 24 || cardAmount === 36) {
        columns = 6;
    }
    fieldRef.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

/**
 * Applies the preview image for the selected theme.
 *
 * @param {string} themeName - The name of the theme to preview.
 * @returns {void}
 */
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

/**
 * Updates the displayed theme label text.
 *
 * @param {string} activeTheme - The currently active theme name.
 * @returns {void}
 */
function updateThemeText(activeTheme: string) {
    const el = document.querySelector(".settings__gameTheme");
    const label = themeLabels[activeTheme] ?? "Game theme";
    if (el) el.textContent = label;
};

/**
 * Updates the displayed player text based on the selected player option.
 *
 * @returns {void}
 */
function updatePlayerText() {
    const el = document.querySelector(".settings__player");
    const input = document.querySelector("input[name='player']:checked") as HTMLInputElement | null;
    if (!el) return;
    el.textContent = input ? input.value : "Player";
};

/**
 * Updates the displayed board size text based on the selected size option.
 *
 * @returns {void}
 */
function updateBoardSizeText() {
    const el = document.querySelector(".settings__size");
    const input = document.querySelector("input[name='size']:checked") as HTMLInputElement | null;
    if (!el) return;
    el.textContent = input ? (sizeLabels[input.value] ?? "Board size") : "Board size";
};

/**
 * Updates the line indicators based on the selected player
 * and board size options.
 *
 * @returns {void}
 */
function updateLines() {
    const playerInput = document.querySelector("input[name='player']:checked") as HTMLInputElement | null;
    const sizeInput = document.querySelector("input[name='size']:checked") as HTMLInputElement | null;
    const linePlayer = document.querySelector(".settings__linePlayer") as HTMLImageElement | null;
    const lineSize = document.querySelector(".settings__lineSize") as HTMLImageElement | null;
    if (linePlayer) linePlayer.src = playerInput ? ACTIVE_LINE : DEFAULT_LINE;
    if (lineSize) lineSize.src = sizeInput ? ACTIVE_LINE : DEFAULT_LINE;
};

/**
 * Updates the entire settings board UI by refreshing theme text,
 * player text, board size text, line indicators, and start button state.
 *
 * @returns {void}
 */
function updateSettingsBoard() {
    const activeTheme = getActiveTheme();
    updateThemeText(activeTheme);
    updatePlayerText();
    updateBoardSizeText();
    updateLines();
    updateStartButton();
};

/**
 * Enables or disables the start button depending on whether
 * all required settings (theme, player, and size) are selected.
 *
 * @returns {void}
 */
function updateStartButton() {
    const themeSelected = document.querySelector("input[name='theme']:checked");
    const playerSelected = document.querySelector("input[name='player']:checked");
    const sizeSelected = document.querySelector("input[name='size']:checked");
    startBtn.disabled = !(themeSelected && playerSelected && sizeSelected);
}

document.addEventListener("DOMContentLoaded", () => {
    setupOverlayButtons();
    setupExitButtons();
});

