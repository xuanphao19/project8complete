import { useEffect, useMemo } from 'react';
import { createRoutesFromElements as routers } from 'react-router-dom';
import { createBrowserRouter as create, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Loading as Spinner } from '@/component';
import protectedRoute from './routes/protectedRoute';
import publicRoute from './routes/publicRoutes';
import nested from './routes/router.tsx';
import { removePreloader } from '@/utils';

function App() {
  const { userData, themeData } = useSelector((state) => state.app);
  console.log(userData);

  const isVip = userData && userData?.isVip;

  const pages = useMemo(() => {
    return isVip ? [...protectedRoute, ...publicRoute] : [...publicRoute];
  }, [isVip]);

  useEffect(() => {
    removePreloader('.spinner');
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (html && themeData.theme && themeData.theme !== html.getAttribute('data-bs-theme')) {
      html.setAttribute('data-bs-theme', themeData.theme);
    }
  }, [themeData.theme]);

  const routerNested = useMemo(() => create(routers(nested(isVip, pages))), [isVip, pages]);

  return (
    routerNested && (
      <div
        id='app'
        className='app bg-body'
      >
        <RouterProvider
          router={routerNested}
          fallbackElement={<Spinner />}
        />
      </div>
    )
  );
}

export default App;
