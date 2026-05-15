import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

// import InnerHeaderBanner from "../components/InnerHeaderBanner";
// import InnerHeader from "../components/InnerHeader";
// import Footer from "../components/Footer";
import serviceHeader from "../img/services-header.jpg";

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 80,
    });
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/service`
      );

      if (response.data.services) {
        setServices(response.data.services);
        console.log(response.data.services);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <>
      {/* <InnerHeader />
      <InnerHeaderBanner name="Services" img={serviceHeader} /> */}

      <main id="main">
        <section id="services-list" className="services-list">
          <div className="container" data-aos="fade-up">
            <div
              className="section-header"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <h2>
                We are a
                <span style={{ color: "#155bd5" }}>
                  {" "}
                  STUDENTS ORGANIZATION
                </span>{" "}
                in Manipur, offering services across multiple domains.
              </h2>
            </div>

            {services.map((service, index) => {
              const isImageLeft = index % 2 === 0;

              return (
                <div
                  key={service._id}
                  className={`row gy-5 align-items-center ${
                    index === 0 ? "pt-5" : ""
                  } ${index % 2 !== 0 ? "light-bg" : ""}`}
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                >
                  {/* IMAGE LEFT */}
                  {isImageLeft && (
                    <div className="col-lg-5 col-md-6 service-item">
                      {service.photo && (
                        <img
                          src={service.photo}
                          className="img-fluid"
                          alt={service.heading}
                        />
                      )}
                    </div>
                  )}

                  {/* TEXT CONTENT */}
                  <div className="col-lg-7 col-md-6 service-item">
                    <div className="icon flex-shrink-0">
                      <i
                        className="bi bi-collection-play"
                        style={{ color: "#155bd5" }}
                      ></i>
                    </div>

                    <div>
                      <h4 className="title">{service.heading}</h4>
                      <p className="description">{service.description}</p>
                    </div>
                  </div>

                  {/* IMAGE RIGHT */}
                  {!isImageLeft && (
                    <div className="col-lg-5 col-md-6 service-item order-first order-sm-last">
                      {service.photo && (
                        <img
                          src={service.photo}
                          className="img-fluid"
                          alt={service.heading}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default Service;