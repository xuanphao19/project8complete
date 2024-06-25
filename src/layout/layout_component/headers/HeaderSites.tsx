import React, { memo, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/vendor/redux/store";
import { Logo, Avatar, Header } from "@/component";
import { ModalAvatar, FavouriteBtn, ModalCartBtn } from "@/component";
import { handleListenerEvent, getElement, findRelatives } from "@/utils";
import { LoginPage, BtnLogOut, BtnLogin, action, RegisterPage, BtnRegister } from "@/pages";
import HeaderMenu from "./HeaderMenu";
import { ThemeSwitch } from "@/themes";

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
          {!isVip && <ThemeSwitch className="header-btn-theme fs-1" />}
          <div className="header-control flex-center gap-3">
            <BtnRegister />
            <BtnLogin />

            <div className="d-flex align-items-center gap-4">
              <div className="d-flex align-items-center">
                <FavouriteBtn
                  data={favoriteData}
                  className="d-flex align-items-center border border-end-0 rounded-start-3 bg-body shadow-sm h-100"
                />
                <ModalCartBtn
                  data={favoriteData}
                  className="position-relative d-flex align-items-center ps-xl-2 border border-start-0 rounded-end-3 bg-body shadow-sm"
                />
              </div>

              <ModalAvatar avatarUrl={avatarUrl}>
                <Avatar
                  ref={avatarRef}
                  isVip={isVip}
                  src={avatarUrl}
                  userID={userId}
                  className="header-avatar"
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
