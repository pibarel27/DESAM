import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const ServiceList = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <style>
        {`
          .services-list {
            padding: 80px 0;
            background: #f9f9f9;
          }

          .section-header h2 {
            font-weight: 700;
            margin-bottom: 15px;
          }

          .section-header p {
            color: #666;
            max-width: 700px;
            margin: auto;
          }

          .single-service {
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            transition: all 0.4s ease;
            height: 100%;
          }

          .single-service:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          }

          .single-service h4 {
            margin-top: 15px;
            font-weight: 600;
          }

          .single-service p {
            font-size: 14px;
            color: #666;
          }

          .btn-read {
            display: inline-block;
            margin-top: 10px;
            padding: 6px 15px;
            border-radius: 20px;
            font-size: 13px;
            text-decoration: none;
            border: 1px solid #333;
            transition: 0.3s;
          }

          .btn-read:hover {
            background: #333;
            color: #fff;
          }

          @media (max-width: 768px) {
            .services-list {
              padding: 50px 15px;
            }

            .single-service {
              padding: 20px;
            }

            .section-header p {
              font-size: 14px;
            }
          }
        `}
      </style>

      <section id="services-list" className="services-list">
        <div className="container">

          <div className="section-header text-center" data-aos="fade-down">
            <h2>What we do?</h2>
            <p>
              We further enhance the academic experience by helping you build
              critical thinking skills, problem-solving ability, and leadership
              development in real-world settings.
            </p>
          </div>

          <div className="row g-4 mt-4">

            {/* 1 */}
            <div className="col-lg-6 col-md-6 col-12" data-aos="fade-right">
              <div className="single-service">
                <i className="bi bi-book fs-1" style={{ color: "#f57813" }}></i>
                <h4>
                  <Link to="/services">Educational Content</Link>
                </h4>
                <p>
                  Education is an investment in human capital that brings
                  tremendous benefits to personal and economic development.
                </p>
                <Link to="/services" className="btn-read">
                  Read More
                </Link>
              </div>
            </div>

            {/* 2 */}
            <div className="col-lg-6 col-md-6 col-12" data-aos="fade-left">
              <div className="single-service">
                <i className="bi bi-collection-play fs-1" style={{ color: "#15a04a" }}></i>
                <h4>
                  <Link to="/services">Entertainment Content</Link>
                </h4>
                <p>
                  Engage with movies, fashion, on-demand videos and more curated
                  for modern digital entertainment lovers.
                </p>
                <Link to="/services" className="btn-read">
                  Read More
                </Link>
              </div>
            </div>

            {/* 3 */}
            <div className="col-lg-6 col-md-6 col-12" data-aos="fade-right">
              <div className="single-service">
                <i className="bi bi-controller fs-1" style={{ color: "#f5cf13" }}></i>
                <h4>
                  <Link to="/services">Games</Link>
                </h4>
                <p>
                  Explore action, adventure, arcade and board games designed
                  for immersive entertainment experiences.
                </p>
                <Link to="/services" className="btn-read">
                  Read More
                </Link>
              </div>
            </div>

            {/* 4 */}
            <div className="col-lg-6 col-md-6 col-12" data-aos="fade-left">
              <div className="single-service">
                <i className="bi bi-universal-access-circle fs-1" style={{ color: "#1335f5" }}></i>
                <h4>
                  <Link to="/services">Sports</Link>
                </h4>
                <p>
                  Learn football, cricket, tennis and more with tutorials
                  covering rules, history and advanced techniques.
                </p>
                <Link to="/services" className="btn-read">
                  Read More
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceList;