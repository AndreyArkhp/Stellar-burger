import {useState} from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./registrationForms.module.css";
import Form from "../../components/Form/Form";

export default function Registration() {
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  return (
    <main className={styles.main}>
      <Form name={"register"} title={"Регистрация"}>
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
      </Form>
      <p className="text text_type_main-default mb-4">
        Уже зарегистрированы?{" "}
        <Link to={"/login"} className={styles.link}>
          Войти
        </Link>
      </p>
    </main>
  );
}
