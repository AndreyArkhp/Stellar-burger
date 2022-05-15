import {useState} from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./forms.module.css";

export default function Login() {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  return (
    <main className={styles.main}>
      <form name="login" className={`${styles.form} mb-20`}>
        <h2 className={`text text_type_main-medium ${styles.form__title}`}>Вход</h2>
        <EmailInput
          name={"e-mail"}
          size="default"
          onChange={(e) => setValueEmail(e.target.value)}
          value={valueEmail}
        />
        <PasswordInput
          placeholder={"Пароль"}
          name={"password"}
          onChange={(e) => setValuePassword(e.target.value)}
          value={valuePassword}
        />
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default mb-4">
        Вы — новый пользователь?{" "}
        <Link to={"/register"} className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>

      <p className="text text_type_main-default">
        Забыли пароль?{" "}
        <Link to={"/forgotpassword"} className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
}
