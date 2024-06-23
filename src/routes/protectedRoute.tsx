// PrivateRoute.js

import { DownloadPage, UploadPage } from "@/pages";
import { routesConfig } from "@/config";
const { dashboard, features, notifi, profile, profileedit, settings, changepw, upload, download } = routesConfig;

const protectedRoute = [
  { path: upload, access: "private", component: UploadPage, layout: null },
  { path: download, access: "private", component: DownloadPage, layout: null },
];

export default protectedRoute;
