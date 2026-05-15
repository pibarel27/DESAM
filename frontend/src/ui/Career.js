import React, { useEffect, useState } from "react";
import { loadCareerFromStorage, saveCareerToStorage } from "./careerStorage";
import careerHeader from "../img/blog-header.jpg";
// import InnerHeaderBanner from "../components/InnerHeaderBanner";
// import InnerHeader from "../components/InnerHeader";
// import Footer from "../components/Footer";

const Career = ({ isAdmin }) => {
  const [editMode, setEditMode] = useState(false);
  const [career, setCareer] = useState(() => loadCareerFromStorage());

  useEffect(() => {
    setCareer(loadCareerFromStorage());
  }, []);

  return (
    <>
      {/* <InnerHeader />
      <InnerHeaderBanner name={"Careers"} img={careerHeader} /> */}

      <main id="main">
        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>{career.title}</h2>
            </div>

            <div className="row gy-4 blog-details">
              <div className="col-lg-6">
                  <img
                    src={career.image}
                    className="img-fluid"
                    alt="Do what you LOVE, Inviting you to build a great future with us"
                    title="Do what you LOVE, Inviting you to build a great future with us"
                  />
              </div>
              <div className="col-lg-6">
                {
                  career.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                }
                <div className="content">
                  <blockquote>
                    <p>
                      Please send your resume to{" "}
                      <a href={`mailto:${career.contactEmail}`}>{career.contactEmail}</a>
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Career;
