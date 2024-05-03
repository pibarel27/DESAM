import React from 'react'
import AOS from "aos";
import '../../node_modules/aos/dist/aos.css'
import wakat from '../img/wakat.jpg'
import somorjit from '../img/team/somorjit.png';
import nila from '../img/team/nila.png';
import InnerHeaderBanner from '../components/InnerHeaderBanner';
import InnerHeader from '../components/InnerHeader';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import abtHeader from '../img/about-header.jpg'
import { useEffect } from 'react';

const About = () => {
   useEffect(() => {
      AOS.init();
      AOS.refresh();
    }, []);
  
  return (
    <>
   <InnerHeader />
   <InnerHeaderBanner name={"About Us"} img = {abtHeader}/>

     <main id="main">   
      <section id="about" className="about">
         <div className="container" data-aos="fade-up">
            <div className="section-header">
               <h2>Meyamgi Desam</h2>
            </div>
            <div className="row gy-4 align-items-center" data-aos="fade-up">
               <div className="col-lg-6">
                  <img src={wakat} className="img-fluid" alt="Helping Clients achieve their Vision" title="Helping Clients achieve their Vision" />
               </div>
               <div className="col-lg-6">
                  <p>Aphaba Maheiroi</p>
                  <p>Aphaba Khunai</p>
                  <p>Aphaba Tunglamchat ki Meerol ama semba haiba cda.</p>
                  <p>Lairik tamba hourakpada chumna sengna wachat wanom yaodaba corruption yaodana achumba lambida Lairik tamhansi.</p>
               </div>
            </div>
         </div>
      </section>
    
      <div id="vision" className="vision aos-init" data-aos="fade-up" data-aos-delay="300">
         <div className="container">
            <div className="row gy-4">
               <div className="col-lg-4 aos-init">
                  <div className="card-item">
                     <div className="row">
                        <div className="col-xl-12">
                           <div className="card-body">
                              <h4 className="card-title"> Vision</h4>
                              <p>To bring quality education in Manipur</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
              
               <div className="col-lg-4 aos-init">
                  <div className="card-item">
                     <div className="row">
                        <div className="col-xl-12">
                           <div className="card-body">
                              <h4 className="card-title"> Mission</h4>
                              <p>UNITE AND STRUGGLE TO SURVIVE</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
              
               <div className="col-lg-4 aos-init" data-aos="fade-up" data-aos-delay="300">
                  <div className="card-item">
                     <div className="row">
                        <div className="col-xl-12">
                           <div className="card-body">
                              <h4 className="card-title">Our Values</h4>
                              <p> Our organization is driven by our consumer focus, creativity, resourcefulness, and entrepreneurial spirit. We are an inspired diverse team, we respect and value everyone's contribution.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
              
            </div>
         </div>
      </div>
  
      <section id="management" className="management light-bg aos-init" data-aos="fade-up" data-aos-delay="300">
         <div className="container">
            <div className="section-header">
               <h2>Our Team</h2>
               <p>Leveraging their vast experience within the society value added services schools/university, DESAM leadership team is dedicated to meet and exceed students expectations with innovative and cost-effective solutions, schools/university know-how and unmatched services.</p>
            </div>
            <div className="row member d-flex align-items-center ">
               <div className="col-md-2">
                  <div className="pic"><img src={somorjit} className="img-fluid" alt=""/></div>
               </div>
               <div className="col-md-10">
                  <div className="member-info">
                     <h4>Somorjit Luwang</h4>
                     <span>President</span>
                     <p>Master in Psychology Manipur University.</p>
                     <div className="social">
                     <Link to ="https://www.instagram.com/somorjit_luwang/"><i className="bi bi-instagram"></i></Link>                
                     <Link to ="https://www.facebook.com/somorjit.luwang.52"> <i className="bi bi-facebook"></i> </Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row member d-flex align-items-center mt-4">
               <div className="col-md-2">
                  <div className="pic"><img src={nila} className="img-fluid" alt="" /></div>
               </div>
               <div className="col-md-10">
                  <div className="member-info">
                     <h4>Heikrujam Nilakanta </h4>
                     <span>Vice president</span>
                     <p>PhD. Scholar Biotech</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   
   </main>
   <Footer/>
    
    </>
  )
}

export default About