import {   Middleware } from "redux";
import { IWsOrderActions } from "../../types";
import { IWsActions } from "../actions/wsOrders";
import { TRootState } from "../reducers"; 




export const socketMiddleware:Middleware<{},TRootState> = (store) => {
  let socket = {} as WebSocket;
  let wsActions = {} as IWsActions;
  return (next) => (action:IWsOrderActions) => {
    const {type, payload} = action;
    const {dispatch} = store;
   
      if (Object.is(type, payload?.wsActions?.wsInit)) {
        wsActions = payload.wsActions;
        socket = new WebSocket(payload.url);
      
        const { onOpen, onClose, onError, onMessage } = wsActions;
        socket.onopen = () => dispatch(onOpen());
        socket.onerror = (e) => dispatch(onError(e));
        socket.onclose = () => dispatch(onClose());
        socket.onmessage = (e) => dispatch(onMessage(e.data));
      }
    

    if (Object.is(type, wsActions?.wsFinish)) {
      wsActions = {} as IWsActions;
      socket.close(1000, "The work is done");
    }

    next(action);
  };
};
