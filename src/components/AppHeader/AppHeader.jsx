import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Outlet} from "react-router-dom";
import styles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <nav className={styles.nav}>
            <ul className={`${styles["nav__list-item"]} mt-5 mb-3`}>
              <li className="mr-2">
                <a href="#" className={`p-5 ${styles.header__link}`}>
                  <BurgerIcon type="primary" />
                  <p className={`${styles.header__text} pl-2 text text_type_main-default`}>
                    Конструктор
                  </p>
                </a>
              </li>
              <li>
                <a href="#" className={`p-5 ${styles.header__link}`}>
                  {" "}
                  <ListIcon type="primary" />
                  <p className={`${styles.header__text} pl-2 text text_type_main-default`}>
                    Лента заказов
                  </p>
                </a>
              </li>
            </ul>
          </nav>
          <div className={styles.logo}>
            {" "}
            <a href="#" className={`${styles.header__link} mt-2`}>
              <Logo />
            </a>
          </div>
          <div className={styles.personal}>
            <a href="#" className={`p-5 ${styles.header__link}`}>
              <ProfileIcon type="primary" />
              <p className={`${styles.header__text} text text_type_main-default pl-2 mt-2`}>
                Личный кабинет
              </p>
            </a>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default AppHeader;
