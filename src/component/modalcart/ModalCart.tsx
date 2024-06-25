import React, { Fragment, forwardRef, useState, useEffect, useRef, useCallback, memo, FC } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "@/vendor/redux/store";

import { TippyCustom } from "@/vendor/";
import { IconSvg, CategoriesCards } from "@/component/";

const ModalCartBtn = memo(
  forwardRef(({ className, data }: { className?: string; data: any }, ref?: React.LegacyRef<HTMLSpanElement>) => {
    return (
      <div className={`cart-btn d-none d-sm-flex${className ? ` ${className}` : ""}`}>
        <ModalCart data={data}>
          <span className="cart-icon flex-center">
            <IconSvg
              ref={ref}
              className="card-icon p-4"
              link="trolley"
            />
          </span>
        </ModalCart>
        <span className="d-none d-xl-flex pe-4 align-items-center fs-4">{`$ ${"68 . 75"}`}</span>
      </div>
    );
  }),
);

const ContentModalCart = memo(({ data, onHide }: { data?: any; onHide: FC }): React.JSX.Element => {
  const [products, setProducts] = useState(data);

  useEffect(() => {
    data && setProducts(data.slice(0, 3));
  }, [data]);

  return (
    <div className="cart-modal-content d-flex flex-column gap-3 px-5 fs-5">
      <div className="modal-titles d-flex align-items-center justify-content-between py-2">
        <h2 className="modal-title fs-3">You have {`${3}`} item(s)</h2>
        <Link
          to="/products/checkout/all"
          onClick={onHide}
          className="modal-btn-link py-3 ps-5 text-primary fw-normal fst-italic hover-8">
          See All
        </Link>
      </div>

      <Row className="items-list pt-4 pb-5 row-cols-3 gx-4 border-bottom border-2">
        {products &&
          products.map((product: any, i: number) => (
            <Fragment key={`Scart0${i + 1}`}>
              <CategoriesCards
                iconLiked={false}
                dataDetail={product}
                id={`cart-${product.id}`}
                to={`/products/${product.id}/details`}
                colClass="col"
                cardClass="d-flex flex-column"
                thumbClass="position-relative pt-100 mb-2 border border-black border-opacity-50 rounded-4"
                linkClass="position-absolute inset-full flex-center p-2"
                imgClass="object-fit-contain p-4 bg-black bg-opacity-05 rounded-4"
                src={
                  i === 1
                    ? "https://files.fullstack.edu.vn/f8-prod/user_avatars/36050/649fc3c653f2c.png"
                    : `/assets/images/product/product${product.id}.png`
                }
                contentClass="w-100 px-2 d-flex flex-column justify-content-between flex-grow-1"
                cardTitle={() => <h3 className="card-title py-3 fs-4 fw-normal">{`${product.name}`}</h3>}
                cardBody={() => (
                  <div className="card-body text-body text-opacity-75">
                    <span className="card-price fs-3 fw-medium">{`$10 - $${product.price}`}</span>
                    <span className="d-flex align-items-center gap-2 mt-2">
                      <span className="star">
                        <IconSvg
                          className="text-warning pb-1"
                          link="star-full"
                        />
                      </span>
                      <span>{`${product.star}`}</span>
                    </span>
                  </div>
                )}
                handleLinkClick={onHide}
              />
            </Fragment>
          ))}
      </Row>

      <Row className="items-list py-3 row-cols-2 border-bottom border-2">
        <Col className="card-item fs-4">
          <p className="card-label subtotal">Subtotal</p>
          <p className="card-value subtotal">{`$ ${`371 . 99`}`}</p>
          <p className="card-label native">Texes</p>
          <p className="card-value native">Free</p>
        </Col>

        <Col className="card-item fs-4">
          <p className="card-label text-end charges">Shipping</p>
          <p className="card-value text-end charges">{`$ ${`10 . 00`}`}</p>
          <p className="card-label text-end total">Total Price</p>
          <p className="card-value text-end total">{`$ ${`425 . 99`}`}</p>
        </Col>
      </Row>

      <Link
        to="/products/checkout"
        className="mt-4 ms-auto w-65 py-3 px-4 fs-3 text-center fw-medium rounded-pill text-bg-warning hover-8"
        onClick={onHide}>
        Check Out All
      </Link>
    </div>
  );
});

const ModalCart = memo(({ children, data }: { children: React.JSX.Element; data?: any }): React.JSX.Element => {
  const refCart = useRef(null);
  const user = useSelector((state: RootState) => state.app.user);
  const isVip = user && user.isVip;

  const handleOnHide = useCallback(() => refCart.current?.hide(), [refCart]);

  if (!isVip) return null;
  return (
    <TippyCustom
      ref={refCart}
      className="modal-cart-header d-none d-sm-flex mt-2 rounded-4 bg-body bg-opacity-100 shadow"
      arrow={true}
      offset={[52, 2]}
      delay={[0, 200]}
      interactive="true"
      placement="bottom-end"
      arrowClass="d-none d-sm-flex align-items-start"
      appendTo={document.querySelector(".header-inner")}
      content={
        <ContentModalCart
          onHide={handleOnHide}
          data={data}
        />
      }>
      {children}
    </TippyCustom>
  );
});

const ModalCartDetail = () => {
  return (
    <div>
      <div className="modalcart">ModalCart</div>
    </div>
  );
};

export { ModalCartBtn, ModalCart };
export default ModalCartDetail;
