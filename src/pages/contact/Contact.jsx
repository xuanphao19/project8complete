import React, { useState } from "react";
import { Col, Row, Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { MainSection, IconSvg } from "@/component";

const Contact = () => {
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  return (
    <MainSection
      id="contact"
      className="container-fluid py-6"
      name="section">
      <div className="container bg-body py-3 text-center">
        <div className="section-title">
          <h2 className="d-inline-flex py-3 px-4 fs-3 text-primary bg-primary bg-opacity-10 rounded-pill">Contact</h2>
          <h3 className="py-3">
            <span className="fs-2 fw-semibold text-uppercase text-primary">Contact Us</span>
          </h3>
          <p className="m-auto col col-md-8 col-lg-6 col-xxl-5 fs-4 fw-lighter text-body">
            Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.
          </p>
        </div>

        <div className="content">
          <Row className="py-5">
            <Col className="col-12 col-sm-10 col-lg-6 mx-auto">
              <div className="p-4 rounded-4 border shadow">
                <IconSvg
                  link="map-pin"
                  className="icon-ctrl p-3 fs-12 bg-info-subtle bg-opacity-25 border border-info border-opacity-50 rounded-pill"
                />
                <h3 className="mt-4 fs-4 fw-lighter">Our Address</h3>
                <p className="mt-2 fs-6 fw-lighter">Yên Bình Yên Nghĩa Hà Nội Việt Nam</p>
              </div>
            </Col>

            <Col className="col-12 col-sm-10 col-md-5 ms-md-auto me-md-0 col-lg-3 mt-5 mt-lg-0 mx-auto">
              <div className="py-4 rounded-4 border shadow">
                <IconSvg
                  link="envelope"
                  className="icon-ctrl p-3 fs-12 bg-warning-subtle bg-opacity-25 border border-warning border-opacity-50 rounded-pill"
                />
                <h3 className="mt-4 fs-4 fw-lighter">Email Us</h3>
                <p className="mt-2 fs-6 fw-lighter">contact@example.com</p>
              </div>
            </Col>

            <Col className="col-12 col-sm-10 col-md-5 me-md-auto ms-md-0 col-lg-3 mt-5 mt-lg-0 mx-auto">
              <div className="py-4 rounded-4 border shadow">
                <IconSvg
                  link="phone-arrow-up-right"
                  className="icon-ctrl p-3 fs-12 bg-info-subtle bg-opacity-25 border border-info border-opacity-50 rounded-pill"
                />
                <h3 className="mt-4 fs-4 fw-lighter">Call Us</h3>
                <p className="mt-2 fs-6 fw-lighter">+ 84 09793 . 51075</p>
              </div>
            </Col>
          </Row>

          <Row className="">
            <Col className="col-12 col-sm-10 col-lg-6 mt-5 mt-lg-0 mx-auto">
              <div className="p-4 border rounded-4 shadow">
                {/* <iframe
                  src="https://maps.google.com/maps?q=Ho%20Chi%20Minh's%20Mausoleum&amp;z=13&amp;output=embed" >
                  </iframe> */}
                <iframe
                  loading="lazy"
                  allowFullScreen=""
                  className="rounded-4 shadow-sm"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, width: "100%", height: "36rem" }}
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d59591.233292426405!2d105.84183843549201!3d21.014589696653157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1715368357754!5m2!1svi!2s"></iframe>
              </div>
            </Col>

            <Col className="col-12 col-sm-10 col-lg-6 mt-5 mt-lg-0 mx-auto">
              <div className="pb-lg-2 pb-4 p-5 border rounded-4 shadow">
                <Form
                  method="post"
                  role="form"
                  className="email-form"
                  style={{ border: 0, width: "100%", height: "36rem" }}>
                  <Row className="row">
                    <FormGroup className="col form-group">
                      <FormControl
                        id="name"
                        //  border-opacity-75
                        className="form-control ps-4 p-3 fs-5 border-secondary-subtle rounded-3 bg-body"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required=""
                        autoComplete="off"
                      />
                    </FormGroup>
                    <FormGroup className="col form-group">
                      <FormControl
                        id="email"
                        className="form-control ps-4 p-3 fs-5 border-secondary-subtle rounded-3 bg-body"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        autoComplete="off"
                        required=""
                      />
                    </FormGroup>
                  </Row>
                  <FormGroup className="form-group mt-4">
                    <FormControl
                      id="subject"
                      className="form-control ps-4 p-3 fs-5 border-secondary-subtle rounded-3 bg-body"
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      autoComplete="off"
                      required=""
                    />
                  </FormGroup>
                  <FormGroup className="form-group mt-5">
                    <textarea
                      id="textarea"
                      className="form-control ps-4 p-3 fs-5 border-secondary-subtle rounded-3 bg-body"
                      name="message"
                      rows="5"
                      placeholder="Message"
                      autoComplete="off"
                      required=""
                      style={{ resize: "none" }}></textarea>
                  </FormGroup>
                  <div className="my-3">
                    {loading && <div className="d-none loading">Loading</div>}
                    {error && <div className="d-none error-message"></div>}
                    {success && <div className="d-none sent-message">Your message has been sent. Thank you!</div>}
                  </div>
                  <Button
                    size="lg"
                    variant="outline-primary"
                    className="fs-3 py-3 px-5 mt-4"
                    type="button">
                    Send Message
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </MainSection>
  );
};

export default Contact;
