import React from "react";
import desam from "../img/desam.png";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer
      id="footer"
      style={{
        background: "#f8f9fa",
        padding: "30px 0 10px 0",
        fontSize: "14px",
      }}
    >
      <div className="container">
        <div className="row gy-2">
          
          {/* Logo Section */}
          <div className="col-lg-4 col-md-12">
            <Link to="/" className="d-flex align-items-center mb-2">
              <img
                src={desam}
                alt="DESAM Logo"
                style={{ maxHeight: "80px" }}
              />
            </Link>

            <div className="d-flex gap-3 mt-2">
              <Link to="/" className="text-dark">
                <i className="bi bi-twitter"></i>
              </Link>

              <Link
                to="https://www.facebook.com/DESAM2002"
                className="text-dark"
              >
                <i className="bi bi-facebook"></i>
              </Link>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-6">
            <h5 style={{ marginBottom: "10px" }}>Useful Links</h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ padding: "4px 0" }}>
                <Link to="/">Home</Link>
              </li>
              <li style={{ padding: "4px 0" }}>
                <Link to="/about">About Us</Link>
              </li>
              <li style={{ padding: "4px 0" }}>
                <Link to="/services">Services</Link>
              </li>
              <li style={{ padding: "4px 0" }}>
                <Link to="/careers">Careers</Link>
              </li>
              <li style={{ padding: "4px 0" }}>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="col-lg-3 col-6">
            <h5 style={{ marginBottom: "10px" }}>Our Services</h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ padding: "4px 0" }}>
                <HashLink smooth to="/services/#Educational-content">
                  Educational Content
                </HashLink>
              </li>
              <li style={{ padding: "4px 0" }}>
                <HashLink smooth to="/services/#Entertainment-content">
                  Entertainment Content
                </HashLink>
              </li>
              <li style={{ padding: "4px 0" }}>
                <HashLink smooth to="/services/#Games">
                  Games
                </HashLink>
              </li>
              <li style={{ padding: "4px 0" }}>
                <HashLink smooth to="/services/#Sports">
                  Sports
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-lg-3 col-md-12">
            <h5 style={{ marginBottom: "10px" }}>Contact Us</h5>
            <address style={{ lineHeight: "1.6", marginBottom: 0 }}>
              Keishampat, Junction <br />
              Imphal West, Manipur <br />
              <br />
              <strong>Phone:</strong> +91 7005291834 <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:desamofficial02@gmail.com">
                desamofficial02@gmail.com
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div
        style={{
          borderTop: "1px solid #ddd",
          marginTop: "20px",
          paddingTop: "10px",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        © {new Date().getFullYear()} Copyright DESAM. All Rights Reserved.
        <div>
          <a
            href="https://pibarel.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            Developed by Pibarel Maisnam
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;