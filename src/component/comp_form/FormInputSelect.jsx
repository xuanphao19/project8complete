import React, { Fragment, forwardRef, useState, useCallback, memo } from "react";
import { Form, FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import { IconSvg } from "@/component";

const FormInputSelect = memo(
  forwardRef(
    (
      {
        id = "",
        value = "",
        label = "",
        labelOption = "",
        valueOption = [],
        classGroup = "",
        classLabel,
        className,
        onChange,
        required = false,
        linkIconClose = "closed",
        onBlur = () => {},
        ...props
      },
      ref,
    ) => {
      const [error, setError] = useState();
      const handleChangeSelect = (event) => {
        event.preventDefault();
        const { value: inputValue, id: inputId } = event.target;
        onChange(inputId, inputValue);
        setError("");
      };

      const handleBlur = useCallback((event) => {
        const { value: inputValue, id: inputId } = event.target;
        let message;
        if (!inputValue || inputValue === labelOption) {
          message = "Vui lòng lựa chọn một option!";
          setError(message);
        }
        message && onBlur(inputId, message);
      }, []);

      return (
        <FormGroup
          ref={ref}
          className={`form-group ${classGroup || ""}`}
          controlId={id}>
          {label && (
            <FormLabel className={`${classLabel || ""}`}>
              {required && <span className="fs-4 text-danger me-3">* </span>} {label}:
            </FormLabel>
          )}
          <div className="form-content d-flex position-relative">
            <Form.Select
              ref={ref}
              id={id}
              name={id}
              className={`form-control ${className || ""}`}
              aria-label={id}
              value={value}
              onChange={handleChangeSelect}
              onBlur={handleBlur}
              {...props}>
              {labelOption && <option disabled>{labelOption}</option>}
              {valueOption.map((value, index) => (
                <Fragment key={`${id}${index}`}>
                  <option value={value}>{value}</option>
                </Fragment>
              ))}
            </Form.Select>

            {error && (
              <span className="error error-message start-0 top-100 ps-4 p-2 w-100 w-min-200 fs-3 rounded-3">
                <span className="error-msg">{error}</span>
                <IconSvg
                  className="align-self-start p-2 flex-shrink-0 fs-1 text-danger border border-danger rounded-end-3 cursor-pointer"
                  link={linkIconClose}
                  onClick={() => setError("")}
                />
              </span>
            )}
          </div>
        </FormGroup>
      );
    },
  ),
);

export default FormInputSelect;
