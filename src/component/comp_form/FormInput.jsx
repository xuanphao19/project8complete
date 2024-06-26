import React, { forwardRef, useRef, useState, useEffect, useCallback, memo } from "react";
import { FormGroup, FormControl, FormLabel, FormCheck } from "react-bootstrap";
import { IconSvg } from "@/component";
import { findElementParent, verifyInput, findRelatives } from "@/utils";

const defaultFunc = () => {};
const FormInput = forwardRef(
  (
    {
      id,
      label,
      name = "",
      value = "",
      type = "text",
      required,
      switchIcon,
      onBlur = defaultFunc,
      onFocus = defaultFunc,
      onChange = defaultFunc,
      autoComplete = "on",
      classGroup,
      classLabel,
      classFormCtrl,
      classIcon = "text-body fs-4",
      linkIconClose = "closed",
      as = "",
      rows = 0,
      ...props
    },
    ref,
  ) => {
    const groupRef = useRef(null);
    const [error, setError] = useState();

    const handleInputChange = (event) => {
      const { value: inputValue, id: inputId } = event.target;
      if (inputValue.startsWith(" ")) return;
      onChange(inputId, inputValue);
    };

    const handleInputFocus = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const { id: inputId } = ref.current || {};
      onFocus(inputId, event);
      if (inputId === "confirmPassword" || inputId === "password") {
        ref.current.type !== "password" && handlesSwitchPw();
      }
    };
    const handleInputBlur = useCallback((event) => {
      const { id: inputId, value: inputValue } = event.target;
      if (inputId === "confirmPassword") {
        const sibling = findRelatives(groupRef.current, "prev");
        const broError = sibling.querySelector(".error");
        let broValue = sibling.querySelector("#password").value;
        setError(inputValue && verifyInput(inputId, inputValue, broValue, broError));
      } else {
        setError(inputValue && verifyInput(inputId, inputValue));
      }
      onBlur(inputId, verifyInput(inputId, inputValue));
    }, []);

    const handlesSwitchPw = () => {
      const currentType = ref.current.type;
      if (ref.current.id === "confirmPassword" || ref.current.id === "password") {
        ref.current.type = currentType !== "text" ? "text" : "password";
      } else return;
    };

    const handleCloseErrorMessage = (event) => {
      const errorMessage = findElementParent(event.target, ".error").innerText;
      if (errorMessage.includes("Vui lòng")) {
        ref.current.focus();
        const relatives = findRelatives(groupRef.current, "prev", "#password");
        relatives && relatives.focus();
      } else ref.current.focus();
    };

    useEffect(() => {
      setError("");
    }, [value]);

    return (
      <FormGroup
        ref={groupRef}
        className={`form-group ${classGroup || ""}`}
        controlId={id}>
        {label && (
          <FormLabel className={`${classLabel || ""} user-select-none cursor-pointer`}>
            {required && <span className="fs-4 text-danger me-3">* </span>} {label}:
          </FormLabel>
        )}
        <div className="form-content d-flex mb-4 position-relative">
          <FormControl
            ref={ref}
            as={as ? "textarea" : "input"}
            rows={as ? rows || 3 : undefined}
            className={`form-control py-3 px-4 fw-light bg-transparent ${classFormCtrl || ""}`}
            name={name || id}
            type={type}
            value={value}
            onFocus={!as ? handleInputFocus : defaultFunc}
            onBlur={!as ? handleInputBlur : defaultFunc}
            onChange={handleInputChange}
            autoComplete={autoComplete}
            style={as ? { resize: "none" } : null}
            {...props}
          />
          {switchIcon && (
            <FormCheck
              label={
                typeof switchIcon === "string" ? (
                  <IconSvg
                    link={switchIcon}
                    className={classIcon}
                  />
                ) : (
                  switchIcon
                )
              }
              id={id + "_check"}
              className="custom-control h-100 ps-0 position-absolute top-50 end-0 translate-middle-y"
              type="switch"
              onChange={handlesSwitchPw}
            />
          )}
          {value && error && (
            <span className="error error-message d-flex align-items-center justify-content-between start-0 top-100 pe-2 py-2 w-100 w-min-200 z-3 fs-3 rounded-3 overflow-hidden">
              <span className="error-msg">{error}</span>
              <IconSvg
                className="align-self-start p-1 flex-shrink-0 fs-1 border border-danger rounded-end-3 cursor-pointer"
                link={linkIconClose}
                onClick={handleCloseErrorMessage}
              />
            </span>
          )}
        </div>
      </FormGroup>
    );
  },
);

export default memo(FormInput);
