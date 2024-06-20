import React from "react";

import AdminLayout from "./AdminLayout";
import EmptyLayout from "./EmptyLayout";
import SingleHeader from "./SingleHeader";
import LayoutMaster from "./LayoutMaster";
import ClassicLayout from "./ClassicLayout";
import DefaultLayout from "./DefaultLayout";

const layoutEngine = {
  myLayout: AdminLayout,
  default: DefaultLayout, // Mặc định
  classic: ClassicLayout, // Cổ điển
  standard: LayoutMaster, // Tiêu chuẩn
  minimalist: SingleHeader, // Bố cục tối giản
  empty: EmptyLayout, // Bố cục trống vắng chiều nay
};

const layoutSwitcher = (layout) => {
  layout = layout ? layout : layout === null ? "empty" : "default";
  const Layout = layoutEngine[layout];
  return <Layout />;
};

export default layoutSwitcher;


