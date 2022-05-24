import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

export default function ProtectedRoute() {
  const {isAuth} = useSelector((store) => store.dataUser);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !localStorage.refreshToken) {
      navigate("/login", {state: location.pathname});
    }
  }, [isAuth, navigate, location]);

  return <Outlet />;
}
