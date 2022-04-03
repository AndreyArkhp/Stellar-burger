import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";

const app = document.getElementById("app-root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  app
);
