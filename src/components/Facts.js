import React from 'react'

const Facts = () => {
  return (
    <>
  
      <section id="facts" className="facts">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="section-header">
                <h2 className="text-white">Our Footprints</h2>
                <p>Delivering service excellence to over 43 million Happy Customers across geography… </p>
              </div>
              <div className="row counters">
                <div className="col-lg-4 col-6 text-center">
                  <span  className="purecounter">5</span>
                  <h3> BRANCH </h3>
                </div>
                <div className="col-lg-4 col-6 text-center">
                  <span className="purecounter">1000+</span>
                  <h3> Members </h3>
                  <p>Across the Globe</p>
                </div>
                <div className="col-lg-4 col-6 text-center">
                  <span  className="purecounter">43</span>
                  <h3> Thousand USERS</h3>
                  <p>Monthly Users (Active Base) </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Facts