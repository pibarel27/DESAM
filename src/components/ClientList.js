import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import amsu from "../img/clients/amsu.jpg";
import ksa from "../img/clients/ksa.jpg";
import msf from "../img/clients/msf.jpg";
import suk from "../img/clients/suk.jpg";

const ClientList = () => {
  return (
    <>
      <section id="clients" className="clients">
        <div className="container" data-aos="zoom-out">
          <div className="section-header">
            <h2>Our Family</h2>
          </div>
          <div className="clients-slider swiper">
            <Swiper
              modules={[Autoplay]}
              //spaceBetween={15}
              //slidesPerView={6}
              autoplay={{
                delay: 1500,
                disableOnInteraction: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
              }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              <SwiperSlide>
                <img src={amsu} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={ksa} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={msf} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={suk} className="img-fluid" alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientList;
