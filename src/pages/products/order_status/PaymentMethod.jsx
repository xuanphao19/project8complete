import React, { useEffect, useState, memo, useCallback } from "react";
import { Link, useActionData } from "react-router-dom";

import { IconSvg } from "@/component/";
import { Image } from "@/assets/images";
import { ModalVideojs } from "@/video/";
/*

*/
const action = async ({ request }) => {
  const data = await request.json();
  return data;
};

const PaymentMethod = memo(() => {
  const actionData = useActionData();
  const [data, setData] = useState([]);
  const [color, setColor] = useState({
    pay1: true,
    pay2: false,
  });

  useEffect(() => {
    if (actionData) setData(actionData);
  }, [actionData]);

  const handleChecked = useCallback((event) => {
    const { id } = event.currentTarget;
    setColor((prev) => ({ [id]: !prev[id] }));
  }, []);

  return (
    <div className="payment-method">
      <div className="card-info mb-5 px-5 py-3 bg-secondary-subtle rounded-5 shadow">
        <div className="card-top d-flex align-items-center justify-content-between px-2 pt-5 pb-4 mb-5 fst-italic text-info-emphasis fs-2 border-bottom">
          <h2 className="order-title">{`${data.title ? data.title : "1. Shipping, arrives between Mon, May 16—Tue, May 24"}`}</h2>
          <Link
            to="/products/checkout/shipping/"
            type="button"
            className="btn-edit flex-center gap-4 hover-8">
            <IconSvg
              className="mb-2"
              link="Edit"
            />
            <span className="fs-3">Edit</span>
          </Link>
        </div>

        <article className="pay-item mb-5">
          <div className="pay-info px-5 py-4 rounded-5 bg-body">
            <h3 className="pay-sub-title py-1 fs-2">Imran Khan</h3>
            <p className="pay-desc py-1 mb-0">Museum of Rajas, Sylhet Sadar, Sylhet 3100.</p>
          </div>
        </article>

        <article className="pay-item mb-5">
          <div className="pay-info px-5 py-4 rounded-5 bg-body">
            <h3 className="pay-sub-title py-1 fs-2">Items details</h3>
            <div className="pay-desc d-flex align-items-center justify-content-between py-1 mb-0">
              <div className="fs-3">2 items</div>
              <ModalVideojs videoUrl="/src/video/OfficialMusic.mp4">
                <button
                  type="button"
                  className="btn-view-detail flex-center gap-2 user-select-none hover-8 opacity-50">
                  <IconSvg
                    type="button"
                    className={`icon-ctrl text-info fs-1`}
                    link="play-circle"
                  />
                  <span className="fst-italic fs-4 fw-light">Watch Video</span>
                </button>
              </ModalVideojs>
            </div>
          </div>
        </article>
      </div>

      <div className="card-info mb-5 px-5 py-3 bg-secondary-subtle rounded-5 shadow">
        <div className="card-top d-flex align-items-center justify-content-between px-2 pt-5 pb-4 mb-5 border-bottom">
          <h2 className="pay-title pb-2 fs-2 text-info-emphasis">2. Shipping method</h2>
        </div>

        <h3 className="card-sub-heading mb-5">Availeble Shipping method</h3>

        <article
          id="pay1"
          className="pay-item mb-5 pe-2 cursor-pointer user-select-none"
          onClick={handleChecked}>
          <div className="pay-info d-flex align-items-center py-2 px-3 rounded-5 bg-body">
            <div className="col-2 m-0">
              <Image
                className="w-100 p-4 h-auto rounded-5 d-flex"
                src={`/src/assets/images/product/product310.png`}
              />
            </div>
            <div className="pay-info ms-4">
              <h3 className="pay-title">Fedex Delivery</h3>
              <p className="pay-desc mb-0">Delivery: 2-3 days work</p>
            </div>

            <div className="card-checkbox col-2 m-0 d-flex align-items-center justify-content-between pe-3 ms-auto">
              <span className="pay-cost fs-3">Free</span>
              <IconSvg
                name="pay-checkbox"
                className={`input-checkbox flex-center fs-14${color.pay1 ? " text-info-emphasis" : " text-transparent"}`}
                link="checked"
              />
            </div>
          </div>
        </article>

        <article
          className="pay-item mb-5 pe-2 cursor-pointer user-select-none"
          id="pay2"
          onClick={handleChecked}>
          <div className="pay-info d-flex align-items-center py-2 px-3 rounded-5 bg-body">
            <div className="col-2 m-0">
              <Image
                className="w-100 p-4 h-auto rounded-5 d-flex"
                src={`/src/assets/images/product/product311.png`}
              />
            </div>
            <div className="pay-info ms-4">
              <h3 className="pay-title">DHL Delivery</h3>
              <p className="pay-desc mb-0">Delivery: 2-3 days work</p>
            </div>

            <div className="card-checkbox col-2 m-0 d-flex align-items-center justify-content-between pe-3 ms-auto">
              <span className="pay-cost fs-3">$12.00</span>
              <IconSvg
                name="pay-checkbox"
                className={`input-checkbox flex-center fs-14${color.pay2 ? " text-info-emphasis" : " text-transparent"}`}
                link="checked"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
});

export { action };
export default PaymentMethod;
