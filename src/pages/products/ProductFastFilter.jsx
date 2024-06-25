import React, { Fragment, useState, useEffect, useCallback, useMemo, memo } from "react";
import { Link, useLocation, useParams, useRouteLoaderData } from "react-router-dom";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";

import { fetchData } from "@/api";
import { TippyCustom } from "@/vendor/";
import { Image } from "@/assets/images/";
import { getRandomItems } from "@/utils";
import { IconSvg, InputRangeDouble } from "@/component/";

import "./_products.min.css";

const loader = async ({ params }) => {
  const id = params && Number(params.paramId.slice(0, 2));
  const filterData = await fetchData("productsData", id, 4);
  return filterData;
};

const ProductFastFilter = () => {
  // Thanh Filter nhỏ hiển thị tại trang chủ!
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(1975);
  const { pathname } = useLocation();
  const { paramId } = useParams();
  const { productsData } = useRouteLoaderData("root");
  const exactly = pathname.includes("/fastfilter");
  const data = productsData.Grocery;
  const products = useMemo(() => getRandomItems(3, data), []);

  useEffect(() => {
    paramId && setTotal(Number(paramId.slice(0, 2)) * 750);
  }, [paramId]);

  const handleClose = useCallback(() => setShowModal(false), []);
  const toggleModal = useCallback(() => setShowModal(!showModal), [showModal]);

  return (
    <Fragment>
      {!exactly && (
        <div className="mt-3 pt-4">
          <h2 className="">Browse Categories</h2>
          <Row className="show-result-filter mt-2 row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 py-4">
            {products.map((product, i) => {
              return (
                <Col
                  key={`${product.id}-00${i}`}
                  className={`result-item d-flex m-auto mb-5${i === 1 ? " d-lg-flex d-md-none" : ""}`}>
                  <Link
                    to={`products/${product.id}/details`}
                    className="fast-result flex-center w-100 rounded-4 bg-secondary-subtle shadow-sm">
                    <span className="thumb bg-body p-3">
                      <Image
                        src={`/assets/images/product/product${product.id}.png`}
                        alt="Image"
                      />
                    </span>
                    <div className="w-100 ms-2 ps-4">
                      <span className="price">$24 - $150</span>
                      <p className="desc mb-0">New sumatra mandeling coffee blend</p>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </div>
      )}

      <div className="product-filter d-flex justify-content-between py-4">
        <span className="d-flex gap-2 align-items-center fs-3 fw-medium fst-italic">
          <span>Total LavAzza:</span>
          <span className="total shadow fs-4 fw-medium fst-italic ms-3 py-2 px-4 text-bg-primary rounded-3">{total}</span>
        </span>
        <TippyCustom
          className="modal-filter-product my-4 w-100 rounded-5 bg-dark-subtle"
          visible={showModal}
          arrow={true}
          interactive="true"
          placement="bottom-end"
          onClickOutside={handleClose}
          content=<ProductModal
            className="modal-content p-3 w-100"
            onClick={handleClose}
          />>
          <div
            className="btn-filter d-flex align-items-center gap-4 py-3 px-4 shadow fs-4 rounded-3 bg-secondary-subtle cursor-pointer"
            onClick={toggleModal}>
            <span className="fst-italic">Filter</span>
            <IconSvg
              className="icon-ctrl"
              link="Filter"
            />
          </div>
        </TippyCustom>
      </div>
    </Fragment>
  );
};

const ProductModal = memo(({ className, onClick }) => {
  return (
    <div className={className}>
      <Modal.Header className="p-3">
        <Modal.Title className="fw-semibold fs-2">Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <Row className="row-gap-5">
          <Col
            className="select-price w-min-200 col-12 col-sm-8 col-lg-4 col-md-6 mx-auto px-lg-5 px-4"
            xs={6}
            md={4}>
            <div className="price fw-medium fs-2">Price</div>
            <InputRangeDouble />
          </Col>

          <Col
            className="select-size-weight w-min-200 col-12 col-sm-8 col-lg-4 col-md-6 mx-auto d-flex flex-column justify-content-between px-lg-5 px-4"
            xs={6}
            md={4}>
            <div className="fw-medium fs-2">Size/Weight</div>

            <Row className="select-weight row-cols-2 py-5">
              <Col className="weight">
                <Form.Select
                  size="lg"
                  id="select-weight"
                  className="cursor-pointer shadow py-3"
                  aria-label="select">
                  <option>Select Weight</option>
                  <option value="1">500</option>
                  <option value="2">1000</option>
                  <option value="3">1500</option>
                </Form.Select>
              </Col>
              <Col className="unit">
                <Form.Select
                  size="lg"
                  id="select-unit"
                  className="cursor-pointer shadow py-3"
                  aria-label="select">
                  <option>Select unit</option>
                  <option value="1">Milligram</option>
                  <option value="2">Gram</option>
                  <option value="3">Kilogram</option>
                </Form.Select>
              </Col>
            </Row>
            <div className="select-size d-flex flex-wrap row-gap-3 align-items-center justify-content-between fw-lighter col-xxl-10 fs-5 fst-italic">
              <span className="small-size shadow py-1">Small</span>
              <span className="medium shadow py-1">Medium</span>
              <span className="large shadow py-1">Large</span>
            </div>
          </Col>

          <Col
            className="search-brand w-min-200 col-12 col-sm-8 col-lg-4 col-md-6 mx-auto d-flex flex-column justify-content-between px-lg-5 px-4"
            xs={6}
            md={4}>
            <div className="brand fw-medium fs-2">Brand</div>

            <Form
              id="form-brand"
              className="d-flex position-relative">
              <Form.Control
                size="lg"
                type="search"
                id="search-brand"
                placeholder="Search..."
                className="me-2 ps-4 shadow py-3"
                aria-label="Search"
              />
              <Button
                className="search-brand search-btn position-absolute top-50 end-0 translate-middle-y px-4 fs-2 outline-opacity-0 border-opacity-0"
                variant="outline">
                <IconSvg
                  className="mb-1"
                  link="magnifying-glass"
                />
              </Button>
            </Form>
            <div className="select-brand flex-wrap row-gap-3 d-flex align-items-center justify-content-between fw-lighter col-xxl-10 fs-5 fst-italic">
              <span className="lavazza shadow py-1">Lavazza</span>
              <span className="nescafe shadow py-1">Nescafe</span>
              <span className="starbucks shadow py-1">Starbucks</span>
            </div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="gap-3 py-4 px-5">
        <Button
          onClick={onClick}
          variant="text"
          className="py-3 border-opacity-0 px-4 fs-5 shadow rounded-3">
          Cancel
        </Button>

        <Button
          variant="warning"
          className="p-0">
          <Link
            onClick={onClick}
            className="py-3 px-4 fs-5 rounded-3"
            to="/23/fastfilter">
            <span>Show Result</span>
          </Link>
        </Button>
      </Modal.Footer>
      <div
        className="modal-arrow"
        data-popper-arrow></div>
    </div>
  );
});

export { loader };
export default ProductFastFilter;
