import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import InnerHeaderBanner from "../components/InnerHeaderBanner";
import InnerHeader from "../components/InnerHeader";
import Footer from "../components/Footer";
import serviceHeader from "../img/services-header.jpg";
import { loadServicesFromStorage } from "./serviceStorage";

const Service = () => {
  const [blocks, setBlocks] = useState(() => loadServicesFromStorage());

  useEffect(() => {
    setBlocks(loadServicesFromStorage());
  }, []);

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
      <InnerHeaderBanner name={"Services"} img={serviceHeader} />

      <main id="main">
        <section id="services-list" className="services-list">
          <div className="container" data-aos="fade-up">
            <div className="section-header" data-aos="fade-down" data-aos-delay="100">
              <h2>
                We are a
                <span style={{ color: "#155bd5" }}> STUDENTS ORGANIZATION</span> in
                Manipur, offer Services across Educational Content,
                Entertainment Content, Games, and sports
              </h2>
            </div>

            {blocks.map((block, index) => {
              const isImageLeft = block.layout === "image-left";
              const rowId =
                index === 0
                  ? "Educational-content"
                  : index === 1
                  ? "Entertainment-content"
                  : index === 2
                  ? "Games"
                  : index === 3
                  ? "Sports"
                  : undefined;

              return (
                <div
                  key={block.id || index}
                  className={`row gy-5 align-items-center ${
                    index === 0 ? "pt-5" : ""
                  } ${index % 2 === 1 ? "light-bg" : ""}`}
                  id={rowId}
                  data-aos="fade-up"
                >
                  {isImageLeft && (
                    <div
                      className="col-lg-5 col-md-6 service-item"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      {block.image && (
                        <img src={block.image} className="img-fluid" alt={block.title} />
                      )}
                    </div>
                  )}

                  <div
                    className="col-lg-7 col-md-6 service-item"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="icon flex-shrink-0">
                      <i className="bi bi-collection-play" style={{ color: "#155bd5" }}></i>
                    </div>
                    <div>
                      <h4 className="title">
                        <Link
                          to={`/${block.slug || ""}`}
                          className="text-decoration-none"
                        >
                          {block.title}
                        </Link>
                      </h4>
                      <p className="description">{block.description}</p>
                    </div>
                  </div>

                  {!isImageLeft && (
                    <div
                      className="col-lg-5 col-md-6 service-item order-first order-sm-last"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      {block.image && (
                        <img src={block.image} className="img-fluid" alt={block.title} />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Service;
