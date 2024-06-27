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
          ]}
        />
        <Outlet />
        {children}
      </div>
    </MainSection>
  );
};

export default AdminLayout;
