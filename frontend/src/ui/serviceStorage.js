import education from "../img/education-bg.png";
import media from "../img/media.png";
import games from "../img/games-bg.png";
import sports from "../img/sports.png";

const STORAGE_KEY = "desam_services_v1";

export const defaultServiceBlocks = [
  {
    id: "education",
    title: "Educational Content",
    slug: "educational-content",
    description:
      "#CUET_PG_ENTRANCE_TEST_2024 State asidagi CUET PG -2024 da saruk yagadaba Maheiroising mapan lamda Centre pirakpadagi entrance thaba phangaroidra haibagi pakhatnaba adu State asida nouna centre piraga pangthoklagani #Meeyamgi_DESAM..",
    image: education,
    layout: "image-left",
  },
  {
    id: "entertainment",
    title: "Entertainment Content",
    slug: "entertainment-content",
    description:
      'DESAM na chahi khudinggi pangthokoa paomising ekai khumnana pukmen paomennabagi thouram "MEET THE MEDIA FRATERNITY" gi thouram pangthokkhre. "Paomigi Achumba Paodamgi Khut ee na Tunglamchatki Maion Leplasanu".',
    image: media,
    layout: "image-right",
  },
  {
    id: "games",
    title: "Games",
    slug: "games",
    description:
      "Get access to a bunch of games ranging from Action, Adventure, Arcade, Board, Cards, Casino and more to play on your device. A good choice for people whose idea of entertainment involves gaming.",
    image: games,
    layout: "image-left",
  },
  {
    id: "sports",
    title: "Sports",
    slug: "sports",
    description:
      "1st DESAM 7 A SIDE WOMEN FRIENDSHIP FOOTBALL TOURNAMENT 2023.",
    image: sports,
    layout: "image-right",
  },
];

export function loadServicesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...defaultServiceBlocks];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...defaultServiceBlocks];
    return parsed;
  } catch {
    return [...defaultServiceBlocks];
  }
}

export function saveServicesToStorage(blocks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
}

