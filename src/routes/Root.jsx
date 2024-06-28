import React from "react";
import { Outlet } from "react-router-dom";

import { AutoScrollToTop } from "@/utils";
import { OverlayProvider } from "@/hooks/";
import { BackToTop } from "@/component/";
import { fetchLoaderRootData } from "@/api";

export const loader = async () => {
  const data = await fetchLoaderRootData();
  return data;
};

const Root = () => {
  return (
    <React.Fragment>
      <OverlayProvider>
        <AutoScrollToTop top={0} />
        <Outlet />
        <BackToTop />
      </OverlayProvider>
    </React.Fragment>
  );
};

export default Root;
