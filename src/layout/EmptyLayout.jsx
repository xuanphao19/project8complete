import React from "react";
import { Outlet } from "react-router-dom";

const EmptyLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Outlet />
      {children}
    </React.Fragment>
  );
};

export default EmptyLayout;
