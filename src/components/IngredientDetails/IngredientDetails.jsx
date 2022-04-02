import PropTypes from "prop-types";

import Modal from "../Modal/Modal";

import styles from "./IngredientDetails.module.css";

function IngredientDetails({ card, active, setActive }) {
  return (
    active && (
      <Modal active={active} setActive={setActive}>
        <h2 className={`${styles.title} text text_type_main-large mt-10 mr-10 ml-10 pt-3 pb-3`}>
          Детали ингредиента
        </h2>

        <div className={`${styles.content} ml-25 mr-25 mb-15`}>
          <img src={card.image_large} alt={card.name} className={`${styles.image} mb-4`} />
          <p className="text text_type_main-medium mb-8 pl-3 pr-3">{card.name}</p>
          <ul className={styles["list-ingredients"]}>
            <li className={`${styles["list-item"]} text_color_inactive`}>
              <p className="text text_type_main-default mb-2">Калории,ккал</p>
              <p className="text text_type_digits-default">{card.calories}</p>
            </li>
            <li className={`${styles["list-item"]} text_color_inactive`}>
              <p className="text text_type_main-default mb-2">Белки, г</p>
              <p className="text text_type_digits-default">{card.proteins}</p>
            </li>
            <li className={`${styles["list-item"]} text_color_inactive`}>
              <p className="text text_type_main-default mb-2">Жиры, г</p>
              <p className="text text_type_digits-default"> {card.fat}</p>
            </li>
            <li className={`${styles["list-item"]} text_color_inactive`}>
              <p className="text text_type_main-default mb-2">Углеводы, г</p>
              <p className="text text_type_digits-default">{card.carbohydrates}</p>
            </li>
          </ul>
        </div>
      </Modal>
    )
  );
}

IngredientDetails.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }),

  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default IngredientDetails;
