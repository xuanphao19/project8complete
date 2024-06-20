// PrivateRoute.js

import { DownloadPage, UploadPage, HomePages } from "@/pages";
import { routesConfig } from "@/config";
const { dashboard, features, notifi, profile, profileedit, settings, changepw, upload, download } = routesConfig;
const { Dashboard, FeatureSection } = HomePages;

const protectedRoute = [
  { path: dashboard, access: "private", component: Dashboard },
  { path: features, access: "private", component: FeatureSection },
  { path: upload, access: "private", component: UploadPage, layout: null },
  { path: download, access: "private", component: DownloadPage, layout: null },
];

export default protectedRoute;
