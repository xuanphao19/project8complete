import { useState, useEffect, useCallback } from "react";
import React, { forwardRef, useRef, memo, FC } from "react";
import { Link } from "react-router-dom";

import { routesConfig } from "@/config";
import { Image } from "@/assets/images";
import { TippyCustom } from "@/vendor/";
import { IconSvg } from "@/component/";
import { ThemeSwitch } from "@/themes";
import { BtnLogOut } from "@/pages";
const { profile } = routesConfig;

const Avatar = memo(
  forwardRef(({ isVip, src, className }: { isVip: boolean; src: string; className: string }, ref?: React.LegacyRef<HTMLSpanElement>) => {
    return (
      isVip && (
        <span
          ref={ref}
          className={`avatar flex-center${className ? ` ${className}` : ""}`}>
          <Image
            className="ratio-1x1 rounded-pill d-flex hover-8"
            src={src}
          />
        </span>
      )
    );
  }),
);

const ContentModalAvatar = memo(({ src, onHide }: { src?: string; onHide?: FC }): React.JSX.Element => {
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    src && setAvatar(src);
  }, [src]);

  return (
    <div className="modal-avatar-content d-flex flex-column p-5 gap-3 fs-3 rounded-4 bg-body">
      <div className="user-menus d-flex align-items-center justify-content-between p-3 shadow-sm">
        <Link to="/profile">
          <img
            onClick={onHide}
            className="avatar fs-13 rounded-3 d-flex"
            src={avatar}
          />
        </Link>
        <div className="user-menu-name ms-5 me-auto">
          <p className="m-0 fs-3">John Smith</p>
          <p className="m-0 fs-5 fst-italic text-start">@johnsmith</p>
        </div>
        <Link to="/login">
          <IconSvg
            className="fs-2 text-warning icon-ctrl"
            link="arrow-path"
          />
        </Link>
      </div>
      <Link
        to={profile}
        onClick={onHide}
        className="user-menu d-flex align-items-center justify-content-between p-3 shadow-sm">
        <span className="fs-4">User profile</span>
        <IconSvg
          className="fs-2 text-success"
          link="Admin"
        />
      </Link>

      <Link
        to="products/checkout"
        onClick={onHide}
        className="user-menu d-flex align-items-center justify-content-between p-3 shadow-sm">
        <span className="fs-4">Favourite list</span>
        <IconSvg
          className="fs-2"
          link="heart2"
        />
      </Link>

      <span onClick={onHide}>
        <ThemeSwitch className="user-theme-mode user-menu fs-1 d-flex align-items-center justify-content-between p-3 shadow-sm">
          <span className="fs-4">Dark mode</span>
        </ThemeSwitch>
      </span>

      <Link
        to=""
        onClick={onHide}
        className="user-menu d-flex align-items-center justify-content-between p-3 shadow-sm">
        <span className="fs-4">Settings</span>
        <IconSvg
          className="fs-2 text-warning"
          link="setting"
        />
      </Link>

      <BtnLogOut
        onClick={onHide}
        className="fs-3 mt-4 mb-3 py-3 px-4 btn btn-outline-warning">
        Log Out
      </BtnLogOut>
    </div>
  );
});

const ModalAvatar = memo(({ children, avatarUrl }: { children: any; avatarUrl: string }): React.JSX.Element => {
  const refAvatar = useRef(null);

  const handleOnHide = useCallback(() => refAvatar.current.hide(), [refAvatar]);

  return (
    <TippyCustom
      ref={refAvatar}
      className="modal-avatar"
      arrow={true}
      offset={[45, 0]}
      delay={[0, 200]}
      interactive="true"
      placement="bottom-end"
      arrowClass="d-flex align-items-start"
      appendTo={document.querySelector(".header-inner")}
      content={
        <ContentModalAvatar
          src={avatarUrl}
          onHide={handleOnHide}
        />
      }>
      <div className="avatar-ctrl">{children}</div>
    </TippyCustom>
  );
});

export { Avatar };
export default ModalAvatar;
