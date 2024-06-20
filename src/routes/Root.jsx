import React from "react";
import { Outlet } from "react-router-dom";

import { AutoScrollToTop } from "@/utils";
import { BackToTop } from "@/component/";
import { fetchLoaderRootData } from "@/api";

export const loader = async () => {
  const data = await fetchLoaderRootData();

  return data;
};

const Root = () => {
  return (
    <React.Fragment>
      <AutoScrollToTop top={0} />
      <Outlet />
      <BackToTop />
    </React.Fragment>
  );
};

export default Root;
