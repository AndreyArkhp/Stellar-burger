import {useState, useRef, useEffect} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import styles from "./registrationForms.module.css";
import Form from "../../components/Form/Form";

export default function ResetPassword() {
  const [valuePassword, setValuePassword] = useState("");
  const [valueCode, setValueCode] = useState("");
  const [focused, setFocesed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {isAuth} = useSelector((store) => store.dataUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    isAuth
      ? navigate("/", {replace: true})
      : location.state !== "/forgotpassword" && navigate("/forgotpassword", {replace: true});
  }, [isAuth, navigate, location]);

  const inputRef = useRef(null);

  const icon = (showPassword && "HideIcon") || "ShowIcon";
  const type = (showPassword && "text") || "password";
  const error =
    valuePassword.length > 5 ? false : !focused && valuePassword.length > 0 ? true : false;

  const onIconClick = () => {
    setTimeout(() => !showPassword && inputRef.current.focus(), 0);
    setShowPassword(!showPassword);
  };

  return (
    <main className={styles.main}>
      <Form name={"password-new"} title={"Восстановление пароля"}>
        <Input
          onChange={(e) => setValuePassword(e.target.value)}
          onFocus={() => setFocesed(true)}
          onBlur={() => {
            setFocesed(false);
            setShowPassword(false);
          }}
          name={"password"}
          type={type}
          placeholder={"Введите новый пароль"}
          icon={icon}
          onIconClick={onIconClick}
          ref={inputRef}
          error={error}
          errorText={"Некорректный пароль"}
          value={valuePassword}
        />
        <Input
          placeholder={"Введите код из письма"}
          name={"code"}
          value={valueCode}
          onChange={(e) => setValueCode(e.target.value)}
        />
        <Button type="primary" size="medium">
          Сохранить
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
