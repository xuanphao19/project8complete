// Mã hóa ký tự đặc biệt : encodeURIComponent(value) // => code!
// Loại bỏ ký tự đặc biệt : split("@")[0].replace(/[^a-zA-Z0-9]/g, "")
import React, { Fragment, useRef, useState, useCallback, useEffect } from "react";
import { Form, Link, useNavigate, redirect } from "react-router-dom";
import { Row, Col, FormCheck, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { reduxLogin, getData } from "@/vendor";
import { handleQuickTestForm, validateForm } from "@/utils/";
import { DreamsFly, authUserLogin, logoutUser } from "@/service";
import { MainSection, FormInput, IconSvg, LoadingSvg } from "@/component";
import { formFields, loginFields, socialRegister } from "@/api";
import { routesConfig } from "@/config";
import { ModalVideojs } from "@/video/";
const { home, register, products, forgotpw, login } = routesConfig;

const action = async ({ request, params }) => {
  console.log("action str1", request, params);
  return redirect(`${products}`);
};

const LoginPage = () => {
  const formRef = useRef(null);
  const toastRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [subInfo, setSubInfo] = useState({
    message: "",
    reminder: "",
    isChecked: false,
    spinning: false,
    error: false,
    isVideoPlaying: false,
  });

  const handleFocus = useCallback((name, event) => {
    event.preventDefault();
    setUserInfo((prev) => ({ ...prev, [name]: "" }));
    setSubInfo((prev) => ({ ...prev, [name]: "", error: false, spinning: true, reminder: "" }));
  }, []);

  const handleChange = useCallback((name, value) => {
    setSubInfo((prev) => ({ ...prev, [name]: "", error: false, spinning: true, reminder: "" }));
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback((name, value) => {
    if (value) {
      setSubInfo((prev) => ({ ...prev, [name]: "", error: true }));
    } else if (value === undefined) {
      setSubInfo((prev) => ({ ...prev, spinning: false }));
    }
  }, []);

  const handleQuickTest = () => {
    const message = handleQuickTestForm(validateForm(formRef.current), userInfo, loginFields);
    if (!message && subInfo.isChecked) {
      setSubInfo((prev) => ({ ...prev, isChecked: false }));
    } else if (message) {
      setSubInfo((prev) => ({ ...prev, isChecked: false, reminder: message, error: true }));
      return false;
    } else {
      setSubInfo((prev) => ({ ...prev, isChecked: true, error: false }));
      return true;
    }
  };

  const gotoUsersLogin = async (event) => {
    event.preventDefault();
    const validate = validateForm(formRef.current);
    if (validate) {
      return setSubInfo((prev) => ({ ...prev, reminder: "Có lỗi! Vui lòng Kiểm tra lại!" }));
    }

    const result = await authUserLogin(userInfo.email, userInfo.password, "Chúc mừng bạn đã đăng nhập thành công tài khoản I-💔-F8!");

    if (result && result.success) {
      setUserInfo((prev) => ({ ...prev, ["userId"]: result.localId }));
      setSubInfo((prev) => ({ ...prev, message: result.message, ["success"]: result.success }));

      handleToggleToast();

      return;
    } else if (result.success === false && result.message) {
      let message = "";
      if (result.message.includes("auth/invalid-credential")) {
        message = (
          <div className="pt-3">
            <p>Thông tin đăng nhập không chính xác.</p>
            <p>Vui lòng kiểm tra lại Email or password của bạn!</p>
          </div>
        );
      } else message = result.message;
      setSubInfo((prev) => ({ ...prev, reminder: message }));
    }
  };

  useEffect(() => {
    if (!subInfo.success) return;
    if (subInfo.success === true) {
      const getLocalUser = async () => {
        const localUser = await getData("userData");
        if (localUser && userInfo.userId) {
          const userLogged = { ...localUser, isVip: true };
          dispatch(reduxLogin(userLogged));
        }
      };
      getLocalUser();
    }
  }, [subInfo]);

  const handleReset = () => {
    setUserInfo({ email: "", password: "" });
    setSubInfo({
      message: "",
      reminder: "",
      isChecked: false,
      spinning: false,
      error: false,
      isVideoPlaying: false,
    });
  };

  const resetState = (state) => {
    if (state === false) {
      formRef.current?.reset();
    }
  };

  const handleCloseError = useCallback(() => {
    if (subInfo.reminder === "Email & password is required!") {
      const inputEmail = formRef.current?.querySelector("#email");
      inputEmail?.focus();
    }
    setSubInfo((prev) => ({ ...prev, reminder: "" }));
  }, [subInfo.reminder]);

  const handleToggleToast = () => {
    toastRef.current?.toggleToast();
  };

  const gotoProducts = () => {
    handleToggleToast();
    navigate(`${products}`, { replace: true });
  };

  const resetVideoState = (state) => {
    setSubInfo((prev) => ({ ...prev, isVideoPlaying: state }));
  };

  return (
    <MainSection
      id="login"
      name="content"
      className="flex-center mx-auto">
      <Form
        method="post"
        ref={formRef}
        noValidate
        className="form-wraps flex-center w-100 h-75 rounded-4 bg-body shadow-lg"
        onSubmit={gotoUsersLogin}
        onReset={handleReset}>
        <Row className="py-5 w-100">
          <Col
            className="mx-auto pb-3 px-5"
            xs={11}>
            <h1 className="mx-auto pt-5 pb-4 fs-2 text-center text-uppercase ">member login</h1>
            <LoadingSvg
              thumb="https://files.fullstack.edu.vn/f8-prod/user_avatars/36050/649fc3c653f2c.png"
              icon={null}
              error={subInfo.error}
              spinning={subInfo.spinning}
              className={`w-25 mb-2`}
            />

            {formFields
              .filter((field) => loginFields.includes(field.id))
              .map((field, index) => (
                <FormInput
                  key={"register" + field.id + index}
                  ref={useRef(null)}
                  id={field.id}
                  label={field.label}
                  required={field.required}
                  placeholder={`Enter ${field.label}`}
                  type={`${field.type || "text"}`}
                  autoComplete={field.autoComplete}
                  value={userInfo[field.id]}
                  classGroup="I-💔-F8"
                  classLabel="🌺"
                  classFormCtrl="register-input fs-4 border-dark border-opacity-50 rounded-3 i💔f8"
                  classIcon={field.classIcon}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  onChange={handleChange}
                  switchIcon={field.icon}
                />
              ))}

            <div className="quick-test position-relative">
              <FormCheck
                id="agree"
                className="remember d-flex align-baseline gap-3 fs-4 fst-italic user-select-none"
                type="checkbox"
                label={<span className="cursor-pointer">Ghi nhớ User và Password!</span>}
                checked={subInfo.isChecked}
                onChange={handleQuickTest}
              />

              <DreamsFly
                ref={toastRef}
                direction=""
                variant="warning"
                showForever={true}
                className="login-dream-fly flex-center p-5 rounded-4 border border-1 bg-body"
                resetState={resetState}>
                <div className="rounded-4 py-3">
                  <div className="py-2 mb-5 fs-4">{subInfo.message}</div>
                  <Row>
                    <Col className="col-6">
                      <span
                        className="dreams-ctrl view-products btn flex-center btn-outline-warning w-100 py-3 px-3 fs-4 fst-italic fw-light rounded-4 flex-shrink-0"
                        onClick={gotoProducts}>
                        View Products!
                      </span>
                    </Col>
                    <Col className="col-6">
                      <div className="dreams-ctrl flex-center w-100 ps-4 pe-2 rounded-4 flex-shrink-0">
                        <ModalVideojs
                          reverseState={resetVideoState}
                          videoUrl="/src/video/i-💔-F8.mp4">
                          <button
                            type="button"
                            className="dreams-ctrl btn btn-outline-warning flex-center gap-3 px-3 rounded-4">
                            <span className="fst-italic fs-4 fw-light">Video Intros</span>
                            <IconSvg
                              className={`icon-ctrl text-info fs-2`}
                              link="play-circle"
                            />
                          </button>
                        </ModalVideojs>
                      </div>
                    </Col>
                  </Row>
                </div>
              </DreamsFly>

              {subInfo.reminder && (
                <div className="error flex-center position-absolute start-0 top-100 mt-2 ps-4 pe-3 py-3 w-100 text-bg-danger fs-4 fst-italic rounded-3 user-select-none">
                  <span>{subInfo.reminder}</span>
                  <IconSvg
                    role="button"
                    className="mb-auto ms-auto fs-2 cursor-pointer flex-shrink-0"
                    link="close-square"
                    onClick={handleCloseError}
                  />
                </div>
              )}
            </div>
            <div className="brands flex-center w-100 py-4 gap-4 fs-2 mb-3">
              {socialRegister.map((social, index) => (
                <Link
                  key={"social" + index}
                  id={"social" + (index + 1)}
                  to={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  reloadDocument>
                  <IconSvg
                    link={social.icon}
                    className={social.className}
                  />
                </Link>
              ))}
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
                to={`${forgotpw}`}>
                Forgot password?
              </Link>
            </div>
            <span className="d-flex fw-light fs-4 gap-4 mt-3">
              Chưa có tài khoản:
              <Link
                className="fs-4 fw-medium fst-italic"
                to={`/${register}`}>
                Đăng ký Account!
              </Link>
            </span>
            <Link
              className="d-flex gap-4 py-2 mb-3 fs-5 fw-light fst-italic"
              to={home}>
              Tôi muốn quay lại trang chủ!
            </Link>
          </Col>
        </Row>
      </Form>
      {subInfo.isVideoPlaying && <div className="overlay bg-opacity-80"></div>}
    </MainSection>
  );
};

const BtnLogin = () => {
  const user = useSelector((state) => state.app.user);

  if (user && user.isVip) return;
  return (
    <Link
      to={`${login}`}
      className={`btn btn-login btn-outline-primary flex-center d-none d-md-flex fs-4 py-3 px-5`}>
      Log In
    </Link>
  );
};

const BtnLogOut = ({ className, onClick }) => {
  const toastRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);

  const handleLogOut = () => {
    if (!user.isVip) return;
    if (typeof onClick === "function") {
      onClick && onClick();
    }
    const userLogOut = { ...user, isVip: false, password: "", email: "", username: "", firstName: "" };
    dispatch(reduxLogin(userLogOut));
    logoutUser();
  };
  const handleToggleToast = () => {
    toastRef.current?.toggleToast();
  };

  const resetState = (state) => {
    if (state === false && typeof onClick === "function") {
      onClick && onClick();
    }
  };

  return (
    <div>
      <DreamsFly
        ref={toastRef}
        direction=""
        variant="warning"
        outsideCtrl={true}
        showForever={true}
        className="flex-center p-5 rounded-4 border border-1"
        resetState={resetState}>
        <div className="rounded-4 py-3">
          <div className="py-2 mb-5 fst-italic fw-lighter fs-3">Bạn chắc chắn muốn thoát khỏi ứng dụng?</div>
          <Row className="row-col-2">
            <Col>
              <span
                className="goto-home btn flex-center btn-outline-warning w-100 p-3 fs-5"
                onClick={handleLogOut}>
                Log Out
              </span>
            </Col>
            <Col>
              <Button
                type="button"
                className="cancel-logout btn flex-center btn-outline-warning w-100 p-3 fs-5 text-light"
                onClick={handleToggleToast}>
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </DreamsFly>
      <button
        type="button"
        onClick={handleToggleToast}
        className={`btn btn-logout w-100 btn-outline-warning ${className ? ` ${className}` : ""}`}>
        Log Out
      </button>
    </div>
  );
};

export { BtnLogOut, BtnLogin, action };
export default LoginPage;
