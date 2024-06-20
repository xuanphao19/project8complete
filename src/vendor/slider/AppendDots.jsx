import React from "react";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";

const AppendDots = () => {
  const customSlick = useCallback(
    (event) => {
      // slideRef.current && slideRef.current.slickPrev();
      // slideRef.current && slideRef.current.slickNext();
      // slideRef.current && slideRef.current.slickGoTo();
      // slideRef.current && slideRef.current.slickPlay();
      // slideRef.current && slideRef.current.slickPause();
    },
    [slideRef.current],
  );

  const settings = {
    dots: true,
    appendDots: (dots) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: function useMemo(i) {
      return <div>{i + 1}</div>;
    },
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
      </Slider>
    </div>
  );
};
/* ================ */
const AsNavFor = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="slider-container">
      <h2>Slider Syncing (AsNavFor)</h2>
      <h4>First Slider</h4>
      <Slider
        asNavFor={nav2}
        ref={(slider) => (sliderRef1 = slider)}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
      </Slider>
      <h4>Second Slider</h4>
      <Slider
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
      </Slider>
    </div>
  );
};
/* ================ */
const CustomPaging = ({ id, maxId }) => {
  const baseUrl = "/src/assets/images/product";
  console.log(maxId);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots slick-thumb d-flex",
    customPaging: function useMemo(i) {
      return (
        <a>
          <img src={`${baseUrl}/product${id + i}.png`} />
        </a>
      );
    },
  };

  return (
    <div className="slider-details-container p-5">
      <Slider {...settings}>
        <div>
          <img src={baseUrl + `/product${id}.png`} />
        </div>
        <div>
          <img src={baseUrl + `/product${id + 1}.png`} />
        </div>
        <div>
          <img src={baseUrl + `/product${id + 2}.png`} />
        </div>
      </Slider>
    </div>
  );
};
/* ================ */
export { AppendDots };
export default AsNavFor;
