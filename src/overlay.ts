/**
 * Prepares the game-over UI by setting winner text, styles, and images.
 *
 * @param {string} winnerName - The name of the winning player.
 * @param {string} imgSrc - The image source for the winner display.
 * @param {string} themeName - The currently active theme name.
 * @returns {void}
 */
function prepareGameOver(winnerName: string, imgSrc: string, themeName: string) {
    const text = document.getElementById("winner-text");
    const img = document.getElementById("winner-img") as HTMLImageElement;
    if (!text || !img) return;
    text.textContent = `${winnerName.toUpperCase()} Player`;
    text.classList.add(`header__player--${winnerName}`);
    text.classList.add(`font60`);
    img.src = imgSrc;
    const imgGameOver = document.querySelector(".gameOverImg");
    if (imgGameOver instanceof HTMLImageElement) {
        imgGameOver.src = `../assets/img/overlay/game-over-${themeName}.png`;
    }
}

/**
 * Controls the visibility of the game-over overlays.
 *
 * @returns {void}
 */
function showGameOverOverlay() {
    const overlayFinal = document.getElementById("game-over-overlay");
    const overlayInit = document.getElementById("game-over-initOverlay");
    if (!overlayFinal || !overlayInit) return;
    setTimeout(() => {
        overlayInit.classList.remove("hidden");
    }, 1000);
    setTimeout(() => {
        overlayInit.classList.add("hidden");
        overlayFinal.classList.remove("hidden");
    }, 5000);
}

/**
 * Displays the game-over screen by preparing the UI and showing the overlay.
 *
 * @param {string} winnerName - The name of the winning player.
 * @param {string} imgSrc - The image source used for the winner display.
 * @param {string} themeName - The currently active theme name.
 * @returns {void}
 */
export function showGameOver(winnerName: string, imgSrc: string, themeName: string) {
    prepareGameOver(winnerName, imgSrc, themeName);
    showGameOverOverlay();
}

/**
 * Sets up click handlers for overlay buttons.
 *
 * @returns {void}
 */
export function setupOverlayButtons() {
    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target) return;
        if (target.id === "home-btn" || target.id === "draw-btn") {
            window.location.href = "index.html";
        }
    });
}

/**
 * Displays the draw overlay and sets themed draw images.
 *
 * @param {string} themeName - The currently active theme name.
 * @returns {void}
 */
export function showDraw(themeName: string) {
    const overlay = document.getElementById("draw-overlay");
    if (!overlay) return;
    setTimeout(() => {
        overlay.classList.remove("hidden");
    }, 1000);
    const imgDraw = document.querySelector(".draw");
    const imgScale = document.querySelector(".scale");
    if (imgDraw instanceof HTMLImageElement && imgScale instanceof HTMLImageElement) {
        imgDraw.src = `../assets/img/overlay/draw-${themeName}.png`;
        imgScale.src = `../assets/img/overlay/scale-${themeName}.png`;
    }
}

/**
 * Sets up the exit overlay button interactions.
 *
 * @returns {void}
 */
export function setupExitButtons() {
    const exitOverlay = document.getElementById('exit-overlay');
    const gameBtn = document.getElementById('game-btn');
    const exitBtn = document.getElementById('exit-btn');
    const headerExitBtn = document.getElementById('header-exit-btn');
    if (!exitOverlay || !gameBtn || !exitBtn || !headerExitBtn) return;
    headerExitBtn.addEventListener('click', () => {
        exitOverlay.classList.remove('hidden');
    });
    gameBtn.addEventListener('click', () => {
        exitOverlay.classList.add('hidden');
    });
    exitBtn.addEventListener('click', () => {
        window.location.href = 'settings.html';
    });
}