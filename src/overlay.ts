export function showGameOver(winnerName: string, imgSrc: string) {
    const overlay = document.getElementById("game-over-overlay");
    const text = document.getElementById("winner-text");
    const img = document.getElementById("winner-img") as HTMLImageElement;
    if (!overlay || !text || !img) return;
    text.textContent = `${winnerName.toUpperCase()} Player`;
    text.classList.add(`header__player--${winnerName}`)
    img.src = imgSrc;
    overlay.classList.remove("hidden");
}

export function setupHomeButton() {
    const btn = document.getElementById("home-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

export function showDraw(){

}