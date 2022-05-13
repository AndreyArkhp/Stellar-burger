import {useState} from "react";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./login.module.css";

export default function Login() {
  return (
    <main className={styles.main}>
      <form name="login" className={`${styles.form} mb-20`}>
        <h2 className={`text text_type_main-medium ${styles.form__title}`}>Вход</h2>
        <EmailInput name={"e-mail"} size="default" />
        <Input type="text" />
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p>
        Вы — новый пользователь?
        <Link to={"/login"}>Зарегистрироваться</Link>
      </p>

      <p>
        Забыли пароль? <Link to={"/login"}>Восстановить пароль</Link>
      </p>
    </main>
  );
}
