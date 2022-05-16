import {useState} from "react";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./registrationForms.module.css";
import Form from "../../components/Form/Form";

export default function ForgotPassword() {
  const [value, setValue] = useState("");
  return (
    <main className={styles.main}>
      <Form name={"password-reset"} title={"Восстановление пароля"}>
        <EmailInput
          name={"e-mail"}
          size="default"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </Form>
      <p className="text text_type_main-default mb-4">
        Вспомнили пароль?{" "}
        <Link to={"/login"} className={styles.link}>
          Войти
        </Link>
      </p>
    </main>
  );
}
