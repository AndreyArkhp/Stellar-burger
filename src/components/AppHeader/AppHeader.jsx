import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import styles from "./AppHeader.module.css";

function AppHeader() {
  const [activeLink, setActiveLink] = useState();
  const location = useLocation();

  useEffect(() => {
    const link = [...document.querySelectorAll(".link")].find((link) =>
      Object.is(link.getAttribute("href"), location.pathname)
    );
    if (activeLink && !Object.is(activeLink, link) && link) {
      activeLink.classList.remove(`${styles["header__link_active"]}`);
      link.classList.add(`${styles["header__link_active"]}`);
      setActiveLink(link);
    }
    if (!activeLink && link) {
      link.classList.add(`${styles["header__link_active"]}`);
      setActiveLink(link);
    }
  }, [location, activeLink]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <nav className={styles.nav}>
            <ul className={`${styles["nav__list-item"]} mt-5 mb-3`}>
              <li className="mr-2">
                <Link to={"/"} className={`p-5 ${styles.header__link} link`}>
                  <BurgerIcon type="primary" />
                  <p className={`${styles.header__text} pl-2 text text_type_main-default`}>
                    Конструктор
                  </p>
                </Link>
              </li>
              <li>
                <Link to={"feed"} className={`p-5 ${styles.header__link} link`}>
                  {" "}
                  <ListIcon type="primary" />
                  <p className={`${styles.header__text} pl-2 text text_type_main-default`}>
                    Лента заказов
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.logo}>
            <Link to={"/"} className={`${styles.header__link} mt-2`}>
              <Logo />
            </Link>
          </div>
          <div className={styles.personal}>
            <Link to={"profile"} className={`p-5 ${styles.header__link} link`}>
              <ProfileIcon type="primary" />
              <p className={`${styles.header__text} text text_type_main-default pl-2 mt-2`}>
                Личный кабинет
              </p>
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default AppHeader;
