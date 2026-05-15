import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loadServicesFromStorage,
  saveServicesToStorage,
} from "../ui/serviceStorage";
import axios from "axios";
import { toast } from "react-toastify";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
  { id: "careers", label: "Careers" },
];

function AdminDashboard({setIsAuth}) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/auth/logout`,
        {},
        { withCredentials: true },
      );
      setIsAuth(false);          
      navigate("/", { replace: true }); 
      toast.success("Admin log out successful");
    } catch (error) {
      console.error("Logout failed:", error.message);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/auth/me`,
          { withCredentials: true }
        );
      } catch (err) {
        navigate("/admin");
      }
    };

    verifyAuth();
  }, []);

  return (
    <div className="min-vh-100 d-flex" style={{ background: "#f4f6f9" }}>
      <aside
        className="bg-white border-end d-flex flex-column"
        style={{ width: 260, minHeight: "100vh" }}
      >
        <div className="p-4 border-bottom">
          <div className="fw-bold fs-5">DESAM Admin</div>
          <div className="small text-muted">Edit all pages from here</div>
        </div>

        <nav className="nav flex-column p-3 gap-1 flex-grow-1">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`btn w-100 text-start mb-1 ${
                activeSection === section.id
                  ? "btn-primary text-white"
                  : "btn-light"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-top">
          <button
            type="button"
            className="btn btn-outline-danger w-100"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-grow-1 p-4 overflow-auto">
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
  const [hero, setHero] = useState({
    title: "",
    motto: "",
    description: "",
  });

  const handleChange = (e) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const fetchHero = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/home/intro`,
      );

      if (response.data.intro) {
        setHero(response.data.intro);
      }
    } catch (error) {
      console.error("Error fetching intro:", error);
      toast.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/home/intro`,
        hero,
      );

      await fetchHero();
      toast.success("Content saved successfully");
    } catch (error) {
      console.error("Error saving intro:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  return (
    <div>
      <h1 className="h3 mb-3">Home page</h1>
      <p className="text-secondary mb-4" style={{ maxWidth: 600 }}>
        Edit the hero title, motto, and description shown at the top of the home
        page.
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

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save hero
          </button>
        </div>
      </div>
    </div>
  );
}

function AboutEditor() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [state, setState] = useState({
    aboutText: "",
    vision: "",
    mission: "",
    values: "",
    team: [],
  });

  const updateField = (field, value) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateTeamMember = (index, patch) => {
    const updatedTeam = state.team.map((member, i) =>
      i === index ? { ...member, ...patch } : member,
    );

    updateField("team", updatedTeam);
  };

  const addTeamMember = () => {
    updateField("team", [
      ...state.team,
      {
        name: "",
        role: "",
        description: "",
        photo: "",
        file: null,
      },
    ]);
  };

  const removeTeamMember = async (index, memberId) => {
    try {
      if (memberId) {
        await axios.delete(
          `${backendUrl}/api/admin/about/team-members/delete`,
          {
            data: {
              ids: [memberId],
            },
          },
        );
      }

      updateField(
        "team",
        state.team.filter((_, i) => i !== index),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleTeamImage = (index, file) => {
    if (!file) return;

    updateTeamMember(index, {
      file,
      photo: URL.createObjectURL(file),
    });
  };

  const fetchAboutText = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/about/about-text`,
      );

      if (response.data.aboutUsText) {
        updateField("aboutText", response.data.aboutUsText.content || "");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/about/overview`,
      );

      if (response.data.overview) {
        setState((prev) => ({
          ...prev,
          vision: response.data.overview.vision || "",
          mission: response.data.overview.mission || "",
          values: response.data.overview.values || "",
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/about/team-members`,
      );

      if (response.data.teamMembers) {
        setState((prev) => ({
          ...prev,
          team: response.data.teamMembers.map((member) => ({
            id: member._id,
            name: member.name,
            role: member.role,
            description: member.description || "",
            photo: member.photo,
            file: null,
          })),
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      // SAVE ABOUT TEXT
      await axios.put(`${backendUrl}/api/admin/about/about-text`, {
        content: state.aboutText,
      });

      // SAVE OVERVIEW
      await axios.put(`${backendUrl}/api/admin/about/overview`, {
        vision: state.vision,
        mission: state.mission,
        values: state.values,
      });

      // SPLIT MEMBERS
      const newMembers = state.team.filter((member) => !member.id);
      const existingMembers = state.team.filter((member) => member.id);

      // CREATE NEW MEMBERS
      if (newMembers.length > 0) {
        const formData = new FormData();

        formData.append(
          "members",
          JSON.stringify(
            newMembers.map((member) => ({
              name: member.name,
              role: member.role,
              description: member.description,
            })),
          ),
        );

        newMembers.forEach((member) => {
          if (member.file) {
            formData.append("photos", member.file);
          }
        });

        await axios.post(
          `${backendUrl}/api/admin/about/team-members/create`,
          formData,
        );
      }

      // UPDATE MEMBERS
      if (existingMembers.length > 0) {
        const formData = new FormData();

        formData.append(
          "updates",
          JSON.stringify(
            existingMembers.map((member) => ({
              id: member.id,
              name: member.name,
              role: member.role,
              description: member.description,
              photo: member.photo,
            })),
          ),
        );

        existingMembers.forEach((member) => {
          if (member.file) {
            formData.append("photos", member.file);
          }
        });

        await axios.put(
          `${backendUrl}/api/admin/about/team-members/update`,
          formData,
        );
      }

      await fetchAboutText();
      await fetchOverview();
      await fetchTeamMembers();

      toast.success("Content saved successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAboutText();
    fetchOverview();
    fetchTeamMembers();
  }, []);

  return (
    <div>
      <h1 className="h3 mb-3">About page</h1>

      {/* ABOUT TEXT */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5>About Us Text</h5>
          <textarea
            rows={6}
            className="form-control"
            value={state.aboutText}
            onChange={(e) => updateField("aboutText", e.target.value)}
          />
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="card shadow-sm mb-4">
        <div className="card-body row g-3">
          <div className="col-md-4">
            <label>Vision</label>
            <textarea
              className="form-control"
              value={state.vision}
              onChange={(e) => updateField("vision", e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label>Mission</label>
            <textarea
              className="form-control"
              value={state.mission}
              onChange={(e) => updateField("mission", e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label>Values</label>
            <textarea
              className="form-control"
              value={state.values}
              onChange={(e) => updateField("values", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TEAM MEMBERS */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <button
            className="btn btn-outline-primary btn-sm mb-3"
            onClick={addTeamMember}
          >
            Add member
          </button>

          {state.team.map((member, index) => (
            <div key={index} className="border rounded p-3 mb-3">
              {member.photo && (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mb-2"
                  style={{ maxHeight: 100 }}
                />
              )}

              <input
                type="file"
                className="form-control mb-2"
                onChange={(e) =>
                  handleTeamImage(index, e.target.files?.[0] || null)
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Name"
                value={member.name}
                onChange={(e) =>
                  updateTeamMember(index, { name: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Role"
                value={member.role}
                onChange={(e) =>
                  updateTeamMember(index, { role: e.target.value })
                }
              />

              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={member.description}
                onChange={(e) =>
                  updateTeamMember(index, {
                    description: e.target.value,
                  })
                }
              />

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeTeamMember(index, member.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        Save About Page
      </button>
    </div>
  );
}

function ServicesEditor() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/service`,
      );

      if (response.data.services) {
        setServices(
          response.data.services.map((service) => ({
            id: service._id,
            heading: service.heading,
            description: service.description,
            photo: service.photo,
            file: null,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error(error.message);
    }
  };

  const updateService = (index, patch) => {
    setServices((prev) =>
      prev.map((service, i) =>
        i === index ? { ...service, ...patch } : service,
      ),
    );
  };

  const addService = () => {
    setServices((prev) => [
      ...prev,
      {
        heading: "",
        description: "",
        photo: "",
        file: null,
      },
    ]);
  };

  const removeService = async (index) => {
    const service = services[index];

    try {
      if (service.id) {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/service/delete`,
          {
            data: {
              ids: [service.id],
            },
          },
        );
      }

      setServices((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleImage = (index, file) => {
    if (!file) return;

    updateService(index, {
      file,
      photo: URL.createObjectURL(file),
    });
  };

  const handleSave = async () => {
    try {
      const existingServices = services.filter((service) => service.id);
      const newServices = services.filter((service) => !service.id);

      // UPDATE EXISTING
      if (existingServices.length > 0) {
        const updateFormData = new FormData();

        updateFormData.append(
          "updates",
          JSON.stringify(
            existingServices.map((service) => ({
              id: service.id,
              photo: service.photo,
              heading: service.heading,
              description: service.description,
            })),
          ),
        );

        existingServices.forEach((service) => {
          if (service.file) {
            updateFormData.append("photos", service.file);
          }
        });

        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/service/update`,
          updateFormData,
        );
      }

      // CREATE NEW
      if (newServices.length > 0) {
        const createFormData = new FormData();

        createFormData.append(
          "services",
          JSON.stringify(
            newServices.map((service) => ({
              heading: service.heading,
              description: service.description,
            })),
          ),
        );

        newServices.forEach((service) => {
          if (service.file) {
            createFormData.append("photos", service.file);
          }
        });

        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/service/create`,
          createFormData,
        );
      }

      await fetchServices();
      toast.error(error.message);
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className="h3 mb-3">Services page</h1>
      <p className="text-secondary mb-4" style={{ maxWidth: 640 }}>
        Manage service blocks and upload images.
      </p>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Services</h2>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={addService}
        >
          Add service
        </button>
      </div>

      {services.map((service, index) => (
        <div key={service.id || index} className="card shadow-sm mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-semibold">Service {index + 1}</span>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeService(index)}
              >
                Delete
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-4 text-center">
                {service.photo && (
                  <img
                    src={service.photo}
                    alt={service.heading}
                    className="img-fluid rounded mb-2"
                    style={{ maxHeight: 140, objectFit: "cover" }}
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    handleImage(index, e.target.files?.[0] || null)
                  }
                />
              </div>

              <div className="col-md-8">
                <div className="mb-2">
                  <label className="form-label fw-semibold">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    value={service.heading}
                    onChange={(e) =>
                      updateService(index, {
                        heading: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    value={service.description}
                    onChange={(e) =>
                      updateService(index, {
                        description: e.target.value,
                      })
                    }
                  />
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
        The contact page currently sends emails via EmailJS. If you want
        editable copy or contact details here, we can attach them to local
        storage similar to the About page.
      </p>
    </div>
  );
}

function CareersEditor() {
  return (
    <div>
      <h1 className="h3 mb-3">Careers page</h1>
      <p className="text-secondary">
        Careers copy is still static. We can move it into editable fields and
        local storage from this panel in a follow-up step.
      </p>
    </div>
  );
}

export default AdminDashboard;
