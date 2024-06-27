import React from "react";
import { MainSection } from "@/component";
import { HeaderSite } from "./layout_component";
import { Outlet } from "react-router-dom";

const ClassicLayout = ({ children }) => {
  return (
    <React.Fragment>
      <HeaderSite />
      {/* <Sidebar /> */}
      <MainSection
        id="classic"
        name="main"
        className="p-6">
        {children}
        <Outlet />
      </MainSection>
    </React.Fragment>
  );
};

export default ClassicLayout;
