import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

import styles from "./ingredient.module.css";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import Modal from "../components/Modal/Modal";
import {CLOSE_INGREDIENT_MODAL} from "../services/actions/modal";
import {getIngridients} from "../services/actions/ingredients";

export default function IngredientPage() {
  const {ingredientId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredientsList);
  !ingredients.length && dispatch(getIngridients());

  const modalOpen = useSelector((store) => store.modal.ingredientOpen);
  const {isAuth} = useSelector((store) => store.dataUser);
  const [ingredient] = ingredients.filter((el) => el._id === ingredientId);

  const setActive = (bool) => {
    if (!bool) {
      dispatch({type: CLOSE_INGREDIENT_MODAL});
      navigate("/");
    }
  };

  useEffect(() => {
    !modalOpen && !isAuth && navigate("/login", {state: location.pathname});
  }, [modalOpen, isAuth, navigate, location]);

  return (
    <main className={styles.ingredient}>
      {modalOpen && (
        <Modal setActive={setActive}>
          <IngredientDetails card={ingredient} />
        </Modal>
      )}
      {!modalOpen && isAuth && ingredients.length && <IngredientDetails card={ingredient} />}
    </main>
  );
}
