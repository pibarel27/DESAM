const STORAGE_KEY = "desam_hero_v1";

export const defaultHeroState = {
  title: "Meyamgi Desam",
  motto: "Serving people with purpose and clarity.",
  description:
    "Explore our services, careers, and ways to connect. Edit this hero text from the home page when signed in as admin.",
};

export function loadHeroFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultHeroState };
    const parsed = JSON.parse(raw);
    return {
      title: typeof parsed.title === "string" ? parsed.title : defaultHeroState.title,
      motto: typeof parsed.motto === "string" ? parsed.motto : defaultHeroState.motto,
      description:
        typeof parsed.description === "string" ? parsed.description : defaultHeroState.description,
    };
  } catch {
    return { ...defaultHeroState };
  }
}

export function saveHeroToStorage(hero) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hero));
}
