import React from "react";
import InnerHeader from "../components/InnerHeader";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Facts from "../components/Facts";
import ServiceList from "../components/ServiceList";
import Revenue from "../components/Revenue";

const Home = ({ isAuth, setIsAuth }) => {
  
  return (
    <>
<InnerHeader isAuth={isAuth} setIsAuth={setIsAuth} />

      <Carousel isAuth={isAuth} />
      <main id="main">
        <ServiceList isAuth={isAuth} />
        <Facts isAuth={isAuth} />
        <Revenue isAuth={isAuth} />

      </main>

      <Footer />
    </>
  );
};

export default Home;