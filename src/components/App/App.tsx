import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import  { FC, useEffect} from "react";
import {useDispatch, useSelector} from "../../services/types/hooks";

import AppHeader from "../AppHeader/AppHeader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import HomePage from "../../pages/home/home";
import  Login  from "../../pages/forms/login/login";
import Registration from "../../pages/forms/register/register";
import ForgotPassword from "../../pages/forms/forgotPassword/forgotPassword";
import ResetPassword from "../../pages/forms/resetPassword/resetPassword";
import Profile from "../../pages/profile/profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {getUserInfo} from "../../services/actions/authorization";
import IngredientPage from "../../pages/ingredient/ingredient";
import NotFound from "../NotFound/NotFound";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {OrderFeedPage} from "../../pages/orderFeed/orderFeed";
import Order from "../Order/Order";
import {getIngridients} from "../../services/actions/ingredients";
import { closeIngredientModal } from "../../services/actions/modal";
import { TLocationState } from "../../types";



const App:FC = () => {
  const {modalOpen} = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as TLocationState;  

  

  const background = modalOpen?location.state?.background:undefined;
  
  const setActive = (bool:boolean):void => {
    if (!bool) {
      dispatch(closeIngredientModal());
      navigate(-1);
    }
  };

  useEffect(() => {
    localStorage.refreshToken && dispatch(getUserInfo());
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <AppHeader />
      <Routes location={background ?? location}>
        <Route path="" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="ingredients/:ingredientId" element={<IngredientPage />} />
        <Route path="feed" element={<OrderFeedPage />} />
        <Route path="feed/:id" element={<Order />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile/orders/:id" element={<Order />} />
          <Route path="profile/*" element={<Profile setActiveModal={setActive} />} />
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
