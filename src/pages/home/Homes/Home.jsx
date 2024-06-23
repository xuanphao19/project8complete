/*

Trái tim em, căn nhà nhỏ bé
Gió anh vào nếu chán gió lại ra!

*/

import React, { Fragment } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";

import { MainSection } from "@/component";
import { Heroes } from "@/layout";
import { ContactPage } from "@/pages";

const Home = () => {
  const location = useLocation();
  const exactly = location.pathname.includes("/fastfilter");

  return (
    <Fragment>
      <MainSection
        id="home"
        className="container d-flex py-6"
        name="section">
        {exactly && (
          <div className="nav-sidebar col-lg-3 d-none d-lg-flex flex-column me-3 rounded-3 bg-secondary bg-opacity-25 border-opacity-25 border-primary">
            {/* <ProductNavSidebar /> */}
          </div>
        )}
        <div className="home-content w-100">
          <Heroes
            id="HeroNB-08"
            className="w-100 pb-4"
            round="rounded-5"
            dots={true}
            arrows={true}
          />
          {/* <ProductFastFilter /> */}
          {exactly && (
            <div className="product-navigation d-lg-none d-flex mb-4 mt-3 bg-secondary bg-opacity-25 border-opacity-25 border-primary rounded-3 vh-70">
              {/* <NavSidebar groupClass="d-flex gap-2 py-2" /> */}
            </div>
          )}
          <div className="flex-center mb-4 mt-3 bg-secondary bg-opacity-25 border-opacity-25 border-primary rounded-3 vh-60">Chờ Em!</div>
          <Outlet />
        </div>
      </MainSection>
      <Link
        reloadDocument
        to="#footer-page"
        // target="_blank"
        // rel="noopener noreferrer"
        // to="https://reactrouter.com"
        className="d-flex justify-content-center w-100 p-3 bg-secondary">
        the docs at reactrouter.com.
      </Link>
      <ContactPage />
    </Fragment>
  );
};

export default Home;
