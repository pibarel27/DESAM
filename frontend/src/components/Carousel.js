import { useState} from "react";
import axios from "axios";
import shapeImg from "../img/img-wave2.png";
import desam from "../img/header/desam.png";
import { Link } from "react-router-dom";
import "../../node_modules/react-modal-video/css/modal-video.css";

const Carousel = ({ isAuth }) => {

  const [hero, setHero] = useState({
    title: "",
    motto: "",
    description: ""
  });

  const [editMode, setEditMode] = useState(false);

  // ✅ Load data from backend
 

  // ✅ Handle input change
  const handleChange = (e) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  // ✅ Save to backend
  const handleSave = async () => {
    await axios.post("http://localhost:5000/api/hero", hero);
    setEditMode(false);
  };

  return (
    <>
      <section id="hero" className="hero d-flex position-relative">
        <img className="shape" src={shapeImg} alt="#" />
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-7 col-md-12 col-12">

              {/* 🔹 TITLE */}
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

              {/* 🔹 MOTTO + DESCRIPTION */}
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

          {/* ✅ EDIT BUTTON AT END OF SECTION */}
          {isAuth && (
            <div className="text-center mt-4">
              {editMode ? (
                <>
                  <button className="btn btn-success me-2" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditMode(false)}
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
    </>
  );
};

export default Carousel;
