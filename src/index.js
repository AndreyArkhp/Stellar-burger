import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./services/store";
import App from "./components/App/App";
import "./index.css";

const app = document.getElementById("app-root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  app
);
