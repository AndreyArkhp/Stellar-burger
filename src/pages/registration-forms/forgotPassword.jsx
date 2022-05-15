import {useState} from "react";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./forms.module.css";

export default function ForgotPassword() {
  const [value, setValue] = useState("");
  return (
    <main className={styles.main}>
      <form name="login" className={`${styles.form} mb-20`}>
        <h2 className={`text text_type_main-medium ${styles.form__title}`}>
          Восстановление пароля
        </h2>
        <EmailInput
          name={"e-mail"}
          size="default"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default mb-4">
        Вспомнили пароль?{" "}
        <Link to={"/login"} className={styles.link}>
          Войти
        </Link>
      </p>
    </main>
  );
}
