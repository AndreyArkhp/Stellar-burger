import {useState} from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./register.module.css";

export default function Registration() {
  return (
    <main className={styles.main}>
      <form name="register" className={`${styles.form} mb-20`}>
        <h2 className={`text text_type_main-medium ${styles.form__title}`}>Регистрация</h2>
        <Input placeholder={"Имя"} name={"name"} />
        <EmailInput name={"e-mail"} size="default" />
        <PasswordInput placeholder={"Пароль"} name={"password"} />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default mb-4">
        Уже зарегистрированы?{" "}
        <Link to={"/login"} className={styles.link}>
          Войти
        </Link>
      </p>
    </main>
  );
}
