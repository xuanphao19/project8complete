import React, { forwardRef } from "react";
import { Fragment, useRef, useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Row, Col, Nav } from "react-bootstrap";
import Slider from "react-slick";
import { ReactMagnifier } from "@/vendor";
import { IconSvg, Loading } from "@/component/";
import { MainSection, InputRangeDouble } from "@/component/";

const menuDetail = ["Departments", "Coffee", "Coffee Beans", "LavAzza"];
const subMenu = [
  { label: "Compare", icons: "Documents" },
  { label: "Delivery", icons: "trolley", desc: "From $6 for 1-3 days" },
  { label: "Pickup", icons: "shopping-bag", desc: "Out of 2 store, today" },
];

const ProductDetails = () => {
  const slideRef = useRef(null);
  const [dataDetail] = useLoaderData();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(dataDetail);
  }, [dataDetail]);
  const customSlick = (i) => slideRef.current && slideRef.current.slickGoTo(i);

  if (!product || product.length <= 0) {
    return <Loading className="vh-60 flex-center" />;
  }

  return (
    <Fragment>
      <MainSection
        id="details"
        name="section"
        className="">
        <div className="d-flex align-items-center py-4 ps-4 mb-4 fs-5 text-body rounded-4 bg-secondary border shadow-sm">
          <Nav
            variant="pills"
            className="nav-product-detail"
            defaultActiveKey="#LavAzza">
            {menuDetail.length > 0 &&
              menuDetail.map((item, i) => {
                return (
                  <Nav.Item key={`${i}`}>
                    <Nav.Link
                      className={`z-${9 - i}${
                        i === 0 ? " p-0" : " ps-0"
                      } pills-nav-link position-relative text-body text-opacity-75 bg-body-secondary`}
                      href={`#${item}`}
                      onClick={() => customSlick(i + 1)}>
                      <span className="">{item}</span>
                      <svg
                        fill="rgba(var(--bs-secondary-bg-rgb),var(--bs-bg-opacity))"
                        viewBox="0 0 42.499 106.25">
                        <polygon points="0,0 42.499,42.5 0,85" />
                      </svg>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
          </Nav>

          <span className="ms-auto me-4 py-2 px-4 fs-4 border rounded-3">{product.id}</span>
        </div>

        <Row className="content-details d-flex py-3">
          <Col
            style={{ minHeight: "386px" }}
            className="col-lg-6 col-xl-5 col-12 col-md-10 mx-auto h-100">
            <div className="position-relative pt-90 pt-3 rounded-4 shadow-sm">
              <CustomPaging
                id={product.id}
                maxId={43}
                ref={slideRef}
              />
            </div>
          </Col>

          <Col className="col-lg-6 col-xl-7 col-12 col-md-10 mx-auto d-flex flex-column justify-content-between align-items-stretch">
            <div className="p-5 rounded-4 bg-secondary shadow-sm">
              <div className="py-4 ps-5">
                <h2 className="text-body fs-1">{`${product.desc}`}</h2>
                <Row className="py-4">
                  <Col className="col-12 col-sm-10 col-xl-6">
                    <div className="h-100 w-100 py-4 pe-5">
                      <div className="">
                        <span className="d-flex py-3 align-items-center">
                          <IconSvg
                            className="text-warning fs-3 me-4"
                            link="star-full"
                          />
                          {` (${product.star}) ${Math.floor(product.star * 375)} reviews`}
                        </span>
                        <InputRangeDouble />
                      </div>
                    </div>
                  </Col>

                  <Col className="col-12 col-sm-10 col-xl-6">
                    <div className="py-4 ps-4">
                      {subMenu.map((item, i) => {
                        return (
                          <Link
                            key={`${item + i}`}
                            to=""
                            className="d-flex py-3 align-items-start">
                            <IconSvg
                              className="fs-1 me-4 pt-2"
                              link={item.icons}
                            />
                            <span className="">
                              <span className="fs-2 fw-medium">{item.label}</span>
                              {item.desc && <span className="d-flex fw-light fs-5 pt-2">{item.desc}</span>}
                            </span>
                          </Link>
                        );
                      })}

                      <div className="p-3 mt-5 ms-auto border border-2 rounded-4 shadow-sm">
                        <div className="d-flex align-items-center px-4 py-3 fs-4">
                          $ 500 . 00 <span className="ms-3 pt-1 pb-2 px-3 rounded-3 fs-5 text-success border text-bg-success bg-opacity-10">10%</span>
                        </div>
                        <div className="fs-2 fw-medium px-4 py-3">{`$ ${product.price * 3} . 00`}</div>
                        <div className="d-flex px-4 py-3">
                          <Link
                            to="/products/checkout"
                            className="fs-3 w-100 fw-medium px-4 py-3 text-bg-warning text-center rounded-3">
                            Add to cart
                          </Link>

                          <span className="icon-heart-detail flex-center ms-4 rounded-3">
                            <IconSvg
                              className={`${product.isLiked ? "heart-red fs-11" : "heart mt-1 fs-1"} z-9`}
                              link={`${product.isLiked ? "heart-red" : "heart"}`}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </MainSection>
      <div className="py-5 fs-13 fw-medium">Các sản phẩm tương tự:</div>
    </Fragment>
  );
};

const CustomPaging = forwardRef(({ id, maxId }, ref) => {
  const baseUrl = "/assets/images/product/product";
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (id > maxId - 5) {
      setCount(id - 4);
    } else setCount(id);
    ref.current.slickGoTo(0);
  }, [id]);

  const settings = {
    speed: 500,
    dots: true,
    fade: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots slick-thumb position-absolute d-flex align-items-center justify-content-center z-9",
    customPaging: function useMemo(i) {
      return (
        <Link
          to=""
          data-id={`${count + i}`}
          className="p-4 flex-center w-100 h-100">
          <img
            className="object-fit-contain"
            src={baseUrl + `${count + i}.png`}
          />
        </Link>
      );
    },
  };

  function showEvent(data) {
    data.addEventListener("magnifier-initialized", (e) => {});
  }
  return (
    <div className="slider-details px-5 🌺 position-absolute inset-full">
      <Slider
        ref={ref}
        {...settings}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={`img${i}`}
              className="p-5 i💔F8 w-100 h-100">
              <ReactMagnifier
                zoomSize={2.2}
                imageWidth={"100%"}
                imageHeight={"100%"}
                magnifierHeight={186}
                magnifierWidth={186}
                magnifierRadius={50}
                magnifierBorderColor={"currentColor"}
                magnifierBorderStyle={"solid"}
                magnifierBorderWidth={2}
                cursor={"auto"}
                imageUrl={`${baseUrl}${i === 0 ? id : count + i}.png`}
                getMagnifier={showEvent}
                customImgStyles={"i💔u w-100 h-100"}
                customContainerStyles={"i💔F88 text-primary w-100 h-100"}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
});

export { CustomPaging };
export default ProductDetails;
