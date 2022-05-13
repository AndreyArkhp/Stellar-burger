import {useState} from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./resetPassword.module.css";

export default function ResetPassword() {
  return (
    <main className={styles.main}>
      <form name="login" className={`${styles.form} mb-20`}>
        <h2 className={`text text_type_main-medium ${styles.form__title}`}>
          Восстановление пароля
        </h2>
        <PasswordInput value="test test test" />
        <Input
          name={"password"}
          type={"password"}
          placeholder={"Введите новый пароль"}
          icon={"ShowIcon"}
        />
        <Input placeholder={"Введите код из письма"} name={"code"} />
        <Button type="primary" size="medium">
          Сохранить
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
