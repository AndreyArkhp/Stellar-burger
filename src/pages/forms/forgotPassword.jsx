import {useState, useRef} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./registrationForms.module.css";
import Form from "../../components/Form/Form";

export default function ForgotPassword() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  function handleEmail(e) {
    const value = e.target.value;

    value ? setError(!/^\w+@\w+\.\w{2,}/.test(value)) : setError(false);
  }

  return (
    <main className={styles.main}>
      <Form name={"password-reset"} title={"Восстановление пароля"}>
        <Input
          name="email"
          onChange={(e) => setValue(e.target.value)}
          type={"email"}
          value={value}
          placeholder={"Укажите e-mail"}
          onBlur={handleEmail}
          ref={inputRef}
          errorText={"Некоректный email"}
          error={error}
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
