import {useState} from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./forms.module.css";

export default function Registration() {
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  return (
    <main className={styles.main}>
      <form name="register" className={`${styles.form} mb-20`}>
        <h2 className={`text text_type_main-medium ${styles.form__title}`}>Регистрация</h2>
        <Input
          placeholder={"Имя"}
          name={"name"}
          onChange={(e) => setValueName(e.target.value)}
          value={valueName}
        />
        <EmailInput
          name={"e-mail"}
          size="default"
          onChange={(e) => setValueEmail(e.target.value)}
          value={valueEmail}
        />
        <PasswordInput
          name={"password"}
          onChange={(e) => setValuePassword(e.target.value)}
          value={valuePassword}
        />
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
