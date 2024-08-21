import shapeImg from "../img/img-wave2.png";
import desam from "../img/header/desam.png";
import { Link } from "react-router-dom";
import '../../node_modules/react-modal-video/css/modal-video.css'

const Carousel = () => {  return (
    <>
      <section id="hero" className="hero d-flex">
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
                <p>Our Motto:: UNITE AND STRUGGLE TO SURVIVE
                  <p>DESAM was established in 3rd January 2002 with an aim mainly to bring quality education in Manipur.</p>
                </p>
              </blockquote>
              <div className="d-flex align-items-center">
                <Link to="/about" className="btn-get-started">
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-12">
              <div className="header-image ">
                <div
                  id="carouselExampleFade"
                  className="carousel slide carousel-fade"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleFade"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleFade"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleFade"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleFade"
                      data-bs-slide-to="3"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div
                      className="carousel-item active">
                      <img src={desam} className="d-block w-100" alt="..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carousel;
