import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "../../services/types/hooks";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerIngredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {scrollIngredients, switchTab} from "../../services/actions/tabs";
import {openIngredientModal} from "../../services/actions/modal";
import {openModal} from "../../utils/functions";
import {
  IHeadersIngredients,
  IIngredient,
  IIngtedientType,
  IIngtedientTypesObjects,
  ITranslation,
} from "../../types";

function BurgerTab() {
  const BUNS = "bun";
  const SAUCES = "sauce";
  const FILLING = "main";

  const dispatch = useDispatch();
  const {activeTab} = useSelector((store) => store.tabs);
  const setActiveTab = (tab: string) => {
    dispatch(scrollIngredients(tab));
  };
  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab value={BUNS} active={activeTab === BUNS} onClick={() => setActiveTab(BUNS)}>
        Булки
      </Tab>
      <Tab value={SAUCES} active={activeTab === SAUCES} onClick={() => setActiveTab(SAUCES)}>
        Соусы
      </Tab>
      <Tab value={FILLING} active={activeTab === FILLING} onClick={() => setActiveTab(FILLING)}>
        Начинки
      </Tab>
    </div>
  );
}

function BurgerCard({card}: {card: IIngredient}) {
  const {bun, constructorIngredients} = useSelector((store) => store.constructorIngredients);
  const dispatch = useDispatch();
  const location = useLocation();
  let count: number;

  if (card.type === "bun") {
    count = bun && card._id === bun._id ? 1 : 0;
  } else {
    count = constructorIngredients.filter((el) => el._id === card._id).length;
  }

  const [, cardRef] = useDrag(
    {
      type: "ingredient",
      item: {id: card._id},
      collect: (monitor) => ({
        ingredientAdded: monitor.didDrop(),
        typeee: monitor.getItem(),
      }),
    },
    [card]
  );

  return (
    <li
      className={styles.ingredient}
      onClick={() => openModal(dispatch, openIngredientModal)}
      ref={cardRef}
    >
      <Link
        to={`ingredients/${card._id}`}
        className={styles.ingredient__link}
        state={{background: location}}
      >
        <img src={card.image} className={" ml-4 mr-4 mb-2"} alt={card.name}></img>
        <p className={`${styles.ingredient__price} text text_type_digits-default mb-2`}>
          {card.price}
          <CurrencyIcon type="primary" />
        </p>
        <p className={`${styles.ingredient__title} text text_type_main-default mb-7`}>
          {card.name}
        </p>
        <Counter count={count || 0} size="default" />
      </Link>
    </li>
  );
}

function TypeIngredients({ingredient}: IIngtedientType) {
  const {ingredientsList} = useSelector((store) => store.ingredients);
  const translation: ITranslation = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  return (
    <article>
      <h2 className="text text_type_main-medium tab-header" id={ingredient}>
        {translation[ingredient]}
      </h2>
      <ul className={`${styles["list-ingredients"]} mt-6 ml-4 mr-4 mb-9`}>
        {ingredientsList.map((card) => {
          return card.type === ingredient && <BurgerCard card={card} key={card._id} />;
        })}
      </ul>
    </article>
  );
}

function BurgerIngredients() {
  const ingredients: IIngtedientTypesObjects[] = [
    {type: "bun", id: 1},
    {type: "sauce", id: 2},
    {type: "main", id: 3},
  ];
  const scrollTo = useSelector((store) => store.tabs.scroll);
  const dispatch = useDispatch();
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const getActiveTab = (headers: IHeadersIngredients) => {
    const containerOffset = tabsContainerRef.current ? tabsContainerRef.current.offsetTop : 0;
    const offsetFormula = (el: HTMLHeadingElement) =>
      Math.abs(Math.round(el.getBoundingClientRect().y) - containerOffset);
    const tabs = [];

    for (let key in headers) {
      tabs.push({
        value: offsetFormula(headers[key]),
        tab: headers[key].id,
      });
    }
    if (tabs.length > 0) {
      return tabs.reduce((res, el) => {
        return res.value < el.value ? res : el;
      }).tab;
    } else {
      return "bun";
    }
  };

  useEffect(() => {
    const headers = {} as IHeadersIngredients;
    if (tabsContainerRef.current) {
      const [buns, sauces, filling] = Array.from(
        tabsContainerRef.current.querySelectorAll(".tab-header")
      );
      headers.bun = buns;
      headers.sauce = sauces;
      headers.main = filling;

      scrollTo && headers[scrollTo].scrollIntoView({behavior: "smooth"});

      let currentTab = getActiveTab(headers);

      tabsContainerRef.current.addEventListener("scroll", () => {
        const activeTab = getActiveTab(headers);
        if (!Object.is(currentTab, activeTab)) {
          dispatch(switchTab(activeTab));
          currentTab = activeTab;
        }
      });
    }
  }, [scrollTo, dispatch]);

  return (
    <section className={`${styles.section} pl-5 `}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerTab />
      <div ref={tabsContainerRef} className={styles["all-ingredients"]}>
        {ingredients.map((el) => {
          return <TypeIngredients ingredient={el.type} key={el.id} />;
        })}
      </div>
    </section>
  );
}

export default BurgerIngredients;
