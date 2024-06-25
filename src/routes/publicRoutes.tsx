// src/routers/PublicRoute.js

import { HomePage, Welcome, InviteLogIn, ProductPage } from "@/pages";
import { RegisterPage } from "@/pages";
import { ContactPage } from "@/pages";
const { home, login, register, forgotpw, team, about, testimonials, history, products, contact } = routesConfig;
import { routesConfig } from "@/config";
import { loginAction } from "@/pages";

interface UI {
  id?: string;
  path: string;
  access: string;
  layout?: string | null;
  loader?: React.FC;
  action?: React.FC;
  component: () => React.JSX.Element;
  children?: UI[];
}

const publicRoute: UI[] = [
  { id: "home", path: home, access: "public", component: HomePage },
  { id: "contact", path: contact, access: "private", component: ContactPage },

  { id: "register", path: register, access: "public", component: RegisterPage, layout: null },

  /*

  */
  { id: "", path: testimonials, access: "public", component: InviteLogIn, layout: "default" },
  { id: "products*", path: "/products/*", access: "public", component: ProductPage },
  { id: "about*", path: "/about/*", access: "public", component: Welcome },
];

export default publicRoute;
