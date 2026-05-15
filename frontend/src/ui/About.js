import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import wakat from "../img/wakat.jpg";
import abtHeader from "../img/about-header.jpg";

// import InnerHeaderBanner from "../components/InnerHeaderBanner";
// import InnerHeader from "../components/InnerHeader";
// import Footer from "../components/Footer";

const About = () => {
  const [aboutText, setAboutText] = useState(
    "About content will be added soon."
  );

  const [overview, setOverview] = useState({
    vision: "",
    mission: "",
    values: "",
  });

  const [team, setTeam] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 80,
    });

    fetchAboutUsText();
    fetchOverview();
    fetchTeamMembers();
  }, []);

  const fetchAboutUsText = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/about/about-text`
      );

      if (response.data.aboutUsText) {
        console.log(response.data.aboutUsText);
        setAboutText(response.data.aboutUsText.content);
      }
    } catch (error) {
      console.error("Error fetching about us text:", error);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/about/overview`
      );

      if (response.data.overview) {
        setOverview(response.data.overview);
      }
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/about/team-members`
      );

      if (response.data.teamMembers) {
        setTeam(response.data.teamMembers);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  return (
    <>
      {/* <InnerHeader />
      <InnerHeaderBanner name="About Us" img={abtHeader} /> */}

      <main>
        {/* ABOUT SECTION */}
        <section className="about">
          <div className="container">
            <div
              className="section-header"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <h2>Meyamgi Desam</h2>
            </div>

            <div className="row gy-4 align-items-center">
              <div
                className="col-lg-6"
                data-aos="fade-right"
                data-aos-delay="150"
              >
                <img src={wakat} className="img-fluid" alt="About" />
              </div>

              <div
                className="col-lg-6"
                data-aos="fade-left"
                data-aos-delay="150"
              >
                <p>{aboutText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW SECTION */}
        <section className="vision py-5">
          <div className="container">
            <div
              className="section-header text-center mb-5"
              data-aos="fade-down"
            >
              <h2>Our Direction</h2>
              <p>Vision, Mission & Values</p>
            </div>

            <div className="row gy-4 justify-content-center">
              {[
                {
                  title: "Vision",
                  content: overview.vision,
                  icon: "bi-binoculars",
                },
                {
                  title: "Mission",
                  content: overview.mission,
                  icon: "bi-target",
                },
                {
                  title: "Values",
                  content: overview.values,
                  icon: "bi-heart",
                },
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
                      <p className="vision-card-text">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="management light-bg">
          <div className="container">
            <div className="section-header">
              <h2>Our Team</h2>
            </div>

            <div className="row gy-4">
              {team.map((member, idx) => (
                <div
                  className="col-lg-6"
                  key={member._id || idx}
                  data-aos="fade-up"
                  data-aos-delay={`${150 + idx * 100}`}
                >
                  <div className="row align-items-center">
                    <div
                      className="col-4"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <img
                        src={member.photo}
                        className="img-fluid"
                        alt={member.name}
                      />
                    </div>

                    <div className="col-8">
                      <h4>{member.name}</h4>
                      <span>{member.role}</span>
                      <p>{member.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default About;