import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./global.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import store from "./store/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>
);
