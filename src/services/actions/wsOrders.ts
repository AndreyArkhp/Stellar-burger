
export const WS_CONNECTION_START: "WS_CONECTION_START" = "WS_CONECTION_START";
export const WS_CONNECTION_FINISH:"WS_CONECTION_FINISH" = "WS_CONECTION_FINISH";
export const WS_CONNECTION_SUCCESS:"WS_CONECTION_SUCCESS" = "WS_CONECTION_SUCCESS";
export const WS_CONNECTION_ERROR:"WS_CONECTION_ERROR" = "WS_CONECTION_ERROR";
export const WS_CONNECTION_CLOSE:"WS_CONECTION_CLOSE" = "WS_CONECTION_CLOSE";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";

interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR;
  payload: any;
}

interface IWsConnectionClose {
  type: typeof WS_CONNECTION_CLOSE;
}

interface IWsGetMessege {
  type: typeof WS_GET_MESSAGE
  payload: string;
}

interface IWsConectStartPayload {
  url: string;
  wsActions: IWsActions;
  wsName: string;
}

interface IWsConnectStart {
  type: typeof WS_CONNECTION_START;
  payload: IWsConectStartPayload;
}

interface IWsConnectFinish {
  type: typeof WS_CONNECTION_FINISH;
}

export type TWsOrders = IWsConnectionSuccess | IWsConnectionError | IWsConnectionClose | IWsGetMessege | IWsConnectStart | IWsConnectFinish;

interface IWsActions {
  wsInit: typeof WS_CONNECTION_START;
  wsFinish:typeof WS_CONNECTION_FINISH;
  onOpen: typeof wsConnectionSuccess;
  onClose:typeof wsConnectionClose;
  onError:typeof wsConnectionError;
  onMessage:typeof wsGetMessage;
}

export const wsConnectionSuccess = ():IWsConnectionSuccess => {
  return {type: WS_CONNECTION_SUCCESS};
};

export const wsConnectionError = (error:any):IWsConnectionError => {
  return {type: WS_CONNECTION_ERROR, payload: error};
};

export const wsConnectionClose = ():IWsConnectionClose => {
  return {type: WS_CONNECTION_CLOSE};
};

export const wsGetMessage = (message: string):IWsGetMessege => {
  return {type: WS_GET_MESSAGE, payload: message};
};

export const wsConnectStart = (url:string, wsName:string):IWsConnectStart => {
  return {type: WS_CONNECTION_START, payload: {url, wsActions, wsName}};
};

export const wsConnectFinish = ():IWsConnectFinish => {
  return {type: WS_CONNECTION_FINISH};
};

const wsActions:IWsActions = {
  wsInit: WS_CONNECTION_START,
  wsFinish: WS_CONNECTION_FINISH,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClose,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
};
