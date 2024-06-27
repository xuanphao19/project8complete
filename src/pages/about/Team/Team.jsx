// Những bờ vai bên em là ai?

import { Navigation, MainSection } from "@component";

const Team = () => {
  return (
    <MainSection
      id="team"
      className="container d-flex py-6"
      name="section">
      <h1>Team Pages</h1>
      <Navigation
        links={[
          { path: "/", name: "⭐⭐⭐" },
          { path: "register", name: "⭐Register⭐" },
        ]}
      />
    </MainSection>
  );
};

export default Team;
