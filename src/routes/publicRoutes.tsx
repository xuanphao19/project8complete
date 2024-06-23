// src/routers/PublicRoute.js

import { HomePage, Welcome, InviteLogIn, ProductPage } from "@/pages";
import { ContactPage } from "@/pages";
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
  { id: "home", path: home, access: "public", component: HomePage },
  { id: "", path: contact, access: "private", component: ContactPage },
  { id: "", path: testimonials, component: InviteLogIn, layout: "default" },
  { id: "products*", path: "/products/*", component: ProductPage },
  { id: "about*", path: "/about/*", component: Welcome },
];

export default publicRoute;
