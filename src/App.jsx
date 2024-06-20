import { useEffect, useMemo } from "react";
import { createRoutesFromElements as routers } from "react-router-dom";
import { createBrowserRouter as create, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loading as Spinner } from "@/component";
import protectedRoute from "./routes/protectedRoute";
import publicRoute from "./routes/publicRoutes";
import nested from "./routes/router.tsx";
import { removePreloader, selectElement } from "@/utils";

function App() {
  const { user, theme } = useSelector((state) => state.app);
  const isVip = user && user.isVip;

  const pages = useMemo(() => {
    return isVip ? [...protectedRoute, ...publicRoute] : [...publicRoute];
  }, [isVip]);

  useEffect(() => {
    removePreloader(".spinner");
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (html && theme.theme && theme.theme !== html.getAttribute("data-bs-theme")) {
      html.setAttribute("data-bs-theme", theme.theme);
    }
  }, [theme.theme]);

  const routerNested = useMemo(() => create(routers(nested(isVip, pages))), [isVip, pages]);

  return (
    routerNested && (
      <div id="app" className="app bg-body">
        <RouterProvider router={routerNested} fallbackElement={<Spinner />} />
      </div>
    )
  );
}

export default App;
