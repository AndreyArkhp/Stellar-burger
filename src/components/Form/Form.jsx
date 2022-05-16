import PropTypes from "prop-types";

import styles from "./Form.module.css";

/**
 *
 * @param {string} title - Заголовок формы(необязательный)
 * @param {string} name - Имя формы
 */
export default function Form({children, title, name}) {
  return (
    <form className={`${styles.form} mb-20`} name={name}>
      {title && <h2 className={`text text_type_main-medium ${styles.form__title}`}>{title}</h2>}
      {children}
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
