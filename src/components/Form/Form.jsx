import PropTypes from "prop-types";

import styles from "./Form.module.css";

/**
 *
 * @param {string} title - Заголовок формы(необязательный)
 * @param {string} name - Имя формы
 * @param {string} error - Сообщение об ошибке
 * @param handleSubmit - Обработчик сабмита  
 }}
 */
export default function Form({children, title, name, error, handleSubmit}) {
  return (
    <form className={`${styles.form} mb-20`} name={name} onSubmit={handleSubmit}>
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
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};
