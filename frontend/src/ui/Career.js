import React, { useEffect, useState } from "react";
import { loadCareerFromStorage, saveCareerToStorage } from "./careerStorage";
import careerHeader from "../img/blog-header.jpg";
import InnerHeaderBanner from "../components/InnerHeaderBanner";
import InnerHeader from "../components/InnerHeader";
import Footer from "../components/Footer";

const Career = ({ isAdmin }) => {
  const [editMode, setEditMode] = useState(false);
  const [career, setCareer] = useState(() => loadCareerFromStorage());

  useEffect(() => {
    setCareer(loadCareerFromStorage());
  }, []);

  const handleTitleChange = (e) => {
    setCareer({ ...career, title: e.target.value });
  };

  const handleParagraphChange = (index, value) => {
    const updated = [...career.paragraphs];
    updated[index] = value;
    setCareer({ ...career, paragraphs: updated });
  };

  const handleEmailChange = (e) => {
    setCareer({ ...career, contactEmail: e.target.value });
  };

  const handleImageChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCareer({ ...career, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveCareerToStorage(career);
    alert("Career content saved for this browser.");
    setEditMode(false);
  };

  return (
    <>
      <InnerHeader />
      <InnerHeaderBanner name={"Careers"} img={careerHeader} />

      <main id="main">
        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>
                {editMode ? (
                  <textarea
                    value={career.title}
                    onChange={handleTitleChange}
                    className="form-control mb-2"
                    rows={2}
                  />
                ) : (
                  career.title
                )}
              </h2>
            </div>

            <div className="row gy-4 blog-details">
              <div className="col-lg-6">
                {editMode ? (
                  <>
                    {career.image && (
                      <img
                        src={career.image}
                        className="img-fluid mb-3 rounded"
                        alt="Career"
                        style={{ maxHeight: 300, objectFit: "cover" }}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control mb-2"
                      onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                    />
                  </>
                ) : (
                  <img
                    src={career.image}
                    className="img-fluid"
                    alt="Do what you LOVE, Inviting you to build a great future with us"
                    title="Do what you LOVE, Inviting you to build a great future with us"
                  />
                )}
              </div>
              <div className="col-lg-6">
                {editMode ? (
                  <>
                    {career.paragraphs.map((para, idx) => (
                      <textarea
                        key={idx}
                        value={para}
                        onChange={(e) => handleParagraphChange(idx, e.target.value)}
                        className="form-control mb-2"
                        rows={3}
                      />
                    ))}
                  </>
                ) : (
                  career.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                )}
                <div className="content">
                  <blockquote>
                    <p>
                      Please send your resume to{" "}
                      {editMode ? (
                        <input
                          type="email"
                          value={career.contactEmail}
                          onChange={handleEmailChange}
                          className="form-control d-inline-block"
                          style={{ width: "auto", marginLeft: "5px" }}
                        />
                      ) : (
                        <a href={`mailto:${career.contactEmail}`}>{career.contactEmail}</a>
                      )}
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="text-center mt-4">
                {editMode ? (
                  <>
                    <button className="btn btn-success me-2" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setCareer(loadCareerFromStorage());
                        setEditMode(false);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Section
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Career;
