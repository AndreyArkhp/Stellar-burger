import PropTypes from "prop-types";

import styles from "./Form.module.css";

/**
 *
 * @param {string} title - Заголовок формы(необязательный)
 * @param {string} name - Имя формы
 * @param {string} error - Сообщение об ошибке
 */
export default function Form({children, title, name, error}) {
  return (
    <form className={`${styles.form} mb-20`} name={name}>
      {title && <h2 className={`text text_type_main-medium ${styles.form__title}`}>{title}</h2>}
      {children}
      <p className={`${styles.errorMessage} text text_type_main-default`}>{error}</p>
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};