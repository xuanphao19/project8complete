import { heroImg } from "@/assets/images";
const { coffee0, coffee1, coffee2, coffee6, bgr_right } = heroImg;

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

const heroData = [
  {
    title: "ORDER YOUR FAVORITE COFFEE",
    itemBgr: bgr_right,
    thumb: coffee2,
    href: "/login",
  },
  {
    title: "Lavazza Coffee Blends Try the Italian Espresso",
    itemBgr: bgr_right,
    thumb: coffee0,
    href: "/register",
  },
  {
    title: "Qualità Oro Mountain Grown Espresso Coffee Beans",
    itemBgr: bgr_right,
    thumb: coffee1,
    href: "/forgotpw",
  },
  {
    title: "ORDER YOUR FAVORITE COFFEE",
    itemBgr: bgr_right,
    thumb: coffee2,
    href: "/login",
  },
  {
    title: "Lavazza Coffee Blends Try the Italian Espresso",
    itemBgr: bgr_right,
    thumb: coffee6,
    href: "/register",
  },
  {
    title: "Qualità Oro Mountain Grown Espresso Coffee Beans",
    itemBgr: bgr_right,
    thumb: coffee1,
    href: "/forgotpw",
  },
];

const mapNav = {
  base: [
    { id: "link1", label: "Departments" },
    { id: "link2", label: "Grocery" },
    { id: "link3", label: "Beauty", active: true },
  ],
};

const mapNavFooter = {
  brand: [
    { to: "https://chromewebstore.google.com/?hl=vi", iconUrl: "Google-color" },
    { to: "https://github.com/xuanphao19", iconUrl: "GitHub" },
    { to: "https://stackoverflow.com/", iconUrl: "StackOverflow" },
    { to: "https://www.bootstrapcdn.com/", iconUrl: "Bootstrap" },
    { to: "https://www.apple.com/", iconUrl: "Apple_solid" },
    { to: "https://bitcoin.org/en/you-need-to-know", iconUrl: "Bitcoin" },
    { to: "https://www.android.com/", iconUrl: "android" },
  ],
  about: [
    { to: "/dashboard", name: "Departments" },
    { to: "/dashboard", name: "Fashion" },
    { to: "/dashboard", name: "Electronics" },
    { to: "/dashboard", name: "Bargains" },
  ],
  support: [
    { to: "/dashboard", name: "Frequently questions" },
    { to: "/dashboard", name: "Store locator" },
    { to: "/dashboard", name: "Order status" },
    { to: "/dashboard", name: "Help" },
  ],
  company: [
    { to: "/dashboard", name: "Customer Service" },
    { to: "/dashboard", name: "Terms of Use" },
    { to: "/dashboard", name: "Privacy" },
    { to: "/dashboard", name: "Careers" },
    { to: "/dashboard", name: "About" },
    { to: "/dashboard", name: "Affiliates" },
  ],
  started: [
    { to: "/dashboard", name: "Layout" },
    { to: "/dashboard", name: "Forms" },
    { to: "/dashboard", name: "Components" },
    { to: "/dashboard", name: "Utilities" },
  ],
};

export { heroData, loadedIdSvg, mapNav, mapNavFooter, SpinnerSvg };
