// router.tsx
import React from "react";
import { Route } from "react-router-dom";

import { layoutSwitcher } from "@/layout";
import Root, { loader as rootLoader } from "./Root";

import { HomePage, InviteLogIn, ErrorPages, Welcome } from "@/pages";

interface UI {
  id?: string;
  path: string;
  layout?: string | null;
  access?: string;
  history?: History | null;
  fallbackElement?: any;
  component: () => React.JSX.Element;
  loader?: React.FC;
  action?: React.FC;
  children?: UI[];
}

const nestedRoutes = (isVip: boolean, data: UI[]): JSX.Element => {
  return (
    <Route
      id="root"
      path={"/"}
      element={<Root />}
      errorElement={<ErrorPages />}
      loader={rootLoader}>
      {data.map((page, i) => {
        const Layouts: React.JSX.Element = layoutSwitcher(page.layout);
        const childrenPages = isVip && page.children && page.children;
        const Pages = page.component;
        const path = !page.access ? page.path : page.access === "private" && isVip ? page.path : "";
        const loader = page.loader;
        const action = page.action;
        return (
          <Route
            key={`${i}`}
            id={page.id ? `layouts-${page.id}` : null}
            element={Layouts}
            loader={loader}
            action={action}>
            <Route
              id={page.id ? `${page.id}` : `${page.path}`}
              path={path}
              errorElement={<ErrorPages />}
              element={<Pages />}
              loader={loader}
              action={page.action}>
              {childrenPages && generateRoutes(childrenPages)}
            </Route>
          </Route>
        );
      })}
      <Route
        path="*"
        element={!isVip ? <InviteLogIn /> : <Welcome />}
      />
    </Route>
  );
};

const generateRoutes = (childrenPages: UI[]): JSX.Element[] => {
  return childrenPages.map((page) => {
    const Page = page.component;
    return (
      <Route
        id={page.id ? `${page.id}` : `${page.path}`}
        key={page.path}
        path={page.path}
        element={<Page />}
        loader={page.loader}
        action={page.action}>
        {page.children && generateRoutes(page.children)}
      </Route>
    );
  });
};

export default nestedRoutes;
