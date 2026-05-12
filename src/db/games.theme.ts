export const gameTheme:string[] = [
"card-1",
"card-2",
"card-3",
"card-4",
"card-5",
"card-6",
"card-7",
"card-8",
"card-9",
"card-10",
"card-11",
"card-12",
"card-13",
"card-14",
"card-15",
"card-16",
"card-17",
"card-18",
]

export const vibesTheme:string[] = [
"card-1",
"card-2",
"card-3",
"card-4",
"card-5",
"card-6",
"card-7",
"card-8",
"card-9",
"card-10",
"card-11",
"card-12",
"card-13",
"card-14",
"card-15",
"card-16",
"card-17",
"card-18",
]

export type Theme = {
  theme: string;
  background: string;
  borderRadius: string;
  buttonColor: string,
  borderColor: string;
  headerColor: string;
  playerColor: string;
  fontSize: string;
  cards: string[];
  cardBack: string;
  preview: string;
  confetti: string;
};

export const themes: Theme[] = [
    {
    theme: "vibes-theme",
    background: "48, 49, 49",
    cards: vibesTheme,
    cardBack: "url('./assets/img/vibes-theme/card-back.png')",
    borderRadius: "none",
    buttonColor: "rgba(134, 233, 214, 0.2)",
    borderColor: "rgb(77, 213, 188)",
    headerColor: "rgba(134, 233, 214, 0.2)",
    playerColor: "rgba(134, 233, 214, 0.2)",
    fontSize: "26px",
    preview: "./assets/img/vibes-theme/preview.png",
    confetti: "show",
  },
  {
    theme: "games-theme",
    background: "41, 79, 96",
    cards: gameTheme,
    cardBack: "url('./assets/img/games-theme/card-back.png')",
    borderRadius: "12px",
    buttonColor: "rgba(237, 27, 118, 0.08)",
    borderColor: "rgb(231, 28, 79)",
    headerColor: "rgba(253, 150, 201, 0.2)",
    playerColor: "rgb(255, 255, 255)",
    fontSize: "32px",
    preview: "./assets/img/games-theme/preview.png",
    confetti: "none",
  }
]