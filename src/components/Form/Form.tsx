import {FC} from "react";

import styles from "./Form.module.css";

interface IParams {
  title: string;
  name: string;
  error: string;
  handleSubmit: ()=>void;
}

/**
 *
 * @param {string} title - Заголовок формы(необязательный)
 * @param {string} name - Имя формы
 * @param {string} error - Сообщение об ошибке
 * @param  handleSubmit - Обработчик сабмита  
 }}
 */
const Form: FC<IParams> = ({children, title, name, error, handleSubmit}) => {
  return (
    <form className={`${styles.form} mb-20`} name={name} onSubmit={handleSubmit}>
      {title && <h2 className={`text text_type_main-medium ${styles.form__title}`}>{title}</h2>}
      {children}
      <p className={`${styles.errorMessage} text text_type_main-default`}>{error}</p>
    </form>
  );
};

export default Form;