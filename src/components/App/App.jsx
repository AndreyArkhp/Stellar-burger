import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppHeader from "../AppHeader/AppHeader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import HomePage from "../../pages/home";

import Login from "../../pages/forms/login";
import Registration from "../../pages/forms/register";
import ForgotPassword from "../../pages/forms/forgotPassword";
import ResetPassword from "../../pages/forms/resetPassword";
import Profile from "../../pages/forms/profile";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<AppHeader />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="profile" element={<Profile />}></Route>
          </Route>
          <Route
            path="*"
            element={
              <main style={{padding: "1rem"}}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
