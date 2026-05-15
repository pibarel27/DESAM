import { useState, useEffect } from "react";
import shapeImg from "../img/img-wave2.png";
import desam from "../img/header/desam.png";
import { Link } from "react-router-dom";
import "../../node_modules/react-modal-video/css/modal-video.css";
import axios from "axios";

const Carousel = () => {
  const [hero, setHero] = useState({
    title: "",
    motto: "",
    description: "",
  });

  const [editMode, setEditMode] = useState(false);

  // Fetch intro data from backend
  const fetchHero = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/home/intro`);
      
      if(response.data.intro) {
        setHero(response.data.intro)
      }
    } catch (error) {
      console.error("Error fetching intro:", error);
    }
  }

  useEffect(() => {
    fetchHero();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.value,
    });
  };

  // Save updated intro to backend
  const handleSave = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/home/intro`,
        hero
      );

      await fetchHero();
      setEditMode(false);
    } catch (error) {
      console.error("Error saving intro:", error);
    }
  };

  return (
    <section id="hero" className="hero d-flex position-relative">
      <img className="shape" src={shapeImg} alt="#" />

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12 col-12">
            {/* TITLE */}
            {editMode ? (
              <input
                type="text"
                name="title"
                value={hero.title}
                onChange={handleChange}
                className="form-control mb-2"
              />
            ) : (
              <h2>{hero.title}</h2>
            )}

            {/* MOTTO + DESCRIPTION */}
            {editMode ? (
              <>
                <input
                  type="text"
                  name="motto"
                  value={hero.motto}
                  onChange={handleChange}
                  className="form-control mb-2"
                />

                <textarea
                  name="description"
                  value={hero.description}
                  onChange={handleChange}
                  className="form-control"
                />
              </>
            ) : (
              <blockquote>
                <p>{hero.motto}</p>
                <p>{hero.description}</p>
              </blockquote>
            )}

            <div className="d-flex align-items-center gap-3 mt-3">
              <Link to="/about" className="btn-get-started">
                Read More
              </Link>
            </div>
          </div>

          <div className="col-lg-5 col-md-12 col-12">
            <div className="header-image">
              <img src={desam} className="d-block w-100" alt="DESAM" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;