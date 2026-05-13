import career from "../img/careers-img.jpg";

const STORAGE_KEY = "desam_career_v1";

export const defaultCareerState = {
  title: "Do what you LOVE, Inviting you to build a great future with us",
  paragraphs: [
    "People! An essential part of any successful, drive the Organization in the right direction. With our accelerated organization expansion, we are always on the lookout for a talented pool of resources to grow with our organization.",
    "We look at talent with a long-term plan where they can be groomed for different roles People with the right attitude and great aspirations. At Symbiotic, we have an exciting work atmosphere with exceptional growth opportunities.",
  ],
  contactEmail: "desamoffical20@gmail.com",
  image: career,
};

export function loadCareerFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultCareerState };
    const parsed = JSON.parse(raw);
    return {
      title: typeof parsed.title === "string" ? parsed.title : defaultCareerState.title,
      paragraphs: Array.isArray(parsed.paragraphs) ? parsed.paragraphs : defaultCareerState.paragraphs,
      contactEmail: typeof parsed.contactEmail === "string" ? parsed.contactEmail : defaultCareerState.contactEmail,
      image: typeof parsed.image === "string" ? parsed.image : defaultCareerState.image,
    };
  } catch {
    return { ...defaultCareerState };
  }
}

export function saveCareerToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
