import React, { useRef, useCallback, useState } from "react";
import { Form, Link } from "react-router-dom";
import { Row, Col, FormCheck, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

import { MainSection, FormInput, IconSvg, LoadingSvg } from "@/component";
import { handleQuickTestForm } from "@/utils/";

const ForgotPasswordPage = () => {
  const [error, setError] = useState("");
  const eRef = useRef(null);
  const formRef = useRef(null);
  const user = useSelector((state) => state.app.user);
  const { email, reminder, isAgreeTerms, sentToEmail, authed } = user;

  const handleFocus = useCallback((event) => {
    user.reminder = "";
    user.sentToEmail = false;
    user.isAgreeTerms = false;
    user[event.target.id] = "";
    dispatch(actionChangeInfo(user));
    setError("");
  });

  const handleBlur = useCallback((msg) => {
    setError(msg);
  });

  const handleChange = useCallback((id, value) => {
    user[id] = value;
    dispatch(actionChangeInfo(user));
  });

  const handleQuickTest = () => {
    const isError = formRef.current.querySelector(".error");
    const message = handleQuickTestForm(isError, { email });

    user.reminder = message;
    user.isAgreeTerms = !message;
    dispatch(actionChangeInfo(user));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email || reminder) {
      return;
    } else {
      // Xử lý logic login and:
      formRef.current.reset();
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    dispatch(
      actionChangeInfo({
        ...user,
        email: "",
        reminder: "",
        isAgreeTerms: false,
        sentToEmail: true,
        authed: true,
      }),
    );
  };

  return (
    <>
      <MainSection
        id="forgotPw"
        name="content"
        className="flex-center mx-auto">
        <Form
          ref={formRef}
          className="form-wraps flex-center w-100 h-75 rounded-4 bg-body position-relative"
          onSubmit={handleLogin}
          onReset={handleReset}>
          <Row className="w-100 hidden-print">
            <Col
              className={`mx-auto mb-5 pb-5 px-5`}
              xs={11}>
              <div className="brands flex-center w-100 gap-4">
                <a
                  href="https://www.youtube.com/channel/UCxvQ4j_oWcUrUkGbHWs4dLw"
                  target="_blank"
                  rel="noopener noreferrer">
                  <LoadingSvg
                    error={error}
                    success={!!sentToEmail}
                    spinning={email !== ""}
                    className={`w-50 pt-5 mt-5`}
                  />
                </a>
              </div>
              <h1 className="mx-auto mb-4 py-3 fs-2 text-center text-uppercase ">Forgot Password</h1>
              {sentToEmail && <Alert variant="success">"Đã gửi Mã xác nhận lại Mật Khẩu"!</Alert>}
              <FormInput
                ref={eRef}
                id="email"
                label="Email:"
                type={"text"}
                value={email}
                placeholder="Enter email"
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
                required={true}
                switchIcon={
                  <IconSvg
                    link="envelope"
                    className="icon-ctrl text-primary fs-3"
                  />
                }
              />
              <div className="quick-test pb-3 position-relative">
                <FormCheck
                  id="agree"
                  className="remember d-flex align-items-center gap-3 fs-4 fst-italic"
                  type="checkbox"
                  label={
                    <span>
                      Gửi cho tôi Email đặt lại mật khẩu! <span className="fs-2 text-danger">* </span>
                    </span>
                  }
                  required={true}
                  checked={isAgreeTerms}
                  onChange={handleQuickTest}
                />
                {reminder && (
                  <span className="error position-absolute start-0 top-100 px-4 pb-1 w-100 text-bg-danger fs-4 fst-italic rounded-2">{reminder}</span>
                )}
              </div>
              <div className="d-flex gap-4 mt-5">
                <Button
                  type="submit"
                  className="w-50 py-3 fs-4"
                  variant="primary">
                  Gửi Mail
                </Button>
                <Link
                  className="btn btn-outline-primary w-50 py-3 fs-4"
                  to="/login">
                  Quay lại Login
                </Link>
              </div>
              <Link
                className="d-flex gap-4 mt-3 mb-5 fs-4 fst-italic mt-4"
                to="/">
                Tôi muốn quay lại trang chủ!
              </Link>
            </Col>
          </Row>
        </Form>
      </MainSection>
    </>
  );
};

export default ForgotPasswordPage;
