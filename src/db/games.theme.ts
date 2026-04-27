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
  fontSize: string;
  cards: string[];
  cardBack: string;
  preview: string;
};

export const themes: Theme[] = [
    {
    theme: "vibes-theme",
    background: "#303131",
    cards: vibesTheme,
    cardBack: "url('./assets/img/vibes-theme/card-back.png')",
    borderRadius: "12px",
    buttonColor: "#86E9D633",
    borderColor: "#4DD5BC",
    fontSize: "26px",
    preview: "./assets/img/vibes-theme/preview.png",
  },
  {
    theme: "games-theme",
    background: "#294F60",
    cards: gameTheme,
    cardBack: "url('./assets/img/games-theme/card-back.png')",
    borderRadius: "none",
    buttonColor: "#ED1B7614",
    borderColor: "#E71C4F",
    fontSize: "32px",
    preview: "./assets/img/games-theme/preview.png",
  }
]

function gameThemes($theme: string) {

}