// src/routers/PublicRoute.js

import { HomePages, ProductPage } from "@/pages";
import { Welcome, ContactPage } from "@/pages";
const { HomePage, Testimonials } = HomePages;
const { home, login, register, forgotpw, team, about, testimonials, history, products, contact } = routesConfig;
import { routesConfig } from "@/config";
import { loginAction } from "@/pages";

interface UI {
  id?: string;
  path: string;
  access?: string;
  layout?: string | null;
  loader?: React.FC;
  action?: React.FC;
  component: () => React.JSX.Element;
  children?: UI[];
}

const publicRoute: UI[] = [
  {
    id: "home",
    path: home,
    access: "public",
    component: HomePage,
  },
  { id: "", path: contact, access: "private", component: ContactPage },
  { id: "", path: testimonials, component: Testimonials, layout: null },
  { id: "products*", path: "/products/*", component: ProductPage },
  { id: "about*", path: "/about/*", component: Welcome },
];

export default publicRoute;
