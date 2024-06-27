/*

Trái tim em, căn nhà nhỏ bé
Gió anh vào nếu chán gió lại ra!

*/

import React, { Fragment, memo } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";

import { Heroes } from "@/layout";
import { MainSection } from "@/component";
import { ProductPage, NavSidebar } from "@/pages";
import { ContactPage, ProductFastFilter } from "@/pages";

const Home = memo(() => {
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
            <NavSidebar />
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
          <ProductFastFilter />
          {exactly && (
            <div className="product-navigation d-lg-none d-flex mb-4 mt-3 bg-secondary bg-opacity-25 border-opacity-25 border-primary rounded-3">
              <NavSidebar groupClass="d-flex gap-2 py-2" />
            </div>
          )}
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

      <ProductPage />
      <ContactPage />
    </Fragment>
  );
});

export default Home;
