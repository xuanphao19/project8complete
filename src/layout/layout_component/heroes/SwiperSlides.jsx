// import React, { useRef, useCallback, memo } from "react";
// import { Link } from "react-router-dom";
// import { Row, Col } from "react-bootstrap";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import { heroImg as hero, Image } from "@/assets/images";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "@/styles/component/_swiper-css.min.css";

// const { coffee0, coffee1, coffee2, coffee6, bgr_right } = hero;

// const heroData = [
//   {
//     active: true,
//     slideInterval: "4500",
//     title: "ORDER YOUR FAVORITE COFFEE",
//     itemBgr: bgr_right,
//     thumb: coffee2,
//     href: "/login",
//   },
//   {
//     slideInterval: "3500",
//     title: "Lavazza Coffee Blends Try the Italian Espresso",
//     itemBgr: bgr_right,
//     thumb: coffee0,
//     href: "/register",
//   },
//   {
//     slideInterval: "3000",
//     title: "Qualità Oro Mountain Grown Espresso Coffee Beans",
//     itemBgr: bgr_right,
//     thumb: coffee1,
//     href: "/forgotpw",
//   },
//   {
//     active: true,
//     slideInterval: "2000",
//     title: "ORDER YOUR FAVORITE COFFEE",
//     itemBgr: bgr_right,
//     thumb: coffee2,
//     href: "/login",
//   },
//   {
//     slideInterval: "3500",
//     title: "Lavazza Coffee Blends Try the Italian Espresso",
//     itemBgr: bgr_right,
//     thumb: coffee6,
//     href: "/register",
//   },
//   {
//     slideInterval: "3000",
//     title: "Qualità Oro Mountain Grown Espresso Coffee Beans",
//     itemBgr: bgr_right,
//     thumb: coffee1,
//     href: "/forgotpw",
//   },
// ];

// const SwiperSite = ({ id = "", className = "", slideData = heroData, autoplay = true, ...props }) => {
//   const generateHeroItems = (data) => {
//     return data.map((item, index) => {
//       return (
//         <SwiperSlide key={index}>
//           <Row className={`carousel bg-body carousel${index + 1} h-100 w-100 row-cols-2`}>
//             <Col className="left-item h-100 p-5">
//               <Row className="ps-md-5">
//                 <Col xs={12} xl={10} xxl={12} className="ps-lg-5">
//                   <h2 className="title fw-bold text-light pt-5 fs-14">{item.title}</h2>
//                 </Col>
//               </Row>
//             </Col>

//             <Col className="right-item position-relative">
//               <Col xs={12} md={10} xl={8} className="hero-bgr-right position-relative position-absolute h-75 bottom-0 end-0">
//                 <Image src={item.itemBgr} className={`coffee-bg coffee-bg${index} w-100 h-100 object-fit-fill`} alt="..." />
//                 <Link to={item.href} className="">
//                   <Image src={item.thumb} className={`coffee coffee${index}  position-absolute`} alt="..." />
//                 </Link>
//               </Col>
//             </Col>
//           </Row>
//         </SwiperSlide>
//       );
//     });
//   };

//   return (
//     <>
//       <div className="">
//         <Swiper
//           speed={500}
//           slidesPerView={1}
//           spaceBetween={50}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: true,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           modules={[Autoplay, Pagination, Navigation]}
//           className="mySwiper"
//           {...props}>
//           {generateHeroItems(slideData)}
//           <div className="swiper-button swiper-button-prev"></div>
//           <div className="swiper-button swiper-button-next"></div>
//         </Swiper>
//       </div>
//     </>
//   );
// };
// export default SwiperSite;
