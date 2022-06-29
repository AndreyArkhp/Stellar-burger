import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./registrationForms.module.css";
import Form from "../../components/Form/Form";
import {registration} from "../../services/actions/authorization";
import {checkEmail} from "../../utils/functions";

export default function Registration() {
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const {isAuth, isError} = useSelector((store) => store.dataUser);
  const navigate = useNavigate();
  const errorMessage = (isError && "Что то пошло не так, пожалуйста попробуйте снова") || "";

  useEffect(() => {
    isAuth && navigate("/", {replace: true});
  }, [isAuth, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registration(valueName, valueEmail, valuePassword));
  }

  useEffect(() => {
    if (checkEmail(valueEmail) && valueName.length > 1 && valuePassword.length > 5) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [valueEmail, valueName, valuePassword]);

  return (
    <main className={styles.main}>
      <Form
        name={"register"}
        title={"Регистрация"}
        error={errorMessage}
        handleSubmit={handleSubmit}
      >
        <Input
          placeholder={"Имя"}
          name={"name"}
          onChange={(e) => setValueName(e.target.value)}
          value={valueName}
        />
        <EmailInput
          name={"email"}
          size="default"
          onChange={(e) => setValueEmail(e.target.value)}
          value={valueEmail}
        />
        <PasswordInput
          name={"password"}
          onChange={(e) => setValuePassword(e.target.value)}
          value={valuePassword}
        />
        <Button type="primary" size="medium" disabled={btnDisabled} htmlType={"submit"}>
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
