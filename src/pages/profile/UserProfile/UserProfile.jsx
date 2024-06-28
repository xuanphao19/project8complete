// // UserProfile.js
import React, { useState, useEffect, memo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { fetchData } from "@/api";
import { Image } from "@/assets/images/";
import { UpdateAddress, BankCard } from "@/pages";
import { IconSvg, MainSection, MenuLists, AvatarUploader } from "@/component/";

const profileMenu = [
  {
    "Manage Account": [
      { to: "/about", iconUrl: "Admin", name: "Personal info" },
      { to: "/about", iconUrl: "map-pin", name: "Addresses" },
      { to: "/about", iconUrl: "envelope", name: "Communications & privacy" },
    ],
  },
  {
    "My items": [
      { to: "/products/checkout/all", iconUrl: "arrow-down-tray", name: "Reorder", isMultiLink: false },
      { to: "/products/checkout", iconUrl: "heart", name: "Lists", isMultiLink: false },
      { to: "/", iconUrl: "gift", name: "Your Gifts", isMultiLink: false },
    ],
  },
  {
    "Subscriptions & plans": [{ to: "/about", iconUrl: "ShieldDone", name: "Protection plans" }],
  },
  {
    "Customer Service": [
      { to: "/contact", iconUrl: "exclamation", name: "Help", isMultiLink: false },
      { to: "/contact", iconUrl: "scale", name: "Terms of Use", isMultiLink: false },
    ],
  },
];

const UserProfile = memo(() => {
  const navigate = useNavigate();
  const refUpdate = useRef(null);
  const refUpdateAddress = useRef(null);
  const { theme } = useSelector((state) => state.app);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleCheckoutData = async () => {
      try {
        const product = await fetchData("favoritesData");
        setProducts(product.slice(0, 3));
        if (product.length <= 0) navigate("/products", { replace: true });
      } catch (error) {
        console.log("Error during checkout:", error);
      }
    };
    handleCheckoutData();
  }, []);

  const handleOnShow = (event) => {
    event.preventDefault();
    refUpdateAddress && refUpdateAddress.current.show();
  };

  return (
    <MainSection
      id="profile"
      className="container py-6"
      name="section">
      <Row className="">
        <div className="search-bar d-flex align-items-center d-md-none mb-5 bg-secondary rounded-pill overflow-hidden">
          <input
            className="search-bar w-100 py-3 ps-4"
            type="search"
            name="search"
            id="profile-search"
            placeholder="Search for item"
          />
          <button
            type="button"
            className="search-submit p-3">
            <IconSvg
              className="search-icon fs-1"
              link="magnifying-glass"
            />
          </button>
        </div>
        
        <div className="profile-container">
          <Row className="gy-md-3">
            <Col className="col-3 col-xl-4 col-md-5 col-12 mb-5">
              <aside className="profile-sidebar bg-secondary rounded-5 overflow-hidden">
                <div className="profile-user pt-60 position-relative mb-2">
                  <Image
                    src={`${theme.theme === "dark" ? "/assets/images/hero-bgr1.jpg" : "/assets/images/Ve-tranh-thuy-mac.jpg"}`}
                    alt=""
                    className="user-brg position-absolute start-0 top-0 inset-full"
                  />
                  <div className="position-absolute pb-2 w-100 bottom-0 text-center text-nowrap">
                    <AvatarUploader
                      isUpload={false}
                      className="w-25 mb-3 mx-auto"
                      labelName="position-absolute z-9 bottom-0 end-0"
                      avatarClass="user-avatar position-absolute inset-full object-fit-cover border border-info border-opacity-25 border-3 rounded-circle hover-shadow"
                    />
                    <h1 className="user-name fs-3 text-info">Imran Khan</h1>
                    <p className="desc fs-5 text-info mb-4">Registered: 17th May 2022</p>
                  </div>
                </div>

                <div className="p-5">
                  {profileMenu.map((menuGroup, index) => {
                    const [title, items] = Object.entries(menuGroup)[0];
                    return (
                      <div
                        key={`${index + title}`}
                        className="profile-menu mb-4">
                        <h3 className="menu-title">{title}</h3>
                        <MenuLists
                          items={items}
                          type="nav"
                          className="py-3 ps-3 fw-light"
                          iconClass="flex-shrink-0"
                          linkClass="d-flex align-items-center justify-content-end flex-row-reverse gap-4 w-100 p-2 fs-5"
                          onClick={handleOnShow}
                        />
                      </div>
                    );
                  })}
                </div>
              </aside>
            </Col>

            <Col className="col-xl-8 col-md-7 col-12">
              <div className="card-info bg-secondary rounded-5 overflow-hidden p-5">
                <div className="row gy-3">
                  <div className="col-12 mb-5">
                    <h2 className="card-info">My Wallet</h2>
                    <p className="card-desc mb-4">Payment methods</p>
                    <Row className="gy-md-2 row-cols-2 row-cols-lg-3">
                      <div className="col mb-4">
                        <article className="payment-card hover-shadow">
                          <Image
                            src="/assets/images/product/product312.png"
                            alt="payment-card"
                            className="payment-img hover-8"
                          />
                        </article>
                      </div>
                      <div className="col mb-4">
                        <article className="payment-card hover-shadow">
                          <Image
                            src="/assets/images/product/product313.png"
                            alt="payment-card"
                            className="payment-img hover-8"
                          />
                        </article>
                      </div>
                      <div className="col mb-4">
                        <UpdateAddress
                          ref={refUpdate}
                          newContent=<BankCard className="p-5 bg-body rounded-5" />>
                          <button
                            type="button"
                            className="new-card position-relative border dashed border-info rounded-4 hover-8 hover-shadow">
                            <Image
                              src="/assets/images/product/product313.png"
                              alt="payment-card"
                              className="payment-img opacity-0"
                            />
                            <p className="card-text flex-center flex-column gap-2 position-absolute start-50 top-50 translate-middle text-info">
                              <IconSvg
                                className="icon-ctrl fs-2 mb-3"
                                link="plus-square"
                              />
                              <span className="fs-5 text-nowrap">Add New Card</span>
                            </p>
                          </button>
                        </UpdateAddress>
                      </div>
                    </Row>
                  </div>

                  <div className="col-12 mb-5">
                    <h2 className="card-info">Account info</h2>
                    <p className="card-desc mb-4">Addresses, contact information and password</p>
                    <Row className="gy-md-2 row-cols-1 row-cols-xl-2 user-select-none">
                      <Col className="mb-4">
                        <div
                          className="w-100 p-4 rounded-4 bg-body hover-shadow"
                          role="button"
                          onClick={handleOnShow}>
                          <article className="account-info d-flex align-items-center gap-4">
                            <div className="bg-black bg-opacity-10 border p-4 rounded-4">
                              <IconSvg
                                className="icon-ctrl fs-14"
                                link="envelope"
                              />
                            </div>
                            <div>
                              <h3 className="email">Email Address</h3>
                              <p className="email-desc mb-0 fs-5 fst-italic">tarek97.ta@gmail.com</p>
                            </div>
                          </article>
                        </div>
                      </Col>
                      <Col className="mb-4">
                        <div
                          className="w-100 p-4 rounded-4 bg-body hover-shadow"
                          role="button"
                          onClick={handleOnShow}>
                          <article className="account-info d-flex align-items-center gap-4">
                            <div className="bg-black bg-opacity-10 border p-4 rounded-4">
                              <IconSvg
                                className="icon-ctrl fs-14"
                                link="phone-arrow-up-right"
                              />
                            </div>
                            <div>
                              <h3 className="phone">Phone number</h3>
                              <p className="phone-num mb-0 fs-5 fst-italic">+0084 999 999 999</p>
                            </div>
                          </article>
                        </div>
                      </Col>
                      <Col className="mb-4">
                        <div
                          className="d-inline-flex w-100 p-4 rounded-4 bg-body hover-shadow"
                          role="button"
                          onClick={handleOnShow}>
                          <article className="account-info d-flex align-items-center gap-4">
                            <div className="bg-black bg-opacity-10 border p-4 rounded-4">
                              <IconSvg
                                className="icon-ctrl fs-14"
                                link="map-pin"
                              />
                            </div>
                            <div>
                              <h3 className="address">Add an address</h3>
                              <p className="address-detail mb-0 fs-5 fst-italic">Bangladesh Embassy, Washington, DC 20008</p>
                            </div>
                          </article>
                        </div>
                      </Col>
                      <UpdateAddress ref={refUpdateAddress} />
                    </Row>
                  </div>

                  <div className="col-12">
                    <h2 className="card-info">Lists</h2>
                    <p className="card-desc mb-4">{`${products.length} `} items - Primary</p>
                    {products.map((product, i) => {
                      return (
                        <article
                          key={`${product.id}-00${i}`}
                          className="card-link flex-center w-100 mb-5 p-4 rounded-4 border shadow overflow-hidden">
                          <span className="thumb bg-body p-4 col-2 rounded-4 overflow-hidden">
                            <Image
                              src={`/assets/images/product/product${product.id}.png`}
                              alt="Image"
                              className="card-image"
                            />
                          </span>
                          <div className="w-100 ms-2 ps-4">
                            <p className="desc">{product.desc}</p>
                            <div className="d-flex align-items-center gap-5">
                              <span className="price">$ 24 - {product.price}</span>
                              <Link
                                to="/products/checkout/shipping"
                                className="btn btn-outline-warning px-5 py-3 rounded-pill hover-shadow-sm">
                                Add to cart
                              </Link>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </MainSection>
  );
});

export default UserProfile;
