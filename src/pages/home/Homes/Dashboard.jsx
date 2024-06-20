// DashboardPage (Trang tổng quan)

import React from "react";
import { Navigation } from "@component";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="vh-100">
        <h1>DashboardPage DashboardPage</h1>
        <Navigation
          links={[
            { path: "/home", name: "⭐Home⭐" },
            { path: "/contact", name: "🚗Contact☘" },
            { path: "/about", name: "🌻🌼About💥💥" },
          ]}
        />
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
