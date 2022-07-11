import {Link} from "react-router-dom";

import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1 className={`${styles.title} text text_type_main-large`}>404</h1>
      <h2 className={`${styles.subtitle} text text_type_main-large`}>СТРАНИЦА НЕ НАЙДЕНА</h2>
      <p className={`${styles.text} text text_type_main-large`}>
        Страница, на которую вы пытаетесь попасть, не существует или была удалена. Перейдите на{" "}
        <Link to={"/"} replace={true} className={styles.link}>
          Главную страницу
        </Link>
      </p>
    </main>
  );
}
