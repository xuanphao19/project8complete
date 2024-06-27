// src/routers/PublicRoute.js

import { RegisterPage, LoginPage } from "@/pages";
import { HomePage, Welcome, InviteLogIn } from "@/pages";

import { ProductPage, ProductResults, ProductHeader } from "@/pages";
import { ProductCheckout } from "@/pages";
import { loaderFastFilter, loaderProduct, checkoutAction } from "@/pages";
import { ContactPage } from "@/pages";
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
  {
    id: "products*",
    path: `/${products}/*`,
    access: "private",
    component: ProductPage,
    children: [
      { id: "", path: "", access: "private", component: ProductHeader },
      {
        id: "checkout",
        path: "checkout",
        access: "private",
        component: ProductCheckout,
        action: checkoutAction,
        loader: loaderProduct,
      },
      //   // children: [
      //   //   { id: "shipping", path: ":shipping", action: shippingAction, component: OrderStatus },
      //   //   { id: "payment", path: "shipping/:payId", component: PaymentMethod, action: paymentAction },
      //   //   { id: "destroyFavourite", path: ":favouriteId/destroyFavourite", action: destroyAction, component: DestroyProduct },
      //   //   { id: "destroyCart", path: ":cartId/destroyCart", action: destroyAction, component: DestroyProduct },
      //   // ],
      // },

      // { id: "checkout-all", path: "checkout/all", component: CheckoutAll, action: actionCheckoutAll },

      // { id: "exit-product", path: ":paramId", component: ProductPage },
      // { id: "", path: ":paramId/cart", component: ProductPage },
      // { id: "", path: ":paramId/details", loader: loaderProduct, component: ProductDetails },
    ],
  },
  /*

  */
  { id: "", path: testimonials, access: "public", component: InviteLogIn, layout: "default" },

  { id: "about*", path: "/about/*", access: "public", component: Welcome },
];

export default publicRoute;
