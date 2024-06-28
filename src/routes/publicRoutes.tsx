// src/routers/PublicRoute.js

import { HomePage, RegisterPage, LoginPage, ForgotPw } from "@/pages";
import { ProductPage, ProductResults, ProductHeader } from "@/pages";
import { ProductCheckout, OrderStatus, PaymentMethod } from "@/pages";
import { DestroyProduct, CheckoutAll, ProductDetails } from "@/pages";
import { loaderFastFilter, loaderProduct, checkoutAction } from "@/pages";
import { shippingAction, paymentAction, destroyAction } from "@/pages";
import { actionCheckoutAll, UserProfile, ContactPage } from "@/pages";
import { routesConfig } from "@/config";
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
  { id: "forgotpw", path: forgotpw, access: "public", component: ForgotPw, layout: null },
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
        children: [
          { id: "shipping", access: "private", path: ":shipping", action: shippingAction, component: OrderStatus },
          { id: "payment", access: "private", path: "shipping/:payId", component: PaymentMethod, action: paymentAction },
          { id: "destroyFavourite", access: "private", path: ":favouriteId/destroyFavourite", action: destroyAction, component: DestroyProduct },
        ],
      },
      { id: "checkout-all", access: "private", path: "checkout/all", component: CheckoutAll, action: actionCheckoutAll },
      { id: "cart", access: "private", path: ":cartId/cart", component: ProductPage },
      { id: "details", access: "public", path: ":paramId/details", loader: loaderProduct, component: ProductDetails },
    ],
  },
  { id: "profile", path: "/profile", access: "private", component: UserProfile },
];

export default publicRoute;
