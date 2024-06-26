// Mã hóa ký tự đặc biệt : encodeURIComponent(value) // => code!
// Loại bỏ ký tự đặc biệt : split("@")[0].replace(/[^a-zA-Z0-9]/g, "")
import React, { useRef, useState } from "react";
import { useEffect, useMemo, useCallback } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useFetcher, useNavigate } from "react-router-dom";

import { registerNewUser, OpenYourMail, DreamsFly } from "@/service";

import { reduxRegister } from "@/vendor";
import { routesConfig } from "@/config";
import { handleQuickTestForm, validateForm } from "@/utils";
import { MainSection, FormInput, IconSvg } from "@/component";
import { formFields, registerFieldLeft, registerFieldRight, initialUserState, genderOptions, socialRegister } from "@/api";

const RegisterPage = () => {
  const toastRef = useRef(null);
  const fetcher = useFetcher();
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { home, login } = routesConfig;
  const user = useSelector((s) => s.app.user);

  const [error, setError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [subInfo, setSubInfo] = useState({
    reminder: "",
    isNotRobot: false,
    isAgreeTerms: false,
    message: "i-💔-F8!",
  });

  const reference = useMemo(() => {
    const newInfo = {};
    Object.keys(initialUserState).forEach((key) => {
      newInfo[key] = "";
    });
    return { newInfo };
  }, []);

  useEffect(() => {
    setUserInfo(reference.newInfo);
  }, [reference]);

  const handleChange = useCallback((name, value) => {
    if (name === "isNotRobot") {
      setSubInfo((prev) => ({ ...prev, [name]: !prev.isNotRobot }));
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleFocus = useCallback((id, event) => {
    event.preventDefault();
    setUserInfo((prev) => ({ ...prev, [id]: "" }));
    setSubInfo((prev) => ({ ...prev, ["reminder"]: "", ["isAgreeTerms"]: false }));
  }, []);

  const handleQuickTest = () => {
    const isError = formRef.current?.querySelector(".error");
    const fieldTest = [...registerFieldLeft, ...registerFieldRight, "gender"];
    const errorMsg = handleQuickTestForm(isError, userInfo, fieldTest);
    if (errorMsg) {
      setSubInfo((prev) => ({ ...prev, ["reminder"]: errorMsg }));
      console.error("Register handleQuickTest error::\n", errorMsg);
      return false;
    }
    return setSubInfo((prev) => ({ ...prev, ["isAgreeTerms"]: true }));
  };

  const handleReset = (event) => {
    event.preventDefault();
    setIsConfirmed(false);
    setUserInfo(initialUserState);
    setSubInfo({ reminder: "", isNotRobot: false, isAgreeTerms: false, message: "" });
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    if (validateForm(formRef.current)) {
      console.error("⛔Ồ... No!!!!!!!!😡");
      return;
    } else {
      try {
        const formData = new FormData(event.currentTarget);
        const emailForm = formData.get("email");
        const username = formData.get("username");
        const data = {
          email: emailForm,
          username: username ? username : emailForm?.split("@")[0].replace(/[^a-zA-Z0-9]/g, ""),
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          password: formData.get("password"),
          gender: formData.get("gender"),
          confirmPassword: "",
        };
        if (data) {
          const result = await registerNewUser(data.email, data.password);
          if (result && result.register.success) {
            setUserInfo((prev) => ({ ...prev, ...data, email: result.user.email, userId: result.user.userId, avatarUrl: result.user.avatarUrl }));
            setSubInfo((prev) => ({ ...prev, message: result.register.message }));
            handleToggleToast();
          } else if (result.success === false && result.message) {
            setError(result.message);
          }
        }
      } catch (error) {
        setError(error);
        console.log("Đăng ký thất bại:", error);
        formRef.current.reset();
      }
    }
  };

  const renderFormFields = (fields, ids) => {
    return fields
      .filter((field) => ids.includes(field.id))
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
          onFocus={handleFocus}
          onChange={handleChange}
          switchIcon={field.icon}
        />
      ));
  };

  const resetState = (state) => {
    if (state === false) {
      formRef.current?.reset();
    }
  };

  const handleToggleToast = () => {
    toastRef.current?.toggleToast();
  };

  const gotoEmailAdd = () => {
    handleToggleToast();
    setIsConfirmed(true);
    navigate(`/${login}`, { replace: true });
  };

  useEffect(() => {
    if (isConfirmed) {
      dispatch(reduxRegister(userInfo));
    }
  }, [isConfirmed]);

  return (
    <MainSection
      id="register"
      name="content"
      className="flex-center mx-auto">
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      <DreamsFly
        ref={toastRef}
        showForever={true}
        outsideCtrl={true}
        variant="success"
        direction=""
        className="flex-center p-5 rounded-4 border border-2"
        resetState={resetState}>
        <div className="rounded-4 py-4 px-5">
          <div className="py-2 mb-5 fs-4">{subInfo.message}</div>
          <Row className="row-col-2">
            <Col className="">
              <OpenYourMail
                email={userInfo.email}
                onClose={gotoEmailAdd}
              />
            </Col>
            <Col className="">
              <Link
                to="/"
                className="goto-home btn flex-center btn-outline-warning w-100 p-3 fs-5"
                onClick={handleToggleToast}>
                Xác Thực Sau!
              </Link>
            </Col>
          </Row>
        </div>
      </DreamsFly>

      <fetcher.Form
        action="/api/users"
        method="post"
        ref={formRef}
        className="form-wraps p-5 pe-4 rounded-5 bg-body position-relative user-select-none"
        onSubmit={handleSubmitRegister}
        onReset={handleReset}>
        <Row className="d-flex pt-2 w-100">
          <h1 className="mx-auto pb-4 fs-2 text-center text-uppercase ">Đăng ký tài khoản</h1>
          <Col
            className="mx-auto pb-0 px-5"
            xs={11}
            md={6}>
            {renderFormFields(formFields, registerFieldLeft)}
          </Col>

          <Col
            className="mx-auto pb-0 px-5"
            xs={11}
            md={6}>
            {renderFormFields(formFields, registerFieldRight)}
          </Col>
        </Row>

        <Row className="d-flex py-3 w-100">
          <Col
            className="mx-auto pb-0 px-5"
            xs={11}
            md={6}>
            <div className="d-flex align-items-center justify-content-between py-2">
              <div className="d-flex align-items-center gap-3">
                <span className="fs-4 text-danger">*</span>
                <span className="mb-1 fs-4 fw-medium me-3">Giới tính:</span>
              </div>
              {genderOptions.map((option, index) => (
                <Form.Check
                  key={"gender" + index}
                  className="gender flex-center gap-2 fs-5 fst-italic cursor-pointer"
                  id={option.id}
                  type="radio"
                  name="gender"
                  value={option.value}
                  label={<span className="cursor-pointer">{option.label}</span>}
                  checked={userInfo.gender === option.value}
                  onChange={() => handleChange("gender", option.value)}
                />
              ))}
            </div>

            <div className="quick-test flex-column justify-content-center">
              <Form.Check
                className="remember is-not-robot d-flex align-items-center py-1 gap-4 fs-5 fst-italic"
                type="checkbox"
                id="isNotRobot"
                name="isNotRobot"
                required={true}
                checked={subInfo.isNotRobot}
                label={<span className="cursor-pointer d-flex mt-2">Tôi không phải là người máy!</span>}
                onChange={() => handleChange("isNotRobot", true)}
              />

              <Form.Check
                className="remember d-flex align-items-center gap-4 py-1 fs-5 fst-italic"
                id="agree"
                type="checkbox"
                label={<span className="cursor-pointer d-flex mt-2">Tôi đã đọc và đồng ý với điều khoản sử dụng!</span>}
                required={true}
                checked={subInfo.isAgreeTerms}
                onChange={() => handleQuickTest()}
              />
              {subInfo.reminder && (
                <span className="error-message flex-center start-50 translate-middle-x pe-3 rounded-3">
                  {subInfo.reminder}
                  <span
                    className="btn btn-close align-self-start ms-3 fs-4 border"
                    onClick={() => setSubInfo((prev) => ({ ...prev, ["reminder"]: "" }))}></span>
                </span>
              )}
            </div>
          </Col>

          <Col
            className="mx-auto px-5"
            xs={11}
            md={6}>
            <div className="d-flex py-2 fs-4 fw-medium">Đăng ký với:</div>

            <div className="brands flex-center w-100 gap-4 mt-2 fs-2 py-2">
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
          </Col>
        </Row>

        <Row className="d-flex py3 w-100">
          <Col
            className="mx-auto px-5 py-3 py-md-0"
            xs={11}
            md={6}>
            <Button
              className="btn flex-center w-100 pb-2 fs-3 fst-italic fw-medium"
              variant="primary"
              type="submit">
              Xác Nhận
            </Button>
          </Col>
          <Col
            className="mx-auto px-5 py-3 py-md-0"
            xs={11}
            md={6}>
            <Link
              type="button"
              to={`/${login}`}
              className="btn btn-outline-primary flex-center pb-2 fs-3 fst-italic fw-medium w-100">
              Đã có Account
            </Link>
          </Col>
          <div className="register-ctrl position-relative mx-auto px-5 p-md-0">
            <div className="d-flex gap-4 mt-3 px-5">
              <span className="fs-4 text-danger">Lưu ý Quan trọng: </span>
              <Link
                className="fs-4 fst-italic"
                to={`/${"dashboard"}`}>
                Điều khoản sử dụng!
              </Link>
            </div>
            <Link
              className="fs-4 px-5 p-1 mb-4 fst-italic"
              to={`${home}`}>
              Tôi muốn quay lại trang chủ!
            </Link>
          </div>
        </Row>
      </fetcher.Form>
    </MainSection>
  );
};

const BtnRegister = () => {
  const { register: registerRouter } = routesConfig;
  const user = useSelector((state) => state.app.user);

  if (user && user.isVip) return null;
  return (
    <Link
      to={`/${registerRouter}`}
      className={"btn btn-register text btn-outline-success flex-center d-none d-sm-flex fs-4 py-3 px-5"}>
      Register
    </Link>
  );
};
export { BtnRegister };
export default RegisterPage;
