import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import AppHeader from "../AppHeader/AppHeader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import HomePage from "../../pages/home";
import Login from "../../pages/forms/login";
import Registration from "../../pages/forms/register";
import ForgotPassword from "../../pages/forms/forgotPassword";
import ResetPassword from "../../pages/forms/resetPassword";
import Profile from "../../pages/forms/profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {getUserInfo} from "../../services/actions/authorization";
import IngredientPage from "../../pages/ingredient";
import NotFound from "../NotFound/NotFound";
import Modal from "../Modal/Modal";
import {closeIngredientModal} from "../../services/actions/modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {OrderFeedPage} from "../../pages/orderFeed";
import Order from "../Order/Order";
import {wsConnectFinish, wsConnectStart} from "../../services/actions/wsOrders";
import {wsOrdersUrl} from "../../utils/constants";
import {getIngridients} from "../../services/actions/ingredients";

function App() {
  const {modalOpen} = useSelector((store) => store.modal);
  const {wsConnection} = useSelector((store) => store.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const background = modalOpen && location.state?.background;

  const setActive = (bool) => {
    if (!bool) {
      dispatch(closeIngredientModal());
      navigate(-1);
    }
  };

  useEffect(() => {
    if (/^\/feed|profile\/order.*/.test(location.pathname)) {
      dispatch(wsConnectStart(wsOrdersUrl));
    } else if (wsConnection) {
      dispatch(wsConnectFinish());
    }
  }, [location, dispatch, wsConnection]);

  useEffect(() => {
    localStorage.refreshToken && dispatch(getUserInfo());
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <AppHeader />
      <Routes location={background ?? location}>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="ingredients/:ingredientId" element={<IngredientPage />} />
        <Route path="feed" element={<OrderFeedPage />} />
        <Route path="feed/:id" element={<Order />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:ingredientId"
            element={
              modalOpen && (
                <Modal setActive={setActive}>
                  <IngredientDetails />
                </Modal>
              )
            }
          />
          <Route
            path="feed/:id"
            element={
              <Modal setActive={setActive}>
                <Order />
              </Modal>
            }
          />
        </Routes>
      )}
    </ErrorBoundary>
  );
}

export default App;
