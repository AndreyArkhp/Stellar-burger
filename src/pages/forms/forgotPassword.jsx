import {useState, useRef, useEffect} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";

import styles from "./registrationForms.module.css";
import Form from "../../components/Form/Form";
import {baseUrl} from "../../utils/constants";
import {checkEmail} from "../../utils/functions";

export default function ForgotPassword() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  function showErorEmail() {
    !value ? setError(false) : setError(!checkEmail(value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${baseUrl}password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({email: value}),
    }).then((res) => {
      if (res.ok) {
        navigate("/resetpassword", {replace: true});
      } else {
        const error = new Error("Ошибка, попробуйте еще раз");
        throw error;
      }
    });
  }

  useEffect(() => {
    checkEmail(value) ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [value]);

  return (
    <main className={styles.main}>
      <Form name={"password-reset"} title={"Восстановление пароля"}>
        <Input
          name="email"
          onChange={(e) => setValue(e.target.value)}
          type={"email"}
          value={value}
          onBlur={showErorEmail}
          onFocus={() => setError(false)}
          placeholder={"Укажите e-mail"}
          ref={inputRef}
          errorText={"Некоректный email"}
          error={error}
        />
        <Button type="primary" size="medium" onClick={handleSubmit} disabled={btnDisabled}>
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