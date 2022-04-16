import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App/App";

import "./index.css";
import { rootReducer } from "./services/reducers/index";

const app = document.getElementById("app-root");

const enhance = applyMiddleware(thunk);
export const store = createStore(rootReducer, enhance);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  app
);
