// Mã hóa ký tự đặc biệt : encodeURIComponent(value) // => code!
import React, { useRef, useState } from "react";
import { useEffect, useMemo, useCallback } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useFetcher } from "react-router-dom";

import { register } from "@/vendor";
import { handleQuickTestForm, verifyInputForm } from "@/utils";
import { MainSection, FormInput, IconSvg } from "@/component";
import { formFields, initialUserState, genderOptions, socialRegister } from "@/api";

const registerFieldLeft = ["firstName", "lastName", "username"];
const registerFieldRight = ["email", "password", "confirmPassword"];

const RegisterPage = () => {
  const fetcher = useFetcher();
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((s) => s.app.user);
  const [userInfo, setUserInfo] = useState({});
  const [subInfo, setSubInfo] = useState({ reminder: "", sentToEmail: "", isNotRobot: false, isAgreeTerms: false });

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
    event.stopPropagation();
    console.log(event.currentTarget, "str2");
    // pwRef.current.type = "password";
    // cfpwRef.current.type = "password";
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    if (verifyInputForm(formRef.current)) {
      console.error("Ồ no! Em chưa nếm được gì!");
      return;
    } else {
      // Reset and Xử lý logic Register:
      const formSubmit = new FormData(event.currentTarget);
      const data = {
        email: formSubmit.get("email"),
        username: formSubmit.get("username"),
        password: formSubmit.get("password"),
      };
      console.log("Form submitted:", data, register);
      try {
        const response = await fetcher.data;
        // Xử lý phản hồi thành công
        // (ví dụ: chuyển hướng đến trang đăng nhập)
        console.log("Đăng ký thành công!", fetcher);
      } catch (error) {
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
        console.log("Đăng ký thất bại:", error);
      }
      formRef.current.reset();
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
          classGroup={`${"⭐"}`}
          classLabel="🌺"
          classFormCtrl="fs-4 border-dark rounded-4 i💔f8"
          classIcon={field.classIcon}
          onFocus={handleFocus}
          onChange={handleChange}
          switchIcon={field.icon}
        />
      ));
  };

  return (
    <MainSection
      id="register"
      name="content"
      className="flex-center mx-auto user-select-none">
      <fetcher.Form
        action="/api/users"
        method="post"
        ref={formRef}
        className="form-wraps p-5 pe-4 rounded-5 bg-body position-relative"
        onSubmit={handleSubmitRegister}
        onReset={handleReset}>
        <Row className="d-flex pt-2 w-100">
          <h1 className="mx-auto pb-4 fs-2 text-center text-uppercase ">Đăng ký tài khoản</h1>
          {subInfo.sentToEmail && (
            <Alert variant="success">
              Chúc mừng bạn đẵ đăng ký thành công tài khoản! Một email xác nhận đã được gửi cho bạn. Vui lòng kiểm tra hòm thư và làm theo hướng dẫn.
            </Alert>
          )}
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
              className="btn btn-outline-primary flex-center pb-2 fs-3 fst-italic fw-medium"
              to="/login">
              Đã có Account
            </Link>
          </Col>
          <div className="mx-auto px-5 p-md-0">
            <div className="d-flex gap-4 mt-3 px-5">
              <span className="fs-4 text-danger">Lưu ý Quan trọng: </span>
              <Link
                className="fs-4 fst-italic"
                to="/dashboard">
                Điều khoản sử dụng!
              </Link>
            </div>
            <Link
              className="fs-4 px-5 p-1 mb-4 fst-italic"
              to="/">
              Tôi muốn quay lại trang chủ!
            </Link>
          </div>
        </Row>
      </fetcher.Form>
    </MainSection>
  );
};
export default RegisterPage;

export const BtnRegister = () => {
  const user = useSelector((state) => state.app.user);
  if (user && user.isVip) return;
  return (
    <Link
      to="/register"
      className={"btn btn-register text btn-outline-success flex-center d-none d-sm-flex fs-4 py-3 px-5"}>
      Register
    </Link>
  );
};
