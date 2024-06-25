import React, { useRef, useState, useCallback, useEffect } from "react";
import { Row, Col, FormCheck } from "react-bootstrap";
import { Form, Link, useNavigate, redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";

import { MainSection, FormInput, IconSvg, LoadingSvg } from "@/component";
import { handleQuickTestForm } from "@/utils/";

const action = async ({ request, params }) => {
  // chỉ được gọi khi không xử lý sự kiện
  console.log("action str1", request, params);
  return redirect("/products");
};

const Login = () => {
  const eRef = useRef(null);
  const pwRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const { email, password, reminder, isAgreeTerms, sentToEmail, authed } = user;
  const [error, setError] = useState("");

  const handleFocus = useCallback((event) => {
    user.isAgreeTerms = false;
    user[event.target.id] = "";
    user.reminder = "";
    dispatch(actionChangeInfo(user));
    if (event.target.id === eRef.current.id) {
      setError("");
    }
  }, []);

  const handleChange = useCallback((id, value) => {
    user[id] = value;
    dispatch(actionChangeInfo(user));
  }, []);

  const handleBlur = useCallback((msg) => {
    setError(msg);
  });

  const handleQuickTest = () => {
    const isError = formRef.current.querySelector(".error");
    const message = handleQuickTestForm(isError, { email, password });
    user.reminder = message;
    user.isAgreeTerms = !message;
    dispatch(actionChangeInfo(user));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // event.stopPropagation();

    if (!email || !password || reminder) {
      return;
    } else {
      if (!error) {
        formRef.current.reset(event);
        user.sentToEmail = true;
        user.userID = 19;
        user.authed = true;
        dispatch(actionChangeInfo(user));
      }
      // Xử lý logic login and
      navigate("/", { replace: true });
    }
  };

  const handleReset = () => {
    dispatch(
      actionChangeInfo({
        email: "",
        password: "",
        reminder: "",
        isAgreeTerms: false,
        sentToEmail: false,
      }),
    );
    if (pwRef.current) pwRef.current.type = "password";
  };

  return (
    <MainSection
      id="login"
      name="content"
      className="flex-center mx-auto">
      <Form
        method="post"
        ref={formRef}
        className="form-wraps flex-center w-100 h-75 rounded-4 bg-body shadow-lg"
        onSubmit={handleLogin}
        onReset={handleReset}>
        <Row className="py-5 w-100">
          <Col
            className="mx-auto pb-3 px-5"
            xs={11}>
            <h1 className="mx-auto pt-5 pb-4 fs-2 text-center text-uppercase ">member login</h1>
            <LoadingSvg
              thumb="https://files.fullstack.edu.vn/f8-prod/user_avatars/36050/649fc3c653f2c.png"
              icon={null}
              error={error}
              spinning={email !== ""}
              className={`w-25 mb-2`}
            />
            {sentToEmail && (
              <Alert
                variant="success"
                className="d-flex ratio-1x1 justify-content-between">
                Login successful! You will be redirected to the homepage.
                <Link
                  to="/"
                  type="button"
                  className="btn ms-auto fs-4 h-max-content flex-center bg-primary bg-opacity-50 hover-8">
                  <IconSvg link="arrow-right" />
                </Link>
              </Alert>
            )}

            <FormInput
              ref={eRef}
              id="email"
              label="Email"
              type={"text"}
              value={email}
              placeholder="Enter email"
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={(e) => {
                handleFocus(e);
              }}
              required={true}
              switchIcon={
                <IconSvg
                  link="Admin"
                  className="text-danger fs-3"
                />
              }
            />

            <FormInput
              ref={pwRef}
              id="password"
              label="Password"
              type={"password"}
              value={password ? password : "Thtrangge123#@!"}
              placeholder="Enter password"
              onChange={handleChange}
              onFocus={(e) => {
                handleFocus(e);
              }}
              required={true}
              switchIcon={true}
            />

            <div className="quick-test position-relative">
              <FormCheck
                id="agree"
                className="remember d-flex align-items-center gap-3 fs-4 fst-italic"
                type="checkbox"
                label={
                  <span>
                    Ghi nhớ User và Password! <span className="fs-2 text-danger">* </span>
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

            <div className="brands flex-center w-100 py-4 gap-4 fs-2 mb-3">
              <a
                href="https://www.youtube.com/channel/UCxvQ4j_oWcUrUkGbHWs4dLw"
                target="_blank"
                rel="noopener noreferrer">
                <IconSvg
                  link="google-color"
                  className="text-danger"
                />
              </a>
              <a
                href="https://github.com/xuanphao19"
                target="_blank"
                rel="noopener noreferrer">
                <IconSvg className="text-body ms-3" />
              </a>
              <a
                href="https://www.facebook.com/Nguyenthanhhoa075"
                target="_blank"
                rel="noopener noreferrer">
                <IconSvg
                  className="ms-3"
                  link="Facebook_circle"
                />
              </a>
            </div>

            <div className="d-flex gap-4 mt-3">
              <Button
                className="w-50 py-3 fs-4 bg-opacity-50"
                variant="primary"
                type="submit">
                Login
              </Button>

              <Link
                className="btn btn-outline-primary w-50 py-3 fs-4"
                to="/forgotpw">
                Forgot password?
              </Link>
            </div>
            <span className="d-flex fw-light fs-4 gap-4 mt-3">
              Chưa có tài khoản:
              <Link
                className="fs-4 fw-medium fst-italic"
                to="/register">
                Đăng ký Account!
              </Link>
            </span>
            <Link
              className="d-flex gap-4 py-2 mb-3 fs-5 fw-light fst-italic"
              to="/">
              Tôi muốn quay lại trang chủ!
            </Link>
          </Col>
        </Row>
      </Form>
    </MainSection>
  );
};

const BtnLogin = () => {
  const user = useSelector((state) => state.app.user);

  if (user && user.isVip) return;
  return (
    <Link
      to="/login"
      className={`btn btn-login btn-outline-primary flex-center d-none d-md-flex fs-4 py-3 px-5`}>
      Log In
    </Link>
  );
};
//  if (!!userID && authed)

const BtnLogOut = ({ className, onClick }) => {
  const user = useSelector((state) => state.app.user);

  const handleLogOut = () => {
    dispatch(
      actionChangeInfo({
        email: "",
        password: "",
        reminder: "",
        isAgreeTerms: false,
        sentToEmail: false,
        authed: false,
      }),
    );
    onClick && onClick();
  };

  if (user && user.isVip)
    return (
      <Link
        to="/"
        onClick={handleLogOut}
        className={`btn btn-logout text-decoration-none${className ? ` ${className}` : ""}`}>
        Log Out
      </Link>
    );
};

export { BtnLogOut, BtnLogin, action };
export default Login;