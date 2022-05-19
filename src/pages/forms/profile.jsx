import {useState, useRef, useEffect} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import styles from "./profile.module.css";
import Form from "../../components/Form/Form";
import {useDispatch, useSelector} from "react-redux";
import {logout, setUserInfo} from "../../services/actions/authorization";

export default function Profile() {
  const {user} = useSelector((state) => state.dataUser);
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [inputNameEdit, setInputNameEdit] = useState(false);
  const [inputLoginEdit, setinputLoginEdit] = useState(false);
  const [inputPasswordFocused, setinputPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputNameRef = useRef(null);
  const inputLoginRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const dispatch = useDispatch();

  const icon = (showPassword && "HideIcon") || "ShowIcon";
  const type = (showPassword && "text") || "password";
  const error =
    valuePassword.length > 5
      ? false
      : !inputPasswordFocused && valuePassword.length > 0
      ? true
      : false;

  const onIconClick = () => {
    setTimeout(() => !showPassword && inputPasswordRef.current.focus(), 0);
    setShowPassword(!showPassword);
  };
  const cancelEdit = (e) => {
    e.preventDefault();
    setValueName(user.name);
    setValueEmail(user.email);
  };

  const editUserInfo = (e) => {
    e.preventDefault();
    dispatch(setUserInfo(valueName, valueEmail, valuePassword));
  };

  useEffect(() => {
    setValueEmail(user.email);
    setValueName(user.name);
  }, [user]);

  return (
    <main className={`${styles.main} pl-10`}>
      <nav className={styles.links}>
        <p className="text text_type_main-medium pt-4 pb-4">
          <Link to={"#"} className={`${styles.links__item} text_color_primary`}>
            Профиль
          </Link>
        </p>
        <p className="text text_type_main-medium pt-4 pb-4 ">
          <Link to={"order"} className={`${styles.links__item}  text_color_inactive`}>
            История заказов
          </Link>
        </p>
        <p className="text text_type_main-medium pt-4 pb-4 ">
          <Link
            to={""}
            className={`${styles.links__item} text_color_inactive`}
            onClick={() => dispatch(logout())}
          >
            Выход
          </Link>
        </p>
        <p className="mt-20 pt-1 text text_type_main-default text_color_inactive">
          В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
        </p>
      </nav>
      <Form name={"profile"}>
        <Input
          name={"name"}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
          icon={"EditIcon"}
          onIconClick={() => {
            setTimeout(() => !inputNameEdit && inputNameRef.current.focus(), 0);
            setInputNameEdit(true);
          }}
          onBlur={() => {
            setInputNameEdit(false);
          }}
          placeholder={"Имя"}
          ref={inputNameRef}
          type={"text"}
          disabled={!inputNameEdit}
        />
        <Input
          name={"email"}
          value={valueEmail}
          onChange={(e) => setValueEmail(e.target.value)}
          icon={"EditIcon"}
          onIconClick={() => {
            setTimeout(() => inputLoginRef.current.focus(), 0);
            setinputLoginEdit(true);
          }}
          onBlur={() => setinputLoginEdit(false)}
          placeholder={"Логин"}
          ref={inputLoginRef}
          type={"text"}
          disabled={!inputLoginEdit}
        />
        <Input
          onChange={(e) => setValuePassword(e.target.value)}
          onFocus={() => setinputPasswordFocused(true)}
          onBlur={() => {
            setinputPasswordFocused(false);
            setShowPassword(false);
          }}
          name={"new-password"}
          type={type}
          placeholder={"Введите новый пароль"}
          icon={icon}
          onIconClick={onIconClick}
          ref={inputPasswordRef}
          error={error}
          errorText={"Некорректный пароль"}
          value={valuePassword}
        />
        <div className={styles.buttons_field}>
          <Button type="secondary" size="medium" onClick={cancelEdit}>
            Отмена
          </Button>
          <Button type="primary" size="medium" onClick={editUserInfo}>
            Сохранить
          </Button>
        </div>
      </Form>
    </main>
  );
}
