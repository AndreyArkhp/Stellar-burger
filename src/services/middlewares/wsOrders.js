export const ordersMiddlewar = (store) => {
  let socket = null;
  let wsActions = {};
  return (next) => (action) => {
    const {type, payload} = action;
    const {dispatch} = store;

    if (Object.is(type, payload?.wsActions?.wsInit)) {
      wsActions = payload.wsActions;
      socket = new WebSocket(payload.url);
      const {onOpen, onClose, onError, onMessage} = wsActions;
      socket.onopen = () => dispatch(onOpen());
      socket.onerror = (e) => dispatch(onError(e));
      socket.onclose = () => dispatch(onClose());
      socket.onmessage = (e) => dispatch(onMessage(e.data));
    }

    if (Object.is(type, wsActions?.wsFinish)) {
      wsActions = {};
      socket.close(1000, "The work is done");
    }

    next(action);
  };
};
