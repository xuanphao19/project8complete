// src/routers/PublicRoute.js

import { HomePage, Welcome, InviteLogIn } from "@/pages";
import { ContactPage, ProductPage, ProductResults } from "@/pages";
import { loaderFastFilter } from "@/pages";
import { RegisterPage, LoginPage } from "@/pages";
import { routesConfig } from "@/config";
import { actionLogin } from "@/pages";
const { home, login, register, forgotpw, team, about, testimonials, history, products, contact } = routesConfig;

interface UI {
  id?: string;
  path: string;
  access: string;
  layout?: string | null;
  loader?: React.FC;
  action?: React.FC;
  component: React.JSX.Element;
  children?: UI[];
}

const publicRoute: UI[] = [
  {
    id: "home",
    path: home,
    access: "public",
    component: HomePage,
    children: [{ id: "fastfilter", loader: loaderFastFilter, path: ":paramId/fastfilter", access: "public", component: ProductResults }],
  },
  { id: "contact", path: contact, access: "private", component: ContactPage },
  { id: "register", path: register, access: "public", component: RegisterPage, layout: null },
  { id: "login", path: login, access: "public", component: LoginPage, layout: null },
  /*

  */
  { id: "", path: testimonials, access: "public", component: InviteLogIn, layout: "default" },
  { id: "products*", path: "/products/*", access: "public", component: ProductPage },
  { id: "about*", path: "/about/*", access: "public", component: Welcome },
];

export default publicRoute;
