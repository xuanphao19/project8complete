import React from "react";
import { useLocation } from "react-router-dom";
import { MainSection } from "@/component";
import { HeaderSite, Topbar, Footer } from "./layout_component";

const DefaultLayout = ({ isLSOP = ["/", "/home"] }) => {
  const { pathname } = useLocation();
  const matchPath = isLSOP.some((path) => path === pathname);

  return (
    <React.Fragment>
      {matchPath && <Topbar />}
      <HeaderSite />
      <MainSection
        id="site"
        name="main"
        className="p-6"
      />
      <Footer />
    </React.Fragment>
  );
};

export default DefaultLayout;
