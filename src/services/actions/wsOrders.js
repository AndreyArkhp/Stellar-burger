export const WS_CONNECTION_START = "WS_CONECTION_START";
export const WS_CONNECTION_FINISH = "WS_CONECTION_FINISH";
export const WS_CONNECTION_SUCCESS = "WS_CONECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONECTION_ERROR";
export const WS_CONNECTION_CLOSE = "WS_CONECTION_CLOSE";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";

export const wsConnectionSuccess = () => {
  return {type: WS_CONNECTION_SUCCESS};
};

export const wsConnectionError = (error) => {
  return {type: WS_CONNECTION_ERROR, payload: error};
};

export const wsConnectionClose = () => {
  return {type: WS_CONNECTION_CLOSE};
};

export const wsGetMessage = (message) => {
  return {type: WS_GET_MESSAGE, payload: message};
};

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsFinish: WS_CONNECTION_FINISH,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClose,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
};

export const wsConnectStart = (url, wsName) => {
  return {type: WS_CONNECTION_START, payload: {url, wsActions, wsName}};
};

export const wsConnectFinish = () => {
  return {type: WS_CONNECTION_FINISH};
};
