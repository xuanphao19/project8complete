import React from "react";
import { MainSection } from "@/component";
import { HeaderSite } from "./layout_component";

const SingleHeader = ({ children }) => {
  return (
    <React.Fragment>
      <HeaderSite />
      <MainSection
        id="single"
        name="main"
        className="p-6">
        {children}
      </MainSection>
    </React.Fragment>
  );
};

export default SingleHeader;
