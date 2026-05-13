import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadHeroFromStorage, saveHeroToStorage } from "./heroStorage";
import { loadAboutFromStorage, saveAboutToStorage } from "../ui/aboutStorage";
import { loadServicesFromStorage, saveServicesToStorage } from "../ui/serviceStorage";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
  { id: "careers", label: "Careers" },
];

function AdminDashboard({ setIsAuth }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuth(false);
    navigate("/");
  };

  return (
    <div className="min-vh-100 d-flex" style={{ background: "#f4f6f9" }}>
      <aside
        className="bg-white border-end d-flex flex-column"
        style={{ width: 260, minHeight: "100vh", boxShadow: "1px 0 0 #e9ecef" }}
      >
        <div className="p-4 border-bottom">
          <div className="fw-bold fs-5 text-dark">DESAM Admin</div>
          <div className="small text-muted mt-1">Edit all pages from here</div>
        </div>
        <nav className="nav flex-column p-3 gap-1 flex-grow-1">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`text-start btn w-100 mb-1 ${
                activeSection === section.id
                  ? "btn-primary text-white"
                  : "btn-light text-body border-0"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-top">
          <button type="button" className="btn btn-outline-danger w-100" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">
        {activeSection === "home" && <HomeEditor />}
        {activeSection === "about" && <AboutEditor />}
        {activeSection === "services" && <ServicesEditor />}
        {activeSection === "contact" && <ContactEditor />}
        {activeSection === "careers" && <CareersEditor />}
      </main>
    </div>
  );
}

function HomeEditor() {
  const [hero, setHero] = useState(() => loadHeroFromStorage());

  const handleChange = (e) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    saveHeroToStorage(hero);
    alert("Home hero saved for this browser.");
  };

  return (
    <div>
      <h1 className="h3 mb-3">Home page</h1>
      <p className="text-secondary mb-4" style={{ maxWidth: 600 }}>
        Edit the hero title, motto, and description shown at the top of the home page.
      </p>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={hero.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Motto</label>
            <input
              type="text"
              name="motto"
              value={hero.motto}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              value={hero.description}
              onChange={handleChange}
              rows={4}
              className="form-control"
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save hero
          </button>
        </div>
      </div>
    </div>
  );
}

function AboutEditor() {
  const [state, setState] = useState(() => loadAboutFromStorage());

  const updateField = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const updateAboutLine = (index, value) => {
    const next = [...state.aboutText];
    next[index] = value;
    updateField("aboutText", next);
  };

  const addAboutLine = () => {
    updateField("aboutText", [...state.aboutText, ""]);
  };

  const removeAboutLine = (index) => {
    updateField(
      "aboutText",
      state.aboutText.filter((_, i) => i !== index)
    );
  };

  const updateTeamMember = (index, patch) => {
    const next = state.team.map((member, i) => (i === index ? { ...member, ...patch } : member));
    updateField("team", next);
  };

  const addTeamMember = () => {
    updateField("team", [
      ...state.team,
      { name: "", role: "", desc: "", img: "" },
    ]);
  };

  const removeTeamMember = (index) => {
    updateField(
      "team",
      state.team.filter((_, i) => i !== index)
    );
  };

  const handleTeamImage = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateTeamMember(index, { img: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveAboutToStorage(state);
    alert("About content saved for this browser.");
  };

  return (
    <div>
      <h1 className="h3 mb-3">About page</h1>
      <p className="text-secondary mb-4" style={{ maxWidth: 640 }}>
        Edit the about paragraphs, vision / mission / values, and team members. These changes are
        reflected on the public About page and stored in local storage.
      </p>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">About text</h2>
          {state.aboutText.map((line, index) => (
            <div className="d-flex gap-2 mb-2" key={index}>
              <textarea
                className="form-control"
                rows={2}
                value={line}
                onChange={(e) => updateAboutLine(index, e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => removeAboutLine(index)}
              >
                ✕
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={addAboutLine}>
            Add paragraph
          </button>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body row g-3">
          <div className="col-md-4">
            <label className="form-label fw-semibold">Vision</label>
            <textarea
              className="form-control"
              rows={3}
              value={state.vision}
              onChange={(e) => updateField("vision", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Mission</label>
            <textarea
              className="form-control"
              rows={3}
              value={state.mission}
              onChange={(e) => updateField("mission", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Values</label>
            <textarea
              className="form-control"
              rows={3}
              value={state.values}
              onChange={(e) => updateField("values", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Team members</h2>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={addTeamMember}>
              Add member
            </button>
          </div>

          {state.team.map((member, index) => (
            <div key={index} className="border rounded p-3 mb-3">
              <div className="row g-3 align-items-center">
                <div className="col-md-3 text-center">
                  {member.img && (
                    <img
                      src={member.img}
                      alt={member.name || "Team member"}
                      className="img-fluid rounded mb-2"
                      style={{ maxHeight: 120, objectFit: "cover" }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control form-control-sm"
                    onChange={(e) => handleTeamImage(index, e.target.files?.[0] || null)}
                  />
                </div>
                <div className="col-md-8">
                  <div className="mb-2">
                    <label className="form-label fw-semibold mb-1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={member.name}
                      onChange={(e) =>
                        updateTeamMember(index, { name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label fw-semibold mb-1">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={member.role}
                      onChange={(e) =>
                        updateTeamMember(index, { role: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold mb-1">Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={member.desc}
                      onChange={(e) =>
                        updateTeamMember(index, { desc: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-1 d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeTeamMember(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={handleSave}>
        Save About page
      </button>
    </div>
  );
}

function ServicesEditor() {
  const [blocks, setBlocks] = useState(() => loadServicesFromStorage());

  useEffect(() => {
    setBlocks(loadServicesFromStorage());
  }, []);

  const updateBlock = (index, patch) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, ...patch } : b)));
  };

  const addBlock = () => {
    setBlocks((prev) => [
      ...prev,
      {
        id: `block-${Date.now()}`,
        title: "New block",
        slug: "",
        description: "",
        image: "",
        layout: prev.length % 2 === 0 ? "image-left" : "image-right",
      },
    ]);
  };

  const removeBlock = (index) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImage = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateBlock(index, { image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveServicesToStorage(blocks);
    alert("Services blocks saved for this browser.");
  };

  return (
    <div>
      <h1 className="h3 mb-3">Services page</h1>
      <p className="text-secondary mb-4" style={{ maxWidth: 640 }}>
        Manage each services block for Educational, Entertainment, Games, Sports and any new blocks
        you add. Uploaded images are stored as browser data URLs.
      </p>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Service blocks</h2>
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={addBlock}>
          Add block
        </button>
      </div>

      {blocks.map((block, index) => (
        <div key={block.id || index} className="card shadow-sm mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-semibold">Block {index + 1}</span>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeBlock(index)}
              >
                Delete
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-4 text-center">
                {block.image && (
                  <img
                    src={block.image}
                    alt={block.title}
                    className="img-fluid rounded mb-2"
                    style={{ maxHeight: 140, objectFit: "cover" }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="form-control form-control-sm"
                  onChange={(e) => handleImage(index, e.target.files?.[0] || null)}
                />
              </div>
              <div className="col-md-8">
                <div className="mb-2">
                  <label className="form-label fw-semibold mb-1">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={block.title}
                    onChange={(e) => updateBlock(index, { title: e.target.value })}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label fw-semibold mb-1">
                    Link slug (optional, e.g. /games)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={block.slug}
                    onChange={(e) => updateBlock(index, { slug: e.target.value })}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label fw-semibold mb-1">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={block.description}
                    onChange={(e) =>
                      updateBlock(index, { description: e.target.value })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label fw-semibold mb-1">Layout</label>
                  <select
                    className="form-select"
                    value={block.layout || "image-left"}
                    onChange={(e) => updateBlock(index, { layout: e.target.value })}
                  >
                    <option value="image-left">Image left, text right</option>
                    <option value="image-right">Text left, image right</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="btn btn-primary" onClick={handleSave}>
        Save services
      </button>
    </div>
  );
}

function ContactEditor() {
  return (
    <div>
      <h1 className="h3 mb-3">Contact page</h1>
      <p className="text-secondary">
        The contact page currently sends emails via EmailJS. If you want editable copy or contact
        details here, we can attach them to local storage similar to the About page.
      </p>
    </div>
  );
}

function CareersEditor() {
  return (
    <div>
      <h1 className="h3 mb-3">Careers page</h1>
      <p className="text-secondary">
        Careers copy is still static. We can move it into editable fields and local storage from
        this panel in a follow-up step.
      </p>
    </div>
  );
}

export default AdminDashboard;
