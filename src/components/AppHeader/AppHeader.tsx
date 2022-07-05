import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useMatch} from "react-router-dom";
import styles from "./AppHeader.module.css";

function AppHeader() {
  const match = useMatch("*")?.pathname;
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <nav className={styles.nav}>
            <ul className={`${styles["nav__list-item"]} mt-5 mb-3`}>
              <li className="mr-2">
                <NavLink
                  to={"/"}
                  className={({isActive}) =>
                    `p-5 ${styles.header__link} ${isActive ? styles.header__link_active : ""}`
                  }
                >
                  <BurgerIcon type={match === "/" ? "primary" : "secondary"} />
                  <p className={`${styles.header__text} pl-2 text text_type_main-default`}>
                    Конструктор
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/feed"}
                  className={({isActive}) =>
                    `p-5 ${styles.header__link} ${isActive ? styles.header__link_active : ""}`
                  }
                >
                  <ListIcon type={match === "/feed" ? "primary" : "secondary"} />
                  <p className={`${styles.header__text} pl-2 text text_type_main-default`}>
                    Лента заказов
                  </p>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.logo}>
            <NavLink
              to={"/"}
              className={({isActive}) =>
                `p-5 ${styles.header__link} ${isActive ? styles.header__link_active : ""}`
              }
            >
              <Logo />
            </NavLink>
          </div>
          <div className={styles.personal}>
            <NavLink
              to={"/profile"}
              className={({isActive}) =>
                `p-5 ${styles.header__link} ${isActive ? styles.header__link_active : ""}`
              }
            >
              <ProfileIcon type={match === "/profile" ? "primary" : "secondary"} />
              <p className={`${styles.header__text} text text_type_main-default pl-2 mt-2`}>
                Личный кабинет
              </p>
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}

export default AppHeader;
