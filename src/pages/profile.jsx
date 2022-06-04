import {NavLink} from "react-router-dom";
import {Routes, Route} from "react-router-dom";

import styles from "./profile.module.css";

import {useDispatch} from "react-redux";
import {logout} from "../services/actions/authorization";
import ProfileForm from "./forms/profileForm";
import HistoryOrdersPage from "./historyOrders";

export default function Profile() {
  const dispatch = useDispatch();
  return (
    <main className={`${styles.main} pl-10`}>
      <nav className={styles.links}>
        <p className="text text_type_main-medium pt-4 pb-4">
          <NavLink
            to={""}
            end
            className={({isActive}) =>
              `${styles.links__item} text_color_inactive ${
                isActive ? styles.links__item_active : ""
              }`
            }
          >
            Профиль
          </NavLink>
        </p>
        <p className="text text_type_main-medium pt-4 pb-4 ">
          <NavLink
            to={"orders"}
            className={({isActive}) =>
              `${styles.links__item} text_color_inactive ${
                isActive ? styles.links__item_active : ""
              }`
            }
          >
            История заказов
          </NavLink>
        </p>
        <p className="text text_type_main-medium pt-4 pb-4 ">
          <NavLink
            to={""}
            className={`${styles.links__item} text_color_inactive`}
            onClick={() => dispatch(logout())}
          >
            Выход
          </NavLink>
        </p>
        <p className="mt-20 pt-1 text text_type_main-default text_color_inactive">
          В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
        </p>
      </nav>
      <Routes>
        <Route path="" element={<ProfileForm />} />
        <Route path="/orders" element={<HistoryOrdersPage />} />
      </Routes>
    </main>
  );
}
