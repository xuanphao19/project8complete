import { useEffect, useMemo } from "react";
import { createRoutesFromElements as routers } from "react-router-dom";
import { createBrowserRouter as create, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setInitialData } from "@/vendor";
import { fetchGlobalsData } from "@/api";
import { Loading as Spinner } from "@/component";
import protectedRoute from "./routes/protectedRoute";
import publicRoute from "./routes/publicRoutes";
import nested from "./routes/router.tsx";
import { removePreloader } from "@/utils";

function App() {
  const dispatch = useDispatch();
  const { user, theme, status } = useSelector((state) => state.app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGlobalsData();
        dispatch(setInitialData(data));
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    if (status === "idle") fetchData();
    removePreloader(".spinner");
  }, []);

  const isVip = user && user?.isVip;
  const pages = useMemo(() => {
    return isVip ? [...protectedRoute, ...publicRoute] : [...publicRoute];
  }, [isVip]);

  useEffect(() => {
    const html = document.documentElement;
    if (html && theme.theme && theme.theme !== html.getAttribute("data-bs-theme")) {
      html.setAttribute("data-bs-theme", theme.theme);
    }
  }, [theme.theme]);

  const routerNested = useMemo(() => create(routers(nested(isVip, pages))), [isVip, pages]);

  if (!user) {
    return <Spinner className="vh-60 flex-center" />;
  }

  return (
    routerNested && (
      <div
        id="app"
        className="app bg-body">
        <RouterProvider
          router={routerNested}
          fallbackElement={<Spinner />}
        />
      </div>
    )
  );
}

export default App;
