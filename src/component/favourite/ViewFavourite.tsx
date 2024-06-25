import React, { Fragment, useCallback, memo } from "react";
import { forwardRef, useRef, useState, useEffect } from "react";
import { Form, useMatch, useSubmit } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";

import { TippyCustom, RootState } from "@/vendor/";
import { IconSvg, CategoriesCards } from "@/component/";

const FavouriteBtn = memo(
  forwardRef(({ data, className }: { className?: string; data: any }, ref?: React.LegacyRef<HTMLSpanElement>) => {
    const user = useSelector((state: RootState) => state.app.user);
    const [total, setTotal] = useState(0);
    const isVip = user && user.isVip;

    useEffect(() => {
      if (!!data) setTotal(data.length);
    }, [data]);
    if (!isVip) return null;
    return (
      <div className={`favourite-btn${className ? ` ${className}` : ""}`}>
        <FavouriteModal data={data}>
          <span className="favourite flex-center">
            <IconSvg
              ref={ref}
              className="card-icon p-4"
              link="heart2"
            />
          </span>
        </FavouriteModal>
        <span className="d-none d-xl-flex align-items-center pe-4 fs-4">{`${total < 10 ? `0${total}` : total}`}</span>
      </div>
    );
  }),
);

const ContentModalFavourite = memo(({ data, handleOnHide }: { data?: any; handleOnHide?: any }): React.JSX.Element => {
  const submit = useSubmit();
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState([]);
  const [products, setProducts] = useState([]);
  const matchCheckout = useMatch("/products/checkout");
  const checkoutAll = useMatch("/products/checkout/all");

  useEffect(() => {
    if (!!data) {
      setFormData(data);
      setTotal(data.length);
      setProducts(data.slice(0, 3));
    }
  }, [data]);

  const handleSubmit = (event: any) => {
    handleOnHide();
    event.preventDefault();
    if (!matchCheckout) {
      submit(formData.slice(0, 3), { method: "post", action: "/products/checkout", encType: "application/json" });
    }
  };

  const handleSubmitAll = (event: any) => {
    handleOnHide();
    event.preventDefault();
    if (!checkoutAll) {
      submit(formData, { method: "post", action: "/products/checkout/all", encType: "application/json" });
    }
  };

  return (
    <div className="modal-favourite-content d-flex flex-column gap-3 pb-3 px-5 fs-5">
      <div className="modal-titles d-flex align-items-center justify-content-between py-2">
        <h2 className="modal-title fs-3">You have {`${total < 10 ? `0${total}` : total}`} item(s)</h2>
        <Form
          className="modal-form"
          onSubmit={handleSubmitAll}>
          <button
            className="modal-btn-link py-2 ps-4 text-primary fw-normal fst-italic hover-8"
            type="submit">
            See All
          </button>
        </Form>
      </div>

      <Row className="items-list py-3  row row-cols-3 gx-4 border-bottom border-2">
        {products &&
          products.map((product: any, i: number) => (
            <Fragment key={`cart${product.id + i}${product.name}`}>
              <CategoriesCards
                iconLiked={false}
                dataDetail={product}
                id={`cart${product.id}`}
                to={`/products/${product.id}/details`}
                colClass="col"
                cardClass="d-flex flex-column"
                thumbClass="position-relative pt-100 mb-2 border border-black border-opacity-50 rounded-4"
                linkClass="position-absolute inset-full flex-center p-2"
                imgClass="object-fit-contain p-4 bg-black bg-opacity-05 rounded-4"
                src={`/assets/images/product/product${i === 1 ? "f8" : product.id}.png`}
                contentClass="w-100 px-2 d-flex flex-column justify-content-between flex-grow-1"
                cardTitle={() => <h3 className="card-title py-3 fs-4 fw-normal">{`${product.name}`}</h3>}
                cardBody={() => (
                  <div className="card-body mb-3 text-body text-opacity-75">
                    <span className="card-price fs-3 fw-medium">{`$10 - $${product.price}`}</span>
                  </div>
                )}
                handleLinkClick={handleOnHide}
              />
            </Fragment>
          ))}
      </Row>

      <Form
        className="d-flex w-100"
        onSubmit={handleSubmit}>
        <button
          className="mt-4 ms-auto w-65 py-3 px-4 fs-3 text-center fw-medium rounded-pill text-bg-warning hover-8"
          type="submit">
          Check Out All
        </button>
      </Form>
    </div>
  );
});

const FavouriteModal = memo(({ children, data }: { children: React.JSX.Element; data?: any }): React.JSX.Element => {
  const refLiked = useRef(null);
  const [internalData, setInternalData] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.app.user);
  const isVip = user && user.isVip;

  useEffect(() => {
    if (Array.isArray(data)) {
      setInternalData(data);
    } else return;
  }, [data]);

  const onHide = useCallback(() => refLiked.current.hide(), [refLiked]);

  if (!isVip) return null;
  return (
    <TippyCustom
      ref={refLiked}
      className="modal-favourite mt-2 rounded-4 bg-body shadow"
      arrow={true}
      offset={[52, 2]}
      delay={[0, 200]}
      interactive="true"
      placement="bottom-end"
      arrowClass="d-flex align-items-start"
      appendTo={document.querySelector(".header-inner")}
      content={
        <ContentModalFavourite
          handleOnHide={onHide}
          data={internalData}
        />
      }>
      {children}
    </TippyCustom>
  );
});

const ViewFavouriteDetail = () => {
  return <div className="modal-favourite">view favourite</div>;
};

export { FavouriteBtn, FavouriteModal };

export default ViewFavouriteDetail;
