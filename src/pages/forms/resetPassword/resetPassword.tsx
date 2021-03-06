import {useState, useRef, useEffect, FormEvent} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "../../../services/types/hooks";

import styles from "../registrationForms.module.css";
import Form from "../../../components/Form/Form";
import {baseUrl} from "../../../utils/constants";
import {checkResponse} from "../../../utils/functions";

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

  const inputRef = useRef<HTMLInputElement>(null);

  const icon = (showPassword && "HideIcon") || "ShowIcon";
  const type = (showPassword && "text") || "password";
  const error =
    valuePassword.length > 5 ? false : !focused && valuePassword.length > 0 ? true : false;

  const onIconClick = () => {
    setTimeout(() => !showPassword && inputRef.current?.focus(), 0);
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}password-reset/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({password: valuePassword, token: valueCode}),
      });
      await checkResponse(res);
      navigate("/login", {replace: true});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.main}>
      <Form name={"password-new"} title={"???????????????????????????? ????????????"} handleSubmit={handleSubmit}>
        <Input
          onChange={(e) => setValuePassword(e.target.value)}
          onFocus={() => setFocesed(true)}
          onBlur={() => {
            setFocesed(false);
            setShowPassword(false);
          }}
          name={"password"}
          type={type}
          placeholder={"?????????????? ?????????? ????????????"}
          icon={icon}
          onIconClick={onIconClick}
          ref={inputRef}
          error={error}
          errorText={"???????????????????????? ????????????"}
          value={valuePassword}
        />
        <Input
          placeholder={"?????????????? ?????? ???? ????????????"}
          name={"code"}
          value={valueCode}
          onChange={(e) => setValueCode(e.target.value)}
        />
        <Button type="primary" size="medium" htmlType={"submit"}>
          ??????????????????
        </Button>
      </Form>
      <p className="text text_type_main-default mb-4">
        ?????????????????? ?????????????{" "}
        <Link to={"/login"} className={styles.link}>
          ??????????
        </Link>
      </p>
    </main>
  );
}
