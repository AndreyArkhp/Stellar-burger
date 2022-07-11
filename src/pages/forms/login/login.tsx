import {FC, FormEvent, useEffect, useState} from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "../../../services/types/hooks";

import styles from "./registrationForms.module.css";
import Form from "../../../components/Form/Form";
import {checkEmail} from "../../../utils/functions";
import {login} from "../../../services/actions/authorization";
import { TLocationState } from "../../../types";

  const Login:FC = () => {
  const [valueEmail, setValueEmail] = useState<string>("");
  const [valuePassword, setValuePassword] = useState<string>("");
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const {loginUserError, isAuth} = useSelector((store) => store.dataUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as TLocationState;
  const errorMessage = (loginUserError && "Что то пошло не так, пожалуйста попробуйте снова") || "";

  const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    dispatch(login(valueEmail, valuePassword));
  };

  useEffect(() => {
    if (checkEmail(valueEmail) && valuePassword.length > 5) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [valueEmail, valuePassword]);
 
    const locationState = location.state.background ? location.state.background : "/"; 
    
  useEffect(() => {
    isAuth && navigate(locationState, {replace: true});
  }, [isAuth, navigate, locationState]);

  return (
      <main className={styles.main}>
        <Form name={"login"} title={"Вход"} error={errorMessage} handleSubmit={handleSubmit}>
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
          <Button type="primary" size="medium" disabled={btnDisabled} htmlType="submit">
            Войти
          </Button>
        </Form>
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
    )
  
};

export default Login;