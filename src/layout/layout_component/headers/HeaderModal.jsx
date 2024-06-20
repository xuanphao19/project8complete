import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useRouteLoaderData } from "react-router-dom";

import { IconSvg, MenuLists } from "@/component";
import { TippyModal as HeaderModals } from "@/vendor";
import { getRandomNumber, getRandomItems } from "@/utils";

const ContentModal = memo(({ id, name, offsetX, data, handleHideMenu }) => {
  const refModal = useRef(null);
  const [dataX, setDataX] = useState(0);
  const [newData, setNewData] = useState({ data1: [], data2: [], data3: [], data4: [] });

  useEffect(() => {
    if (!refModal.current) return;
    const modalRect = refModal.current.getBoundingClientRect();
    const newOffsetX = offsetX - modalRect.left + 30;
    setDataX(newOffsetX);
  }, [offsetX, refModal.current]);

  const getRandomData = useCallback(
    (max1, max2, max3, max4) => ({
      data1: getRandomItems(getRandomNumber(5, max1), data.Grocery),
      data2: getRandomItems(getRandomNumber(1, max2), data.Grocery),
      data3: getRandomItems(getRandomNumber(1, max3), data.Grocery),
      data4: getRandomItems(getRandomNumber(1, max4), data.Grocery),
    }),
    [],
  );

  useEffect(() => {
    if (name === "Departments") {
      setNewData(getRandomData(18, 5, 7, 5));
    } else {
      setNewData(getRandomData(15, 7, 8, 4));
    }
  }, [name]);

  const handleClickItemMenu = useCallback((event) => {
    const itemLink = event.target.closest(".item-link");
    const elTitle = event.target.closest(".title");
    if (itemLink) {
      const listGroup = itemLink.closest(".list-group");
      listGroup?.querySelector(".active")?.classList.remove("active");
      itemLink.classList.add("active");
      setNewData(getRandomData(5, 7, 8, 5));
    } else if (elTitle) {
      elTitle.classList.toggle("open-sub-menu");
    } else {
      handleHideMenu();
      setNewData({ data1: [], data2: [], data3: [], data4: [] });
    }
  }, []);

  const renderMenuLists = useCallback(
    (items, type) => (
      <Col
        xs={12}
        md={4}
        lg={3}
        className="menu-column col-12 px-0">
        <MenuLists
          items={items}
          type={type}
          className="ms-4 ps-5"
          iconClass="d-lg-flex text-info"
          linkClass="d-inline-flex w-100 p-3 position-relative"
          subIconClass="sub-icon position-absolute end-0 d-flex d-md-none top-50 translate-middle-y fs-2 mt-2 me-4 text-primary"
          finalPoint="fastfilter"
          isShowSubIcon={true}
          isShowChildren={true}
          onClick={handleClickItemMenu}
        />
      </Col>
    ),
    [],
  );

  return (
    <div
      ref={refModal}
      className="header-menu-modal rounded-5 px-5 ps-md-4 pe-md-5 py-5 bg-body">
      <div className="modal-content row-cols-1 row-cols-md-3 flex-md-row vh-60 fs-5 overflow-y-auto">
        {renderMenuLists(id === "link1" ? data.Departments : newData.data1, id === "link1" ? "list" : "nav")}
        {renderMenuLists(newData.data2, "nav")}
        {renderMenuLists(newData.data3, "nav")}
        {renderMenuLists(newData.data4, "nav")}
      </div>

      <IconSvg
        id="arrow"
        className="tippy-arrow d-none d-lg-flex z-9 position-absolute"
        style={{ "--data-x": `${dataX}px` }}
        link="arrow-up-triangle"
      />
    </div>
  );
});

const HeaderModalWrapper = memo(({ showMenu, name, offsetX, handleHideMenu, children }) => {
  const fulcrum = () => document.querySelector(".header-inner");
  const { productsData } = useRouteLoaderData("root");
  const [data, setData] = useState(productsData);

  useEffect(() => {
    setData(productsData);
  }, [productsData]);

  return (
    <HeaderModals
      className="header-modal my-5"
      visible={!!showMenu}
      interactive="true"
      arrow="true"
      placement="bottom"
      onClickOutside={handleHideMenu}
      appendTo={fulcrum}
      content={
        <ContentModal
          id={showMenu}
          name={name}
          offsetX={offsetX}
          data={data}
          handleHideMenu={handleHideMenu}
        />
      }>
      {children}
    </HeaderModals>
  );
});

export default HeaderModalWrapper;
