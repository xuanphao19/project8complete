import React from "react";
import { Navigation, MainSection } from "@/component";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }): React.JSX.Element => {
  return (
    <MainSection
      id="admin"
      name="section"
      className="container d-flex py-6">
      <div className="">
        <h1>Chào mừng bạn đến Admin Layout !!!</h1>
        <Navigation
          links={[
            { path: "/", name: "💔💔💔" },
            { path: "/history", name: "💥History💥" },
            { path: "/about/123/editor", name: "🌻🌼⭐🚗⭐" },
            { path: "/about/456/events", name: "🌻🌼💥💥events💥" },
            { path: "/team", name: "🌻Đội Nhóm🌼" },
          ]}
        />
        <Outlet />
        {children}
      </div>
    </MainSection>
  );
};

export default AdminLayout;
