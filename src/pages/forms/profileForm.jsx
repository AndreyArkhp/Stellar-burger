import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import styles from "./registrationForms.module.css";
import {setUserInfo} from "../../services/actions/authorization";
import {checkEmail} from "../../utils/functions";
import Form from "../../components/Form/Form";

export default function ProfileForm() {
  const {user} = useSelector((state) => state.dataUser);
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [valuePassword, setValuePassword] = useState("");
  const [inputNameEdit, setInputNameEdit] = useState(false);
  const [inputLoginEdit, setInputLoginEdit] = useState(false);
  const [inputPasswordFocused, setinputPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const inputNameRef = useRef(null);
  const inputLoginRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const dispatch = useDispatch();

  const icon = (showPassword && "HideIcon") || "ShowIcon";
  const type = (showPassword && "text") || "password";
  const errorPassword =
    valuePassword.length > 5
      ? false
      : !inputPasswordFocused && valuePassword.length > 0
      ? true
      : false;

  const onIconClick = () => {
    setTimeout(() => !showPassword && inputPasswordRef.current.focus(), 0);
    setShowPassword(!showPassword);
  };

  function showErorEmail() {
    !valueEmail ? setErrorEmail(false) : setErrorEmail(!checkEmail(valueEmail));
  }

  const cancelEdit = (e) => {
    e.preventDefault();
    setValueName(user.name);
    setValueEmail(user.email);
    setValuePassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserInfo(valueName, valueEmail, valuePassword));
  };

  useEffect(() => {
    setValueEmail(user.email);
    setValueName(user.name);
  }, [user]);

  useEffect(() => {
    if (valuePassword) {
      setShowBtns(true);
    } else {
      setShowBtns(false);
    }
  }, [valueEmail, valueName, valuePassword, user]);

  useEffect(() => {
    if (checkEmail(valueEmail) && valuePassword.length > 5) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [valueEmail, valuePassword]);
  return (
    <Form name={"profile"} handleSubmit={handleSubmit}>
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
          setInputLoginEdit(true);
        }}
        onBlur={() => {
          setInputLoginEdit(false);
          showErorEmail();
        }}
        placeholder={"Логин"}
        ref={inputLoginRef}
        type={"text"}
        disabled={!inputLoginEdit}
        errorText={"Некоректный email"}
        error={errorEmail}
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
        error={errorPassword}
        errorText={"Некорректный пароль"}
        value={valuePassword}
      />
      {showBtns && (
        <div className={styles.buttonsField}>
          <Button type="secondary" size="medium" onClick={cancelEdit} htmlType={"button"}>
            Отмена
          </Button>
          <Button type="primary" size="medium" htmlType={"submit"} disabled={btnDisabled}>
            Сохранить
          </Button>
        </div>
      )}
    </Form>
  );
}
