import {NavLink, useLocation} from "react-router-dom";
import {Routes, Route} from "react-router-dom";

import styles from "./profile.module.css";

import {useDispatch} from "react-redux";
import {logout} from "../../services/actions/authorization";
import ProfileForm from "../forms/profileForm/profileForm";
import HistoryOrdersPage from "../historyOrders/historyOrders";
import Order from "../../components/Order/Order";
import Modal from "../../components/Modal/Modal";
import { TLocationState } from "../../types";

function MenuProfile() {
  const dispatch = useDispatch();
  return (
    <nav className={styles.links}>
      <ul className={styles.listLinks}>
        <li className="text text_type_main-medium pt-4 pb-4">
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
        </li>
        <li className="text text_type_main-medium pt-4 pb-4 ">
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
        </li>
        <li className="text text_type_main-medium pt-4 pb-4 ">
          <NavLink
            to={""}
            className={`${styles.links__item} text_color_inactive`}
            onClick={() => dispatch(logout())}
          >
            Выход
          </NavLink>
        </li>
        <p className="mt-20 pt-1 text text_type_main-default text_color_inactive">
          В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
        </p>
      </ul>
    </nav>
  );
}

export default function Profile({setActiveModal}:{setActiveModal:(bool:boolean)=>void}) {
  const location = useLocation() as TLocationState;
  const background = location.state?.background;
  return (
    <main className={`${styles.main} pl-10`}>
      <MenuProfile />
      <Routes location={background ?? location}>
        <Route path="" element={<ProfileForm />} />
        <Route path="/orders" element={<HistoryOrdersPage />} />
      </Routes>
      <Routes>
        {background && (
          <Route
            path="orders/:id"
            element={
              <Modal setActive={setActiveModal}>
                <Order />
              </Modal>
            }
          />
        )}
      </Routes>
    </main>
  );
}
