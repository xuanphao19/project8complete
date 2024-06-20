import React, { Fragment } from "react";
import { Navigation } from "@/component";

const NavigationSidebar = ({ groupClass }) => {
  // NavigationSidebar!

  return (
    <Fragment>
      <aside className="sidebar d-flex d-lg-block overflow-hidden text-info-emphasis">
        <h2 className="sidebar-title mb-0 px-3 py-4 z-3 position-sticky top-0 bg-secondary">Categories:</h2>
        <Navigation
          navClass="navbar-nav h-100 overflow-y-scroll"
          className={`${groupClass ? groupClass : "d-lg-flex flex-column h-100 w-100 px-2"}`}
          linkClass="nav-link py-2 px-4 mt-1 z-3 d-flex align-items-center justify-content-between gap-3 rounded-3 border-opacity-10 border-primary bg-secondary bg-opacity-25"
          iconClass="sidebar-icon fs-1"
        />
      </aside>
    </Fragment>
  );
};

export default NavigationSidebar;
