import React from "react";
import { MainSection } from "@/component";
import { HeaderSite, Footer } from "./layout_component";

const LayoutMaster = ({ children }) => {
  return (
    <React.Fragment>
      <HeaderSite />
      {/* <Sidebar /> */}
      <MainSection
        id="master"
        name="main"
        className="p-6"
      />
      <h1>LayoutMaster</h1>
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default LayoutMaster;
