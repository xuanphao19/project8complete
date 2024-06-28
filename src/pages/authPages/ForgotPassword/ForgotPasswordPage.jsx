import React, { useRef, useCallback, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { Row, Col, FormCheck, Button } from "react-bootstrap";

import { MainSection, FormInput, IconSvg, LoadingSvg } from "@/component";
import { DreamsFly, OpenYourMail, sendPasswordReset } from "@/service";
import { handleQuickTestForm } from "@/utils/";
import { validateForm } from "@/utils/";

const ForgotPasswordPage = () => {
  const inputRef = useRef(null);
  const toastRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [state, setState] = useState({ success: false, checked: false, spinning: false, message: "" });

  const handleFocus = useCallback(() => {
    setState((prev) => ({ ...prev, checked: false, message: "", success: false, spinning: true }));
    setError("");
    setValue("");
  }, []);

  const handleBlur = useCallback((_, value) => {
    setError(value);
  }, []);

  const handleChange = useCallback((_, value) => {
    setValue(value);
  }, []);

  const handleQuickTest = useCallback(() => {
    const email = inputRef.current?.value;
    const validate = validateForm(formRef.current);
    const message = handleQuickTestForm(validate, { email: email }, ["email"]);
    if (message) {
      setError(true);
      setState((prev) => ({ ...prev, message: message, checked: false }));
    } else {
      setState((prev) => ({ ...prev, message: "", success: true, checked: true, spinning: false }));
    }
  }, [formRef.current]);

  const handleSubmit = async () => {
    const email = inputRef.current?.value;
    if (email) {
      const result = await sendPasswordReset(email);
      if (result.success) {
        setState((prev) => ({ ...prev, success: true, message: result.message }));
        handleToggleToast();
      } else {
        setError(true);
        setState((prev) => ({ ...prev, success: false, message: result.message }));
      }
    }
  };

  const gotoEmail = () => {
    handleToggleToast();
    navigate("/login", { replace: true });
  };

  const handleToggleToast = useCallback(() => {
    toastRef.current?.toggleToast();
  }, [toastRef.current]);

  const handleReset = (event) => {
    event.preventDefault();
    setState({ success: false, checked: false, spinning: false, message: "" });
    setError("");
    setValue("");
  };

  return (
    <MainSection
      id="forgotPw"
      name="content"
      className="flex-center mx-auto">
      <Form
        ref={formRef}
        className="form-wraps flex-center w-100 h-75 rounded-4 bg-body position-relative"
        onSubmit={handleSubmit}
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
                  success={state.success}
                  spinning={state.spinning}
                  className={`w-50 pt-5 mt-5`}
                />
              </a>
            </div>
            <h1 className="mx-auto mb-4 py-3 fs-2 text-center text-uppercase ">Forgot Password</h1>

            <DreamsFly
              ref={toastRef}
              direction=""
              width="40rem"
              variant="success"
              showForever={true}
              overlayOpacity={50}
              className="flex-center p-5 rounded-4 border border-1">
              <div className="rounded-4 py-3">
                <div className="message mb-5 py-4 w-100 fs-3 fst-italic">{state.message}</div>
                <Row className="row-col-2">
                  <Col>
                    <Button
                      type="button"
                      className="dreams-ctrl btn-outline-warning text-warning cancel-mail w-100 fs-3 rounded-4"
                      onClick={handleToggleToast}>
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <OpenYourMail
                      email={value}
                      className="dreams-ctrl goto-mail w-100 fs-3 text-light border flex-center rounded-4"
                      onClose={gotoEmail}
                    />
                  </Col>
                </Row>
              </div>
            </DreamsFly>

            <FormInput
              ref={inputRef}
              id="email"
              label="Email:"
              type={"text"}
              value={value}
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
                className="remember d-flex align-items-center gap-3 fs-4 fst-italic user-select-none"
                type="checkbox"
                label={
                  <span>
                    Gửi cho tôi Email đặt lại mật khẩu! <span className="fs-2 text-danger">* </span>
                  </span>
                }
                required={true}
                checked={state.checked}
                onChange={handleQuickTest}
              />

              {!state.success && state.message && (
                <span className="error-message position-absolute start-0 top-100 px-4 pb-1 w-100 text-bg-danger fs-4 fst-italic rounded-2">
                  {state.message}
                </span>
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
  );
};

export default ForgotPasswordPage;
