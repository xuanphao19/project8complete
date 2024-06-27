import { Navigation, MainSection } from "@component";

const ChangePassword = () => {
  return (
    <MainSection
      id="change-password"
      className="container d-flex py-6"
      name="article">
      <h1>ChangePassword</h1>
      <Navigation
        links={[
          { path: "/", name: "⭐⭐⭐" },
          { path: "register", name: "⭐Register⭐" },
        ]}
      />
    </MainSection>
  );
};

export default ChangePassword;
