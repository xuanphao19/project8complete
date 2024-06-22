import React, { Fragment, useState, useCallback, useRef } from "react";
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

import { IconSvg, FormInput } from "@/component/";
// import { dataPayment } from "@/api/";
const dataPayment = [];

const BankCard = ({ className, onClick }) => {
  const lastNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const { user } = useSelector((state) => state.app);
  const matchProfile = useMatch("/profile");
  const [error, setError] = useState({});
  const [bankInfo, setBankInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    holder: "",
    cardNumber: "",
    expire: "",
    cvc: "",
  });

  const formatCardBank = useCallback((id, value) => {
    switch (id) {
      case "expire":
        value = value.replace(/[^0-9\/]/g, "");
        if (value.length === 2) {
          value = value.slice(0, 2) + "/";
        }
        break;
      case "cvc":
        value = value.replace(/[^0-9]/g, "");
        break;
      case "cardNumber":
        value = value.replace(/[^0-9]/g, "");
        value = value.match(/.{1,4}/g)?.join(" ") || value;
        break;
      default:
        value = null;
        break;
    }
    return value;
  }, []);

  const handleChange = useCallback(
    (id, value) => {
      if (!value) return;
      const infoValue = formatCardBank(id, value);
      setBankInfo((prev) => ({ ...prev, [id]: infoValue === null ? value : infoValue }));
    },
    [formatCardBank],
  );

  const handleFocus = useCallback((id) => {
    if (!id) return;
    setBankInfo((prev) => ({ ...prev, [id]: "" }));
    setError((prev) => ({ ...prev, [id]: "" }));
  }, []);

  const handleBlur = useCallback((id, message) => {
    id && setError((prev) => ({ ...prev, [id]: message }));
  }, []);

  return (
    <div className={`payment-info${className ? ` ${className}` : ""}`}>
      {!matchProfile && (
        <Fragment>
          <h2 className="payment-heading pt-4 pb-3 fs-1">Payment Details</h2>
          <p className="payment-desc py-2">Complete your purchase item by providing your payment details order.</p>
        </Fragment>
      )}
      <div className="row">
        {matchProfile && (
          <Fragment>
            <div className="d-flex align-items-center gap-4">
              <IconSvg
                className="icon icon-ctrl fs-1 hover-8"
                link="arrow-left-long"
                onClick={onClick}
              />
              <h2 className="payment-heading pt-4 pb-3 fs-1">Add credit or debit card</h2>
            </div>
            <div className="d-inline-flex gap-4">
              <FormInput
                ref={firstNameRef}
                id="firstName"
                label="First Name"
                type="text"
                value={bankInfo.firstName}
                placeholder="Enter First Name"
                required={true}
                name="item-name"
                autoComplete={"on"}
                classGroup={"col"}
                classLabel="py-2 fs-2 cursor-pointer"
                classFormCtrl="fs-3 border-dark rounded-4"
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
              />
              <FormInput
                ref={lastNameRef}
                id="lastName"
                label="Last Name"
                type="text"
                value={bankInfo.lastName}
                placeholder="Enter Last Name"
                required={true}
                autoComplete={"on"}
                classGroup={"col"}
                classLabel="py-2 fs-2 cursor-pointer"
                classFormCtrl="fs-3 border-dark rounded-4"
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
              />
            </div>
          </Fragment>
        )}

        {dataPayment.map((item, index) => {
          return (
            <FormInput
              key={item.id + item + index}
              id={item.id}
              ref={useRef(null)}
              name={item.name}
              label={item.label}
              value={bankInfo[item.id]}
              placeholder={item.placeholder}
              required={item.required}
              autoComplete={item.autoComplete}
              maxLength={item.maxLength}
              classGroup={`${item.id === "expire" || item.id === "cvc" ? ` col-6` : " col-12"}`}
              classFormCtrl={`fs-3${item.type ? ` text-center` : ""} border-dark rounded-4 i💔f8`}
              classLabel={`py-3 fs-2 cursor-pointer`}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleChange}
              switchIcon={
                error[item.id] ? (
                  <IconSvg
                    className="icon icon-error fs-2 hover-8"
                    link={item.icons}
                  />
                ) : null
              }
            />
          );
        })}

        {matchProfile && (
          <div className="d-flex gap-4 py-4 px-3 me-4">
            <Button
              variant="text"
              name="btn-cancel"
              onClick={onClick}
              className="ms-auto py-2 px-5 fs-2 border-opacity-0 shadow-sm rounded-3">
              Cancel
            </Button>

            <Button
              variant="warning"
              type="button"
              name="btn-save"
              className="py-2 px-5 fs-2 rounded-3"
              onClick={onClick}>
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankCard;
