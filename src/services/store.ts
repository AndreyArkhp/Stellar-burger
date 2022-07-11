import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";


import {rootReducer} from "./reducers/index";
import { socketMiddleware } from "./middlewares/socketMiddleware";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const enhance = composeEnhancers(applyMiddleware(thunk, socketMiddleware));
const store = createStore(rootReducer, enhance);
export default store;
