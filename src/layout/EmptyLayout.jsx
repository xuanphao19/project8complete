import React from "react";
import { Outlet } from "react-router-dom";

const EmptyLayout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="empty-outlet">
        <Outlet />
      </div>
      {children}
    </React.Fragment>
  );
};

export default EmptyLayout;
