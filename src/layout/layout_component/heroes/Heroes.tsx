import React, { useRef, useCallback, useMemo, memo, Fragment } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import { Carousel } from "slick-carousel";
import { Row, Col } from "react-bootstrap";
import { heroImg as hero, Image } from "@/assets/images";
import { IconSvg } from "@/component/";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./_heroes.min.css";

const { coffee0, coffee1, coffee2, coffee6, bgr_right } = hero;

type HeroData = {
  title: string;
  active?: boolean;
  itemBgr?: string;
  thumb: string;
  href?: string;
};

const heroData: HeroData[] = [
  {
    title: "ORDER YOUR FAVORITE COFFEE",
    itemBgr: bgr_right,
    thumb: coffee2,
    href: "/login",
  },
  {
    title: "Lavazza Coffee Blends Try the Italian Espresso",
    itemBgr: bgr_right,
    thumb: coffee0,
    href: "/register",
  },
  {
    title: "Qualità Oro Mountain Grown Espresso Coffee Beans",
    itemBgr: bgr_right,
    thumb: coffee1,
    href: "/forgotpw",
  },
  {
    title: "ORDER YOUR FAVORITE COFFEE",
    itemBgr: bgr_right,
    thumb: coffee2,
    href: "/login",
  },
  {
    title: "Lavazza Coffee Blends Try the Italian Espresso",
    itemBgr: bgr_right,
    thumb: coffee6,
    href: "/register",
  },
  {
    title: "Qualità Oro Mountain Grown Espresso Coffee Beans",
    itemBgr: bgr_right,
    thumb: coffee1,
    href: "/forgotpw",
  },
];

type HeroProp = {
  id: string;
  className?: string;
  speed: number;
  round?: string;
  arrows?: boolean;
  autoplay?: boolean;
  infinite?: boolean;
  dots?: boolean;
  centerMode?: boolean;
  pauseOnHover?: boolean;
  autoplaySpeed?: number;
  initialSlide?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  adaptiveHeight?: boolean;
  children?: React.JSX.Element;
  slideData: HeroData[];
} & { props: any };

const Heroes = memo(({ id, className, slideData = heroData, round = "", autoplay = true, children, ...props }: HeroProp): React.JSX.Element => {
  const slideRef = useRef<Carousel>(null);
  const dataTotal = useMemo(() => slideData.length, []);

  const settings = {
    ...props,
    autoplay: autoplay,
    dotsClass: "slick-dots custom-dots d-flex align-items-center justify-content-start mb-xl-4 w-75",
    customPaging: function useMemo(i: any): React.JSX.Element {
      return (
        <span
          title={`${i + 1}`}
          data-total={dataTotal}
          className={`dots dots${i + 1} flex-center position-relative`}>
          <button className={`abstract0${i + 1} text-light text-opacity-75`} />
          <span className="custom-paging rounded-pill"></span>
        </span>
      );
    },
  };

  const generateHeroItems = useCallback(
    (data: HeroData[]): React.JSX.Element[] => {
      return data.map((item, index) => {
        return (
          <div key={`carousel-00${index}`}>
            <Row className={`carousel bg-body carousel${index + 1} h-100 w-100 row-cols-2`}>
              <Col className="left-item h-100">
                <Row className="title-wrap ps-5 py-5">
                  <Col
                    xs={12}
                    xl={10}
                    xxl={11}
                    className="title-content">
                    <h2 className="title fw-medium text-light pt-3">{item.title}</h2>
                  </Col>
                </Row>
              </Col>

              <Col className="right-item position-relative">
                <Col
                  xs={12}
                  md={10}
                  xl={8}
                  className="hero-bgr-right position-relative position-absolute h-75 bottom-0 end-0">
                  <Image
                    src={item.itemBgr}
                    className={`coffee-bg coffee-bg${index} w-100 h-100 object-fit-fill`}
                    alt="..."
                  />
                  <Link
                    to={item.href}
                    className="">
                    <Image
                      src={item.thumb}
                      className={`coffee coffee${index}  position-absolute`}
                      alt="..."
                    />
                  </Link>
                </Col>
              </Col>
            </Row>
          </div>
        );
      });
    },
    [slideData],
  );

  const customSlick = useCallback(
    (event: any) => {
      slideRef.current && slideRef.current.slickPrev();
      event.target.closest(".heart-red").classList.toggle("dance");
    },
    [slideRef.current],
  );

  return (
    <Fragment>
      <div className={`slider-${id}${className ? ` ${className}` : ""}`}>
        <div
          id={id}
          role="slider"
          className={`slider position-relative${round ? ` ${round}` : ""}`}>
          <div className="slider-content position-absolute w-100 h-100 top-0 start-0">
            <Slider
              ref={slideRef}
              {...settings}>
              {generateHeroItems(slideData)}
            </Slider>
          </div>

          <button
            className="custom-control position-absolute bottom-0 end-0 z-9"
            onClick={customSlick}>
            <IconSvg
              className="heart-red fs-11 cursor-pointer"
              link="heart-red"
            />
          </button>
        </div>
      </div>
      {children}
    </Fragment>
  );
});

export default Heroes;
