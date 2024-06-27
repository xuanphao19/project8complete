// Giới thiệu chào hỏi
import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation, MainSection } from "@component";

const About = () => {
  return (
    <MainSection
      id="about"
      name="section"
      className="container">
      <h1>Giới thiệu 123</h1>
      <h2>Side bar:</h2>
      <Navigation
        links={[
          { path: "/", name: "💔💔💔" },
          { path: "/history", name: "💥History💥" },
        ]}
      />

      <h1>About Pages Main section</h1>
      <section className="about rou">
        <h1>About Pages</h1>
      </section>

      <section className="outlet-about">
        <div id="about-content">
          <h2>"About"</h2>
          <Outlet />
        </div>
      </section>
    </MainSection>
  );
};

export default About;
