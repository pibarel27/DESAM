import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
const Home = lazy(() => import("./ui/Home"));
const Career = lazy(() => import("./ui/Career"));
const Contact = lazy(() => import("./ui/Contact"));
const About = lazy(() => import("./ui/About"));
const Service = lazy(() => import("./ui/Service"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={ <Home/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Service />} />
            <Route path="careers" element={<Career />} />
            <Route path="contact" element={<Contact />} /> 
            <Route path="*" element={<Navigate to="/" />} />       
          </Routes>
        </Suspense>
      </Router> 
    </>
  );
}

export default App;
