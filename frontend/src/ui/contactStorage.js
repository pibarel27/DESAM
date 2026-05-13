const STORAGE_KEY = "desam_contact_v1";

export const defaultContactState = {
  heading: "Lets have a TALK",
  description: "Get in touch with us for inquiries or support.",
  location: "Manipur, India:",
  locationDetails: "Keishampat, Junction, Imphal West - 795001.",
  email: "desamofficial02@gmail.com",
  phone: "+917005291834",
};

export function loadContactFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultContactState };
    const parsed = JSON.parse(raw);
    return {
      heading: typeof parsed.heading === "string" ? parsed.heading : defaultContactState.heading,
      description: typeof parsed.description === "string" ? parsed.description : defaultContactState.description,
      location: typeof parsed.location === "string" ? parsed.location : defaultContactState.location,
      locationDetails: typeof parsed.locationDetails === "string" ? parsed.locationDetails : defaultContactState.locationDetails,
      email: typeof parsed.email === "string" ? parsed.email : defaultContactState.email,
      phone: typeof parsed.phone === "string" ? parsed.phone : defaultContactState.phone,
    };
  } catch {
    return { ...defaultContactState };
  }
}

export function saveContactToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
