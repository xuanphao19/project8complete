import React, { forwardRef, useRef, useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/vendor/redux/store";

import { routesConfig } from "@/config";
import { Image } from "@/assets/images";
import { TippyModal } from "@/vendor/";
import { IconSvg } from "@/component/";
const { profile } = routesConfig;

const Avatar = memo(
  forwardRef(({ isVip, src, className }: { isVip: boolean; src: string; className: string }, ref?: React.LegacyRef<HTMLSpanElement>) => {
    // if (!!userID && authed) // Xác thực Admin!
    return (
      <React.Fragment>
        {isVip && (
          <span
            ref={ref}
            className={`avatar flex-center${className ? ` ${className}` : ""}`}>
            <Image
              className="ratio-1x1 p-2 rounded-pill d-flex hover-8"
              src={src}
            />
          </span>
        )}
      </React.Fragment>
    );
  }),
);

const ContentModalAvatar = memo(({ src, handleOnHide }: { src?: string; handleOnHide?: any }): React.JSX.Element => {
  const [avatar, setAvatar] = useState<string>("");
  const BtnLogOut = "div";

  useEffect(() => {
    src && setAvatar(src);
  }, [src]);

  return (
    <div className="modal-avatar-content tippy-content d-flex flex-column gap-3 fs-3 px-5 py-5">
      <div className="user-menus d-flex align-items-center p-3 shadow-sm">
        <Link to="/profile">
          <img
            onClick={handleOnHide}
            className="avatar fs-13 rounded-3 d-flex"
            src={avatar}
          />
        </Link>
        <div className="user-menu-name ms-5">
          <p className="m-0 fs-3">John Smith</p>
          <p className="m-0 fs-5 fst-italic text-start">@johnsmith</p>
        </div>
      </div>
      <Link
        to={profile}
        onClick={handleOnHide}
        className="user-menu d-flex align-items-center justify-content-between p-3 shadow-sm">
        <span className="">User profile</span>
        <IconSvg
          className="fs-2 text-success"
          link="Admin"
        />
      </Link>

      <Link
        to="products/checkout"
        onClick={handleOnHide}
        className="user-menu d-flex align-items-center justify-content-between p-3 shadow-sm">
        <span className="">Favourite list</span>
        <IconSvg
          className="fs-2"
          link="heart2"
        />
      </Link>

      <Link
        to=""
        onClick={handleOnHide}
        className="user-menu d-flex align-items-center justify-content-between p-3 shadow-sm">
        <span className="">Settings</span>
        <IconSvg
          className="fs-2 text-warning"
          link="setting"
        />
      </Link>

      <BtnLogOut
        onClick={handleOnHide}
        className="fs-3 mt-4 py-3 px-4 btn-outline-primary"
      />
      <div
        className="modal-avatar-arrow"
        data-popper-arrow>
        <IconSvg
          style={{ fontSize: "40px", color: "rgba(var(--bs-body-bg-rgb),var(--bs-bg-opacity))" }}
          link="arrow-up-triangle"
        />
      </div>
    </div>
  );
});

const ModalAvatar = memo(({ children, avatarUrl }: { children: any; avatarUrl: string }): React.JSX.Element => {
  const user = useSelector((state: RootState) => state.app.user);
  const refAvatar = useRef(null);

  const handleOnHide = useCallback(() => {
    refAvatar.current._tippy.hide();
  }, [refAvatar.current]);

  return (
    <TippyModal
      ref={refAvatar}
      className="modal-avatar mt-2 rounded-4 bg-body"
      arrow="true"
      offset={[20, 10]}
      delay={[0, 200]}
      interactive="true"
      placement="bottom-end"
      content={
        <ContentModalAvatar
          src={avatarUrl}
          handleOnHide={handleOnHide}
        />
      }>
      <span>{children}</span>
    </TippyModal>
  );
});

export { ModalAvatar };
export default Avatar;
