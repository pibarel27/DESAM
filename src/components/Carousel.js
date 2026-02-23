import shapeImg from "../img/img-wave2.png";
import desam from "../img/header/desam.png";
import { Link } from "react-router-dom";
import "../../node_modules/react-modal-video/css/modal-video.css";

const Carousel = ({ isAuth }) => {
  return (
    <>
      <section id="hero" className="hero d-flex position-relative">
        <img className="shape" src={shapeImg} alt="#" />
        <div className="container">
          <div
            className="row align-items-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="col-lg-7 col-md-12 col-12">
              <h2 data-aos="fade-up">
                Democratic Students' Alliance Of Manipur
              </h2>

              <blockquote data-aos="fade-up" data-aos-delay="100">
                <p>
                  Our Motto: UNITE AND STRUGGLE TO SURVIVE
                </p>
                <p>
                  DESAM was established on 3rd January 2002 with an aim mainly
                  to bring quality education in Manipur.
                </p>
              </blockquote>

              <div className="d-flex align-items-center gap-3">
                <Link to="/about" className="btn-get-started">
                  Read More
                </Link>

                {/* ✅ Admin Only Edit Button */}
                {isAuth && (
                  <Link to="/admin/edit-hero" className="btn btn-danger">
                    Edit
                  </Link>
                )}
              </div>
            </div>

            <div className="col-lg-5 col-md-12 col-12">
              <div className="header-image">
                <div
                  id="carouselExampleFade"
                  className="carousel slide carousel-fade"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={desam}
                        className="d-block w-100"
                        alt="DESAM"
                      />
                    </div>
                  </div>
                </div>

                {/* ✅ Floating Edit Icon (Optional Alternative) */}
                {isAuth && (
                  <Link
                    to="/admin/edit-hero"
                    className="btn btn-warning position-absolute top-0 end-0 m-3"
                  >
                    Edit Image
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carousel;