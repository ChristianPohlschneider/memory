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

    // Erst Init anzeigen
    setTimeout(() => {
        overlayInit.classList.remove("hidden");
    }, 1000);

    // Dann nach 2 Sekunden wechseln
    setTimeout(() => {
        overlayInit.classList.add("hidden");
        overlayFinal.classList.remove("hidden");
    }, 5000);
}

export function showGameOver(winnerName: string, imgSrc: string) {
    prepareGameOver(winnerName, imgSrc);
    showGameOverOverlay();
}

// export function setupHomeButton() {
//     const btn = document.getElementById("home-btn");
//     if (!btn) return;

//     btn.addEventListener("click", () => {
//         window.location.href = "index.html";
//     });
// }

// export function setupDrawButton() {
//     const btn = document.getElementById("draw-btn");
//     if (!btn) return;

//     btn.addEventListener("click", () => {
//         window.location.href = "index.html";
//     });
// }
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