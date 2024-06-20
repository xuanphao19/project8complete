import React from "react";
import { Link } from "react-router-dom";
import { IconSvg } from "@/component";

const Logo = ({ className }) => {
  return (
    <div className={`logo flex-center flex-grow-1 flex-md-grow-0 pe-md-5${className ? ` ${className}` : ""}`}>
      <Link
        to="/"
        className="p-2 ps-0 flex-center flex-shrink-0">
        <span className="pb-1 flex-center flex-shrink-0">
          <IconSvg link="TikTok-icon-color" />
        </span>
        <span className="d-flex text-primary flex-shrink-0 fst-italic fw-semibold f8-p8font">NB-site</span>
      </Link>
    </div>
  );
};

export default Logo;
