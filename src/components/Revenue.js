import React from 'react'
import { Link } from 'react-router-dom'

import revenue from '../img/revenue.png'

const Revenue = () => {
  return (
    <>
        <section id="features" className="features">
        <div className="details">
          <div className="container" data-aos="fade-up" data-aos-delay="300">
            <div className="row">
              <div className="col-md-7">
                <h4>CUET Coaching</h4>
                <p>#DESAM_MUC na sinduna PG tougadaba maheiroi singgidamak Common University Entrance Test ki Coaching Houdokkhre. @Johnstone_Higher_secondary_School.</p>
                <p> Our abreast technology trends and unabating innovation has always enhanced the business impact for our clients resulting in happy faces seeing the revenue graph.</p>
                
                <Link to="/about" className="btn-get-started">Read More</Link>
              </div>
              <div className="col-lg-5 position-relative" data-aos="fade-up" data-aos-delay="200">
                <div className="phone-wrap">
                  <img src={revenue} alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Revenue