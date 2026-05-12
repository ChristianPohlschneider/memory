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
        imgGameOver.src = `./assets/img/overlay/game-over-${themeName}.png`;
    }
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

export function showGameOver(winnerName: string, imgSrc: string, themeName: string) {
    prepareGameOver(winnerName, imgSrc, themeName);
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

export function showDraw(themeName: string) {
    const overlay = document.getElementById("draw-overlay");
    if (!overlay) return;
    setTimeout(() => {
        overlay.classList.remove("hidden");
    }, 1000);
    const imgDraw = document.querySelector(".draw");
    const imgScale = document.querySelector(".scale");
    if (imgDraw instanceof HTMLImageElement && imgScale instanceof HTMLImageElement) {
        imgDraw.src = `./assets/img/overlay/draw-${themeName}.png`;
        imgScale.src = `./assets/img/overlay/scale-${themeName}.png`;
    }
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