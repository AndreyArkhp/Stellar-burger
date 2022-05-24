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

function App() {
  const {ingredientOpen, modalIngredientData} = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const background = ingredientOpen && location.state?.background;

  const setActive = (bool) => {
    if (!bool) {
      dispatch(closeIngredientModal());
      navigate(-1);
    }
  };

  useEffect(() => {
    localStorage.refreshToken && dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="ingredients/:ingredientId" element={<IngredientPage />} />
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
              ingredientOpen && (
                <Modal setActive={setActive}>
                  <IngredientDetails card={modalIngredientData} />
                </Modal>
              )
            }
          />
        </Routes>
      )}
    </ErrorBoundary>
  );
}

export default App;
