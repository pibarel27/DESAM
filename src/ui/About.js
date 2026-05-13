import React, { useEffect, useState } from "react";
import AOS from "aos";
import { loadAboutFromStorage, saveAboutToStorage } from "./aboutStorage";
import "aos/dist/aos.css";

import wakat from "../img/wakat.jpg";
import abtHeader from "../img/about-header.jpg";

import InnerHeaderBanner from "../components/InnerHeaderBanner";
import InnerHeader from "../components/InnerHeader";
import Footer from "../components/Footer";

const About = ({ isAdmin }) => {
  const [editingSection, setEditingSection] = useState(null);

  const [aboutText, setAboutText] = useState([]);
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [values, setValues] = useState("");
  const [team, setTeam] = useState([]);

  // 🔹 AOS Init
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 80,
    });
  }, []);

  useEffect(() => {
    const data = loadAboutFromStorage();
    setAboutText(data.aboutText);
    setVision(data.vision);
    setMission(data.mission);
    setValues(data.values);
    setTeam(data.team);
  }, []);

  const saveData = () => {
    saveAboutToStorage({ aboutText, vision, mission, values, team });
    alert("Saved to this browser.");
    setEditingSection(null);
  };

  const handleAboutChange = (index, value) => {
    const updated = [...aboutText];
    updated[index] = value;
    setAboutText(updated);
  };

  return (
    <>
      <InnerHeader />
      <InnerHeaderBanner name="About Us" img={abtHeader} />

      <main>
        {/* ================= ABOUT SECTION ================= */}
        <section className="about">
          <div className="container">
            <div className="section-header" data-aos="fade-down" data-aos-delay="100">
              <h2>Meyamgi Desam</h2>
            </div>

            <div className="row gy-4 align-items-center">
              <div className="col-lg-6" data-aos="fade-right" data-aos-delay="150">
                <img src={wakat} className="img-fluid" alt="About" />
              </div>

              <div className="col-lg-6" data-aos="fade-left" data-aos-delay="150">
                {aboutText.map((line, idx) =>
                  editingSection === "about" ? (
                    <textarea
                      key={idx}
                      value={line}
                      onChange={(e) =>
                        handleAboutChange(idx, e.target.value)
                      }
                      className="form-control mb-2"
                    />
                  ) : (
                    <p key={idx}>{line}</p>
                  )
                )}
              </div>
            </div>

            {isAdmin && (
              <div style={{ textAlign: "right", marginTop: "15px" }}>
                {editingSection === "about" && (
                  <button
                    className="btn btn-success me-2"
                    onClick={saveData}
                  >
                    Save
                  </button>
                )}

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setEditingSection(
                      editingSection === "about" ? null : "about"
                    )
                  }
                >
                  {editingSection === "about" ? "Done" : "Edit"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ================= VISION SECTION ================= */}
        <section className="vision py-5">
          <div className="container">
            <div className="section-header text-center mb-5" data-aos="fade-down">
              <h2>Our Direction</h2>
              <p>Vision, Mission & Values</p>
            </div>

            <div className="row gy-4 justify-content-center">
              {[
                { title: "Vision", key: "vision", icon: "bi-binoculars" },
                { title: "Mission", key: "mission", icon: "bi-target" },
                { title: "Values", key: "values", icon: "bi-heart" },
              ].map((item, index) => (
                <div
                  className="col-lg-4 col-md-6"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={`${150 + index * 100}`}
                >
                  <div className="vision-card">
                    <div className="vision-card-icon">
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <div className="vision-card-body">
                      <h4 className="vision-card-title">{item.title}</h4>

                      {editingSection === "vision" ? (
                        <textarea
                          value={
                            item.key === "vision"
                              ? vision
                              : item.key === "mission"
                              ? mission
                              : values
                          }
                          onChange={(e) =>
                            item.key === "vision"
                              ? setVision(e.target.value)
                              : item.key === "mission"
                              ? setMission(e.target.value)
                              : setValues(e.target.value)
                          }
                          className="form-control"
                          rows={4}
                        />
                      ) : (
                        <p className="vision-card-text">
                          {item.key === "vision"
                            ? vision
                            : item.key === "mission"
                            ? mission
                            : values}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isAdmin && (
              <div className="text-center mt-5">
                {editingSection === "vision" && (
                  <button className="btn btn-success me-2" onClick={saveData}>
                    Save
                  </button>
                )}

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setEditingSection(
                      editingSection === "vision" ? null : "vision"
                    )
                  }
                >
                  {editingSection === "vision" ? "Done" : "Edit"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ================= TEAM SECTION ================= */}
        <section className="management light-bg">
          <div className="container">
            <div className="section-header">
              <h2>Our Team</h2>
            </div>

            <div className="row gy-4">
              {team.map((member, idx) => (
                <div className="col-lg-6" key={idx} data-aos="fade-up" data-aos-delay={`${150 + idx * 100}`}>
                  <div className="row align-items-center">
                    <div className="col-4" data-aos="zoom-in" data-aos-delay="200">
                      <img
                        src={member.img}
                        className="img-fluid"
                        alt={member.name}
                      />
                    </div>

                    <div className="col-8">
                      {editingSection === "team" ? (
                        <>
                          <input
                            type="text"
                            value={member.name}
                            placeholder="Name"
                            className="form-control mb-2"
                            onChange={(e) => {
                              const updated = [...team];
                              updated[idx].name = e.target.value;
                              setTeam(updated);
                            }}
                          />

                          <input
                            type="text"
                            value={member.role}
                            placeholder="Role"
                            className="form-control mb-2"
                            onChange={(e) => {
                              const updated = [...team];
                              updated[idx].role = e.target.value;
                              setTeam(updated);
                            }}
                          />

                          <textarea
                            value={member.desc}
                            placeholder="Description"
                            className="form-control mb-2"
                            onChange={(e) => {
                              const updated = [...team];
                              updated[idx].desc = e.target.value;
                              setTeam(updated);
                            }}
                          />

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              const updated = team.filter(
                                (_, i) => i !== idx
                              );
                              setTeam(updated);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <h4>{member.name}</h4>
                          <span>{member.role}</span>
                          <p>{member.desc}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isAdmin && (
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                {editingSection === "team" && (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={saveData}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary me-2"
                      onClick={() =>
                        setTeam([
                          ...team,
                          { name: "", role: "", desc: "", img: "" },
                        ])
                      }
                    >
                      Add Team Member
                    </button>
                  </>
                )}

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setEditingSection(
                      editingSection === "team" ? null : "team"
                    )
                  }
                >
                  {editingSection === "team" ? "Done" : "Edit"}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
