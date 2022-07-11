import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

import store from "./services/store";
import App from "./components/App/App";
import "./index.css";

const app = document.getElementById("app-root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={`/${process.env.PUBLIC_URL}`}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  app
);
