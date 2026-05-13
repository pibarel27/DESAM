import wakat from "../img/wakat.jpg";

const STORAGE_KEY = "desam_about_v1";

export const defaultAboutState = {
  aboutText: [
    "Meyamgi Desam works with communities to deliver reliable services and lasting impact.",
    "This copy is editable from the About page while signed in as admin. It is saved in your browser only.",
  ],
  vision: "A resilient, informed, and empowered community.",
  mission: "Deliver accessible services with integrity and accountability.",
  values: "Transparency, inclusion, and service above self.",
  team: [
    {
      name: "Team member",
      role: "Role title",
      desc: "Short biography shown on the About page.",
      img: wakat,
    },
  ],
};

export function loadAboutFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultAboutState };
    const parsed = JSON.parse(raw);
    return {
      aboutText: Array.isArray(parsed.aboutText) ? parsed.aboutText : defaultAboutState.aboutText,
      vision: typeof parsed.vision === "string" ? parsed.vision : defaultAboutState.vision,
      mission: typeof parsed.mission === "string" ? parsed.mission : defaultAboutState.mission,
      values: typeof parsed.values === "string" ? parsed.values : defaultAboutState.values,
      team: Array.isArray(parsed.team) ? parsed.team : defaultAboutState.team,
    };
  } catch {
    return { ...defaultAboutState };
  }
}

export function saveAboutToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
