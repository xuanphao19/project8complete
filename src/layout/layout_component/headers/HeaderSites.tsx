import React, { memo, useRef, useState, ReactElement } from "react";
import { useCallback, useEffect, ReactNode, MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/vendor/redux/store";
import { Logo, Avatar, Header, ModalAvatar, FavouriteModal, ModalCartBtn, ModalCart } from "@/component";
import { handleListenerEvent, getElement, findRelatives } from "@/utils";
import HeaderMenu from "./HeaderMenu";

const HeaderSites = ({ isLSOP = ["/", "/about"], distance = 80 }) => {
  const { pathname } = useLocation();
  const { user, favorites } = useSelector((state: RootState) => state.app);
  const matchPath = isLSOP.some((path) => path === pathname);
  const avatarRef = useRef(null);
  const headRef = useRef(null);

  const [userId, setUserId] = useState<string>("");
  const [isVip, setIsVip] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [favoriteData, setFavoriteData] = useState();

  const BtnRegister = "div";
  const BtnLogin = "div";

  useEffect(() => {
    setIsVip(user.isVip);
    setUserId(user.userId);
    setAvatarUrl(user.avatarUrl);
  }, [user]);

  useEffect(() => {
    setFavoriteData(favorites);
  }, [favorites]);

  const headerFixed: (e: any) => void = (e) => {
    const scrollY = e.currentTarget.scrollY;
    if (headRef.current) {
      const scrolledOffset = getElement("top-bar");
      distance = scrolledOffset ? scrolledOffset.offsetHeight : distance;
      const scrolly = scrollY >= distance;
      const nextElement = findRelatives(headRef.current);
      headRef.current?.classList.toggle("fix-top", scrolly);
      nextElement?.classList.toggle("scrolled-offset", scrolly);
    }
  };

  useEffect(() => {
    const headElement = headRef.current;
    if (matchPath && headElement) {
      headElement.classList.remove("change-height");
    } else {
      headElement.classList.add("change-height");
    }
    matchPath && distance && handleListenerEvent(matchPath, "scroll", headerFixed);
    if (!matchPath && distance && headElement) {
      const existClass = headElement.classList.contains("fix-top");
      const nextElement = headElement.nextElementSibling;
      if (existClass && nextElement) {
        headElement.classList.remove("fix-top");
        nextElement.classList.remove("scrolled-offset");
      }
      distance && handleListenerEvent(false, "scroll", headerFixed);
    }
    return () => {
      handleListenerEvent(false, "scroll", headerFixed);
    };
  }, [matchPath]);

  return (
    <Header
      ref={headRef}
      headerId="site"
      className="bg-secondary user-select-none shadow-sm">
      <div className={"header-inner position-relative d-flex align-items-center  justify-content-lg-between w-100"}>
        <div className="d-flex align-items-center col-lg-8 flex-row-reverse flex-md-row flex-grow-1">
          <Logo />
          <HeaderMenu />
        </div>
        <div className="header-control d-flex align-items-center ms-auto">
          <div className="header-control flex-center gap-3">
            <BtnRegister />
            <BtnLogin />
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center">
                <FavouriteModal data={favoriteData} />
                <ModalCart data={favoriteData}>
                  <ModalCartBtn className="position-relative d-flex align-items-center ps-xl-2 border border-start-0 rounded-end-3 bg-body shadow-sm" />
                </ModalCart>
              </div>

              <ModalAvatar avatarUrl={avatarUrl}>
                <Avatar
                  ref={avatarRef}
                  isVip={isVip}
                  src={avatarUrl}
                  userID={userId}
                  className="fs-11"
                />
              </ModalAvatar>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default memo(HeaderSites);
