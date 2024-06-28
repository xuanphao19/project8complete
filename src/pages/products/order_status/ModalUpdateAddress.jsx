import React, { Fragment, useState, useImperativeHandle } from "react";
import { useRef, forwardRef, useCallback, memo } from "react";
import { Form, useFetcher, useMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { TippyCustom } from "@/vendor";
import { formFields, addFields, cityName } from "@/api";
import { IconSvg, FormInput, FormInputSelect } from "@/component/";

const UpdateAddress = forwardRef(({ children, newContent }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const refTippy = useRef(null);
  const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), [isModalOpen]);

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsModalOpen(true);
    },
    hide: () => {
      setIsModalOpen(false);
    },
  }));

  const renderProps = useCallback((content, onClick) => {
    if (React.isValidElement(content)) {
      return React.cloneElement(content, { onClick });
    }
    return content;
  }, []);

  return (
    <TippyCustom
      ref={refTippy}
      className="modal-address w-100 h-100"
      visible={isModalOpen}
      arrow={false}
      interactive="true"
      onClickOutside={toggleModal}
      appendTo={document.body}
      content={
        newContent ? (
          renderProps(newContent, toggleModal)
        ) : (
          <Content
            className="modal-address-content py-3 mx-auto bg-body border border-info border-opacity-10 shadow-lg rounded-5"
            onClick={toggleModal}
          />
        )
      }>
      <div
        className={`btn-toggle-modal ${!children && !isModalOpen ? "d-none" : "d-flex"}`}
        onClick={toggleModal}>
        {isModalOpen && <div className="overlay bg-opacity-50"></div>}
        {children}
      </div>
    </TippyCustom>
  );
});

const Content = memo(({ className, onClick }) => {
  const fetcher = useFetcher();
  const [error, setError] = useState({});
  const matchProfile = useMatch("/profile");
  const [asDefault, setAsDefault] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [userInfo, setUserInfo] = useState({ city: "-- City --" });

  const handleChange = useCallback((id, value) => {
    setUserInfo((prev) => ({ ...prev, [id]: value || "" }));
  }, []);

  const handleBlur = useCallback((id, message) => {
    setError((prev) => (message ? { ...prev, [id]: message } : prev));
  }, []);

  const handleFocus = useCallback((id) => {
    setUserInfo((prev) => ({ ...prev, [id]: "" }));

    setError((prev) => {
      const { [id]: _, ...newError } = prev;
      return newError;
    });
  }, []);

  const handleFormReset = (event) => {
    event && event.preventDefault();
    setError({});
    setAsDefault(false);
    setIsValidate(false);
    setUserInfo({ city: "-- City --" });
    onClick();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(error).length === 0 && userInfo.name && userInfo.phone && userInfo.street) {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      data.asDefault = asDefault;
      fetcher.submit(data, { action: "/products/checkout/shipping", method: "post", encType: "application/json" });
      handleFormReset(event);
    } else {
      setIsValidate(true);
    }
  };

  return (
    <Fragment>
      <div className={className}>
        <fetcher.Form
          id={`add-address`}
          name={"add-address"}
          method="post"
          action="/products/checkout/shipping"
          onSubmit={handleSubmit}
          className="modal-form user-select-none ms-5">
          <div className="p-3">
            <div className="fs-1 fw-medium text-info-emphasis">Add new shipping address</div>
          </div>

          <div className="py-3">
            <div className="row row-cols-2 gx-5 w-100">
              {formFields
                .filter((field) => addFields.includes(field.id))
                .filter((field) => {
                  if (!matchProfile) {
                    return field.id !== "email";
                  } else {
                    return field;
                  }
                })
                .map((item, index) => {
                  return (
                    <FormInput
                      key={item.id + index}
                      ref={useRef(null)}
                      id={item.id}
                      name={item.name}
                      label={item.label}
                      required={item.required}
                      placeholder={item.placeholder}
                      value={userInfo[item.id]}
                      as={item.as ? item.as : ""}
                      rows={item.rows ? item.rows : 0}
                      autoComplete={item.autoComplete}
                      classGroup={`${item.as || item.name === "email" ? "col-12" : ""}`}
                      classLabel="py-2 fs-2 cursor-pointer"
                      classFormCtrl="fs-3 border-dark rounded-4"
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      onChange={handleChange}
                      switchIcon={
                        !item.as && error[item.id] ? (
                          <IconSvg
                            className="icon icon-error fs-3 hover-8"
                            link={`${item.icons ? item.icons : "Admin"}`}
                          />
                        ) : null
                      }
                    />
                  );
                })}
            </div>
            <FormInputSelect
              id={`city`}
              ref={useRef(null)}
              name="city"
              labelOption="-- City --"
              value={userInfo.city}
              valueOption={cityName}
              required={true}
              label="City/District/Town:"
              classGroup="py-2 me-5 mb-4"
              classLabel="py-2"
              className="d-flex align-items-center justify-content-between fs-3 p-3 text-body border-dark rounded-4 bg-body"
              onChange={handleChange}
            />
            <div
              className="d-flex align-items-center gap-4 py-3 cursor-pointer"
              onClick={() => setAsDefault(!asDefault)}>
              <IconSvg
                id="asDefault"
                name="asDefault"
                className={`icon-ctrl input-checkbox flex-center mb-2 fs-13${asDefault ? " text-info-emphasis" : " text-transparent"}`}
                link="checked"
              />
              <span className="cursor-pointer">Set as default address</span>
            </div>
          </div>

          <div className="d-flex gap-4 py-4 px-3 me-4">
            <Button
              onClick={handleFormReset}
              variant="text"
              name="btn-cancel"
              className="ms-auto py-2 px-5 fs-2 border-opacity-0 shadow-sm rounded-3">
              Cancel
            </Button>

            <Button
              variant="warning"
              type="submit"
              name="btn-save"
              className="py-2 px-5 fs-2 rounded-3">
              Create!
            </Button>
          </div>
        </fetcher.Form>
      </div>
      {isValidate && (
        <div className="isValidate error-message mx-auto pe-2 d-flex col-12 col-md-10 col-xl-8 col-xxl-6 start-50 translate-middle-x">
          <span className="me-2">Vui lòng hoàn thành tất cả các trường biểu mẫu!</span>
          <IconSvg
            className="align-self-start p-1 flex-shrink-0 fs-1 border border-danger rounded-end-3 cursor-pointer"
            link={"closed"}
            onClick={() => setIsValidate(false)}
          />
        </div>
      )}
    </Fragment>
  );
});

const ConfirmDelete = ({ id, message = "", label = "Delete", action, children }) => {
  const [showModal, setShowModal] = useState(false);
  const matchCheckoutAll = useMatch("/products/checkout/all");
  const toggleModal = useCallback(() => setShowModal(!showModal), [showModal]);

  const handleDestroy = () => {
    setShowModal(false);
  };

  return (
    <TippyCustom
      className="modal-address modal-destroy w-100 h-100 flex-center"
      visible={showModal}
      arrow={false}
      maxWidth="100"
      interactive
      onClickOutside={toggleModal}
      appendTo={document.body}
      content={
        <div className="modal-content p-5 mx-auto bg-body border border-info border-opacity-10 shadow-lg rounded-5">
          <p className="modal-desc mb-5 fs-3">{message}</p>
          <div className="modal-ctrl d-flex gap-4 mt-4">
            <button
              className="btn btn-cancel border-dark d-flex align-items-center ms-auto py-2 px-4 fw-light fs-2 rounded-3 hover-8"
              onClick={toggleModal}>
              Cancel
            </button>

            <Form
              id={`deleted0${id}`}
              name={id}
              method="post"
              action={action || `${id}/destroyFavourite`}
              className="modal-form"
              onSubmit={handleDestroy}>
              {matchCheckoutAll && (
                <input
                  type="hidden"
                  name="Pháo Xuân"
                  value="lyrics"
                />
              )}
              <button
                className="btn btn-destroy border-danger btn-danger d-flex align-items-center py-2 px-4 fw-light fs-2 rounded-3 hover-8"
                type="submit">
                {label}
              </button>
            </Form>
          </div>
        </div>
      }>
      <div
        className="toggle-modal"
        onClick={toggleModal}>
        {showModal && <div className="overlay bg-opacity-50"></div>}
        {children}
      </div>
    </TippyCustom>
  );
};

export { ConfirmDelete };
export default memo(UpdateAddress);
