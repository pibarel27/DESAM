import React, { useState, useRef } from "react";
import InnerHeaderBanner from "../components/InnerHeaderBanner";
import InnerHeader from "../components/InnerHeader";
import Footer from "../components/Footer";
import contactHeader from "../img/contact-header.jpg";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();

  const [inputFields, setInputFields] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { username, email, subject, message } = inputFields;

  // Validate form fields
  const validateValues = (values) => {
    let errors = {};
    if (values.username.length < 2) errors.username = "Username too short";
    if (values.email.length < 5) errors.email = "Email too short";
    if (values.subject.length < 5) errors.subject = "Subject too short";
    if (values.message.length < 10) errors.message = "Message too short";
    return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateValues(inputFields);
    setErrors(validationErrors);
    setSubmitting(true);

    if (Object.keys(validationErrors).length === 0) {
      emailjs
        .sendForm(
          "service_k80xoyk",
          "template_q6z4pl4",
          form.current,
          "yV95_dZd7WA5uN3f7"
        )
        .then(
          (result) => {
            console.log(result.text);
            console.log("Message sent successfully");
            // Reset fields
            setInputFields({ username: "", email: "", subject: "", message: "" });
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <>
      <InnerHeader />
      <InnerHeaderBanner name={"Contact Us"} img={contactHeader} />
      <main id="main">
        <section id="contact" className="contact">
          <div className="container position-relative" data-aos="fade-up">
            <div className="section-header">
              <h2>Lets have a TALK</h2>
            </div>

            <div className="row gy-4 d-flex justify-content-end">
              <div className="col-lg-5" data-aos="fade-up" data-aos-delay="100">
                <div className="info-item d-flex">
                  <i className="bi bi-geo-alt flex-shrink-0"></i>
                  <div>
                    <h4>Location:</h4>
                    <h5>Manipur, India:</h5>
                    <p>Keishampat, Junction, Imphal West - 795001.</p>
                  </div>
                </div>

                <div className="info-item d-flex">
                  <i className="bi bi-envelope flex-shrink-0"></i>
                  <div>
                    <h4>Email:</h4>
                    <p>
                      <a href="mailto:desamofficial02@gmail.com">desamofficial02@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="info-item d-flex">
                  <i className="bi bi-phone flex-shrink-0"></i>
                  <div>
                    <h4>Call:</h4>
                    <p>+917005291834</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="250">
                <form ref={form} className="php-email-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        onChange={handleChange}
                        value={username}
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Your Name"
                        style={{ border: errors.username ? "1px solid red" : null }}
                      />
                      {errors.username && (
                        <small className="error">{errors.username}</small>
                      )}
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        onChange={handleChange}
                        value={email}
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="E-mail"
                        style={{ border: errors.email ? "1px solid red" : null }}
                      />
                      {errors.email && <small className="error">{errors.email}</small>}
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <input
                      onChange={handleChange}
                      value={subject}
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      style={{ border: errors.subject ? "1px solid red" : null }}
                    />
                    {errors.subject && <small className="error">{errors.subject}</small>}
                  </div>

                  <div className="form-group mt-3">
                    <textarea
                      onChange={handleChange}
                      value={message}
                      className="form-control"
                      name="message"
                      rows="5"
                      placeholder="Message"
                      style={{ border: errors.message ? "1px solid red" : null }}
                    ></textarea>
                    {errors.message && <small className="error">{errors.message}</small>}
                  </div>

                  <p className="text-center">
                    {Object.keys(errors).length === 0 && submitting && (
                      <div className="alert alert-success p-2">Successfully submitted ✓</div>
                    )}
                  </p>

                  <div className="text-center">
                    <button className="btn btn-primary" type="submit">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
