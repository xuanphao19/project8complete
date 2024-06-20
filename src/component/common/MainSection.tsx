import React from "react";
import { Outlet } from "react-router-dom";

interface MainProps {
  id: string;
  name: string;
  className: string;
  children?: React.ReactNode;
  [propName: string]: unknown;
}

const MainSection: React.FC<MainProps> = ({ id, name, className, children, ...prop }) => {
  const Element = name === "main" ? "main" : name === "section" ? "section" : "div";
  name = name && id ? `${name}-` : name ? name : "";
  const mainClass = `${name}${id ? `${id}` : ""}${className ? ` ${className}` : ""}`;
  return (
    <Element id={id ? `${name}${id ? `${id}` : ""}` : null}>
      <div
        className={mainClass ? mainClass : null}
        {...prop}>
        {children ? children : <Outlet />}
      </div>
    </Element>
  );
};

export default MainSection;
