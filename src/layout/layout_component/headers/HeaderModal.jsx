import React, { memo, useCallback, useRef, useMemo, useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { MenuLists } from "@/component";
import { getRandomNumber, getRandomItems } from "@/utils";

const HeaderMenuContent = memo(({ id, name, data, handleHideMenu }) => {
  const refModal = useRef(null);
  const grocery = useMemo(() => data && [...data.Grocery], [data]);
  const [newData, setNewData] = useState({ data1: [], data2: [], data3: [], data4: [] });

  const getRandomData = useCallback(
    (max1, max2, max3, max4) => {
      return {
        data1: getRandomItems(getRandomNumber(5, max1), grocery),
        data2: getRandomItems(getRandomNumber(1, max2), grocery),
        data3: getRandomItems(getRandomNumber(1, max3), grocery),
        data4: getRandomItems(getRandomNumber(1, max4), grocery),
      };
    },
    [grocery],
  );

  useEffect(() => {
    if (name === "Departments") {
      setNewData(getRandomData(18, 5, 7, 5));
    } else {
      setNewData(getRandomData(15, 7, 8, 4));
    }
  }, [name]);

  const handleClickItemMenu = useCallback(
    (event) => {
      const itemLink = event.target.closest(".item-link");
      const elTitle = event.target.closest(".title");
      if (itemLink) {
        const listGroup = itemLink.closest(".list-group");
        listGroup?.querySelector(".active")?.classList.remove("active");
        itemLink.classList.add("active");
        grocery && setNewData(getRandomData(5, 7, 8, 5));
      } else if (elTitle) {
        elTitle.classList.toggle("open-sub-menu");
      } else {
        handleHideMenu();
      }
    },
    [grocery],
  );

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
      className="header-menu-modal">
      <div className="modal-content row-cols-1 row-cols-md-3 flex-md-row vh-60 fs-5 overflow-y-auto">
        {renderMenuLists(id === "link1" ? data.Departments : newData.data1, id === "link1" ? "list" : "nav")}
        {renderMenuLists(newData.data2, "nav")}
        {renderMenuLists(newData.data3, "nav")}
        {renderMenuLists(newData.data4, "nav")}
      </div>
    </div>
  );
});

export default HeaderMenuContent;
