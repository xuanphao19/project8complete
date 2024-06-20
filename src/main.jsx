import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/bases/_reset.css";
import "./styles/bases/_main.min.css";
import "./styles/bases/_main_dark.min.css";
import "./styles/bases/_responsive.min.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./vendor/redux/store";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
