import React, { memo, useState, useEffect } from "react";
import { useActionData } from "react-router-dom";

import { IconSvg } from "@/component/";
import UpdateAddress from "./ModalUpdateAddress";

const action = async ({ request }) => {
  const data = await request.json();
  return data;
};

const OrderStatus = memo(() => {
  const actionData = useActionData();
  const [data, setData] = useState({});
  const [color, setColor] = useState({
    bill1: true,
    bill2: false,
  });

  useEffect(() => {
    if (actionData) setData(actionData);
  }, [actionData]);

  const handleChecked = (event) => {
    const id = event.target.closest(".input-checkbox")?.id;
    setColor((prev) => ({ [id]: !prev[id] }));
  };

  return (
    <article className="card-item py-4">
      <div className="d-flex align-items-center justify-content-between px-2 pt-3 pb-5 mb-3 border-bottom">
        <h1 className="order-title fs-2 fst-italic text-info-emphasis">{`${
          data.title ? data.title : "1. Shipping, arrives between Mon, May 16—Tue, May 24"
        }`}</h1>
      </div>

      <div className="order-invoice text-body text-opacity-75 border-bottom mb-4">
        <div className="add-address  d-flex align-items-center justify-content-between p-3 mb-3">
          <div>
            <h2 className="title">Shipping address</h2>
            <p className="desc mb-0">Where should we deliver your order?</p>
          </div>

          <UpdateAddress>
            <button className="add-btn btn btn-warning d-flex align-items-center gap-4 py-2 ps-4 pe-5 fs-2 rounded-pill ">
              <span className="border border-dark rounded-3">
                <IconSvg
                  className="icon-link flex-center fs-2"
                  link="plus"
                />
              </span>
              <span className="">Add a new address</span>
            </button>
          </UpdateAddress>
        </div>

        <div className="bill-lists p-3 mb-3">
          <article className="bill-lading d-flex align-items-start py-4 w-100 gap-4">
            <IconSvg
              id="bill1"
              name="bill-checkbox"
              className={`icon-ctrl input-checkbox flex-center mb-2 fs-13${color.bill1 ? " text-info-emphasis" : " text-transparent"}`}
              link="checked"
              onClick={handleChecked}
            />

            <div className="invoice-details flex-grow-1">
              <h3 className="user-name">Imran Khan</h3>
              <p className="delivery-address detail-address w-75">5678 Mission Street, Apt 9, San Francisco, CA 94110, USA.</p>

              <div className="shipping-info d-flex align-items-center justify-content-between w-100">
                <ul className="detail-list d-flex align-items-center gap-5">
                  <li
                    style={{ listStyle: "initial" }}
                    className="choose-shipping">
                    Shipping
                  </li>
                  <li
                    style={{ listStyle: "initial" }}
                    className="store ms-4">
                    Delivery from store
                  </li>
                </ul>
                <UpdateAddress>
                  <button
                    type="button"
                    className="btn-edit flex-center gap-4 text-info-emphasis hover-8">
                    <IconSvg
                      className="flex-center mb-2 fs-2 text-info-emphasis"
                      link="Edit"
                    />
                    <span className="fs-3 fst-italic">Edit</span>
                  </button>
                </UpdateAddress>
              </div>
            </div>
          </article>

          <article className="bill-lading d-flex align-items-start py-4 w-100 gap-4">
            <IconSvg
              id="bill2"
              name="bill-checkbox"
              className={`icon-ctrl input-checkbox flex-center mb-2 fs-13${color.bill2 ? " text-info-emphasis" : " text-transparent"}`}
              link="checked"
              onClick={handleChecked}
            />

            <div className="invoice-details flex-grow-1">
              <h3 className="user-name">Imran Khan</h3>
              <p className="delivery-address detail-address w-75">Thành phố Al Hamra (Tầng 10), Đường Hazrat Shahjalal, Sylhet, Sylhet, Bangladesh</p>
              <div className="shipping-info d-flex align-items-center justify-content-between w-100">
                <ul className="detail-list d-flex align-items-center gap-5">
                  <li
                    style={{ listStyle: "initial" }}
                    className="choose-shipping">
                    Shipping
                  </li>
                  <li
                    style={{ listStyle: "initial" }}
                    className="store ms-4">
                    Delivery from store
                  </li>
                </ul>

                <UpdateAddress>
                  <button
                    type="button"
                    className="btn-edit flex-center gap-4 text-info-emphasis hover-8">
                    <IconSvg
                      className="flex-center mb-2 fs-2 text-info-emphasis"
                      link="Edit"
                    />
                    <span className="fs-3 fst-italic">Edit</span>
                  </button>
                </UpdateAddress>
              </div>
            </div>
          </article>
        </div>
      </div>
      <h2 className="card-info py-3 m-0">Items details</h2>
    </article>
  );
});

export { action };
export default OrderStatus;
