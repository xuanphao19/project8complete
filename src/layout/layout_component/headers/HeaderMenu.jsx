import React, { Fragment } from "react";
import { useCallback, useRef, useState, useEffect, memo, useMemo } from "react";
import { Link, useLocation, useRouteLoaderData } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";

import HeaderMenuContent from "./HeaderModal";
import { mapNav, findElementParent, handleListenerEvent, selectElement } from "@/utils";
import { TippyCustom, setNewReference, closeModal } from "@/vendor";

import { IconSvg } from "@/component";

const HeaderMenu = memo(() => {
  const tippyRef = useRef({});
  const refMobile = useRef(null);
  const refMenuPc = useRef(null);
  const [content, setContent] = useState(null);
  const [fulcrum, setFulcrum] = useState(null);

  const user = useSelector((state) => state.app.user);
  const [userId, setUserId] = useState("");
  const [isVip, setIsVip] = useState(false);
  const { pathname } = useLocation();
  const [contact, setContact] = useState(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const { productsData } = useRouteLoaderData("root");
  const [data, setData] = useState(productsData);

  const setRef = (id, el) => {
    if (el) tippyRef.current[id] = el;
  };

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  useEffect(() => {
    setData(productsData);
  }, [productsData]);

  useEffect(() => {
    setIsVip(user.isVip);
    setUserId(user.userId);
  }, [user]);

  useEffect(() => {
    const linkContact = selectElement(".contact");
    linkContact && linkContact.classList.remove("active");
    const contact = selectElement("#section-contact");
    const elActive = selectElement(".active");
    setContact(contact);
    setFulcrum(() => document.querySelector(".header-inner"));

    const handleScrollActive = () => {
      if (contact && window.scrollY > contact.offsetTop - 80) {
        handleActive(".contact");
      } else {
        elActive?.classList.add("active");
        linkContact?.classList.remove("active");
      }
    };

    if (pathname === "/contact") {
      handleActive(".contact");
    } else {
      !elActive && handleActive(".default-active");
      handleListenerEvent(true, "scroll", handleScrollActive);
    }
    return () => {
      handleListenerEvent(false, "scroll", handleScrollActive);
    };
  }, [pathname]);

  const handleActive = (selector, event) => {
    let el = null;
    if (event) el = findElementParent(event.target, selector);
    else el = selectElement(selector);
    let els = refMobile.current ?? refMenuPc.current.querySelector(".active");

    if (els) els.classList.remove("active");
    el && el.classList.add("active");
    return el;
  };

  const handleOpenModal = (event) => {
    event.preventDefault();
    const modal = event.currentTarget;
    handleActive(".nav-link", event);
    const reference = modal?.getAttribute("data-reference");
    setNewReference(tippyRef.current, reference, modal);
    setContent(
      <HeaderMenuContent
        id={modal.id}
        name={modal.textContent}
        data={data}
        handleHideMenu={handleCloseModal}
      />,
    );
    handleCloseCanvas();
  };

  const handleCloseModal = useCallback(
    (event) => {
      closeModal(event, tippyRef.current, "tippy3");
    },
    [tippyRef],
  );

  return (
    <Fragment>
      <Fragment>
        <div className="d-flex flex-md-grow-1 flex-shrink-0 justify-content-md-center">
          <IconSvg
            link="bars-3-bottom-left"
            className="toggle-menu fs-12 text-bg-primary rounded-3 bg-opacity-75 d-lg-none cursor-pointer"
            onClick={handleShowCanvas}
          />

          <ul
            ref={refMenuPc}
            className="nav-site d-none d-lg-flex fs-5 ps-0">
            {mapNav.base.map((item) => (
              <li
                key={item.id}
                className="nav-item fw-medium position-relative">
                <a
                  id={item.id}
                  href="#!"
                  className={`nav-link d-flex align-items-center gap-3 py-3 px-4 z-3 text-body-emphasis${
                    item.active ? ` active default-active` : ""
                  }`}
                  data-reference="tippy3"
                  onClick={handleOpenModal}>
                  <span className="item-text">{item.label}</span>
                  <IconSvg
                    link="chevron-down"
                    className="icon-link 🌺"
                  />
                </a>
              </li>
            ))}

            <TippyCustom
              ref={(el) => setRef("tippy3", el)}
              isTriggerClick={true}
              appendTo={fulcrum}
              className="header-modal modal-header-menu rounded-5 px-5 ps-md-4 pe-md-5 py-5 bg-body"
              content={content}
            />

            {isVip && (
              <li className="nav-item d-none d-lg-flex fw-medium">
                <Link
                  id="link4"
                  to={contact ? "#section-contact" : "contact"}
                  reloadDocument={!!contact}
                  className="nav-link contact d-flex align-items-center gap-3 py-3 px-4 z-3 text-body-emphasis">
                  <span className="item-text">Contact</span>
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Offcanvas is Mobile menu */}
        <Offcanvas
          show={showCanvas}
          className="d-flex bg-body p-5 w-75"
          onHide={handleCloseCanvas}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fs-4 px-2">Welcome Xuân Pháo Website!</Offcanvas.Title>
          </Offcanvas.Header>
          <div className="d-flex mt-4">
            {!isVip && (
              <Link
                to="/register"
                className="btn btn-register btn-outline-success ms-auto d-sm-none d-block fs-4 py-3 px-5">
                Register
              </Link>
            )}
            {!isVip && (
              <Link
                to="/login"
                className="btn btn-outline-primary btn-login d-md-none ms-auto d-block fs-4 py-3 px-5">
                Log In
              </Link>
            )}
          </div>
          <Offcanvas.Body>
            <ul
              ref={refMobile}
              className="nav-site fs-4 ps-0">
              {mapNav.base.map((item) => (
                <li
                  key={item.id}
                  className="nav-item position-relative">
                  <a
                    id={item.id}
                    href="#!"
                    className={`nav-link d-flex align-items-center gap-3 py-4 px-4 fs-2 z-3 text-body-emphasis`}
                    data-reference="tippy3"
                    onClick={handleOpenModal}>
                    <span className="item-text">{item.label}</span>
                    <IconSvg link="chevron-down" />
                  </a>
                </li>
              ))}
              <li className="nav-item d-flex d-lg-none position-relative">
                <Link
                  id="link4"
                  to={contact ? "#section-contact" : "contact"}
                  reloadDocument={!!contact}
                  onClick={handleCloseCanvas}
                  className="nav-link contact d-flex align-items-center gap-3 w-100 py-3 px-4 fw-medium text-body-emphasis z-3">
                  <span className="item-text">Contact</span>
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link
                  className={`nav-link fw-medium d-none d-sm-flex align-items-center gap-3 py-3 px-4 z-3 text-body-emphasis`}
                  to={"about"}>
                  About
                </Link>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </Fragment>
    </Fragment>
  );
});

export default HeaderMenu;
