import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import wakat from "../img/wakat.jpg";
import somorjit from "../img/team/somorjit.png";
import nila from "../img/team/nila.png";
import abtHeader from "../img/about-header.jpg";

import InnerHeaderBanner from "../components/InnerHeaderBanner";
import InnerHeader from "../components/InnerHeader";
import Footer from "../components/Footer";

const About = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 80,
    });
  }, []);

  return (
    <>
      <InnerHeader />
      <InnerHeaderBanner name="About Us" img={abtHeader} />

      <main>

        {/* ABOUT SECTION */}
        <section className="about">
          <div className="container">

            <div className="section-header" data-aos="fade-down">
              <h2>Meyamgi Desam</h2>
            </div>

            <div className="row gy-4 align-items-center">

              <div className="col-lg-6" data-aos="fade-right">
                <img
                  src={wakat}
                  className="img-fluid"
                  alt="Helping Clients achieve their Vision"
                />
              </div>

              <div className="col-lg-6" data-aos="fade-left">
                <p>Aphaba Maheiroi</p>
                <p>Aphaba Khunai</p>
                <p>Aphaba Tunglamchat ki Meerol ama semba haiba cda.</p>
                <p>
                  Lairik tamba hourakpada chumna sengna wachat wanom yaodaba
                  corruption yaodana achumba lambida Lairik tamhansi.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* VISION SECTION */}
        <section className="vision">
          <div className="container">
            <div className="row gy-4">

              <div className="col-lg-4 col-md-6" data-aos="zoom-in">
                <div className="card-item">
                  <div className="card-body">
                    <h4>Vision</h4>
                    <p>To bring quality education in Manipur</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="200">
                <div className="card-item">
                  <div className="card-body">
                    <h4>Mission</h4>
                    <p>UNITE AND STRUGGLE TO SURVIVE</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-12" data-aos="zoom-in" data-aos-delay="400">
                <div className="card-item">
                  <div className="card-body">
                    <h4>Our Values</h4>
                    <p>
                      Driven by creativity, resourcefulness, and consumer focus.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="management light-bg">
          <div className="container">

            <div className="section-header" data-aos="fade-up">
              <h2>Our Team</h2>
              <p>
                DESAM leadership team is dedicated to meet and exceed
                student expectations.
              </p>
            </div>

            <div className="row gy-4">

              {/* PRESIDENT */}
              <div className="col-md-12 col-lg-6" data-aos="fade-right">
                <div className="row align-items-center">
                  <div className="col-4 col-md-3">
                    <img src={somorjit} className="img-fluid" alt="Somorjit" />
                  </div>

                  <div className="col-8 col-md-9">
                    <h4>Somorjit Luwang</h4>
                    <span>President</span>
                    <p>Master in Psychology, Manipur University.</p>
                  </div>
                </div>
              </div>

              {/* VICE PRESIDENT */}
              <div className="col-md-12 col-lg-6" data-aos="fade-left">
                <div className="row align-items-center">
                  <div className="col-4 col-md-3">
                    <img src={nila} className="img-fluid" alt="Nilakanta" />
                  </div>

                  <div className="col-8 col-md-9">
                    <h4>Heikrujam Nilakanta</h4>
                    <span>Vice President</span>
                    <p>PhD Scholar – Biotech</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default About;