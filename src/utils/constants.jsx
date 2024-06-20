const loadedIdSvg = [];

const SpinnerSvg = ({ className }) => {
  return (
    <svg
      className={className}
      style={{ width: 0, height: 0, visibility: "hidden", position: "absolute" }}
      id="loading"
      viewBox="0 0 200 200">
      <radialGradient
        id="a1"
        cx=".66"
        fx=".66"
        cy=".3125"
        fy=".3125"
        gradientTransform="scale(1.5)">
        <stop
          offset="0.1"
          stopColor="currentColor"></stop>
        <stop
          offset=".5"
          stopColor="currentColor"
          stopOpacity=".4"></stop>
        <stop
          offset=".6"
          stopColor="currentColor"
          stopOpacity=".3"></stop>
        <stop
          offset=".8"
          stopColor="currentColor"
          stopOpacity=".2"></stop>
        <stop
          offset="1"
          stopColor="currentColor"
          stopOpacity="0"></stop>
      </radialGradient>
    </svg>
  );
};

const mapNav = {
  base: [
    { id: "link1", label: "Departments" },
    { id: "link2", label: "Grocery" },
    { id: "link3", label: "Beauty", active: true },
  ],
};

const mapNavFooter = {
  brand: [
    { to: "/about", iconUrl: "Google-color" },
    { to: "/about", iconUrl: "GitHub" },
    { to: "/about", iconUrl: "StackOverflow" },
    { to: "/about", iconUrl: "Bootstrap" },
    { to: "/about", iconUrl: "Apple_solid" },
    { to: "/about", iconUrl: "Bitcoin" },
    { to: "/about", iconUrl: "android" },
  ],
  about: [
    { to: "/about", name: "Departments" },
    { to: "/about", name: "Fashion" },
    { to: "/about", name: "Electronics" },
    { to: "/about", name: "Bargains" },
  ],
  support: [
    { to: "/about", name: "Frequently questions" },
    { to: "/about", name: "Store locator" },
    { to: "/about", name: "Order status" },
    { to: "/about", name: "Help" },
  ],
  company: [
    { to: "/about", name: "Customer Service" },
    { to: "/about", name: "Terms of Use" },
    { to: "/about", name: "Privacy" },
    { to: "/about", name: "Careers" },
    { to: "/about", name: "About" },
    { to: "/about", name: "Affiliates" },
  ],
  started: [
    { to: "/about", name: "Layout" },
    { to: "/about", name: "Forms" },
    { to: "/about", name: "Components" },
    { to: "/about", name: "Utilities" },
  ],
};

export { loadedIdSvg, mapNav, mapNavFooter, SpinnerSvg };
