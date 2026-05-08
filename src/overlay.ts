function prepareGameOver(winnerName: string, imgSrc: string) {
    const text = document.getElementById("winner-text");
    const img = document.getElementById("winner-img") as HTMLImageElement;
    if (!text || !img) return;
    text.textContent = `${winnerName.toUpperCase()} Player`;
    text.classList.add(`header__player--${winnerName}`);
    img.src = imgSrc;
}

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

export function showGameOver(winnerName: string, imgSrc: string) {
    prepareGameOver(winnerName, imgSrc);
    showGameOverOverlay();
}

export function setupOverlayButtons() {
    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target) return;
        if (target.id === "home-btn" || target.id === "draw-btn") {
            window.location.href = "index.html";
        }
    });
}

export function showDraw() {
    const overlay = document.getElementById("draw-overlay");
    if (!overlay) return;
    setTimeout(() => {
        overlay.classList.remove("hidden");
    }, 1000);
}

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