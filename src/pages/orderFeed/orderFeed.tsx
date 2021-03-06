import styles from "./orderFeed.module.css";
import Feed from "../../components/Feed/Feed";
import Orders from "../../components/Orders/Orders";

export function OrderFeedPage() {
  return (
    <main>
      <h1 className={`${styles.title} text text_type_main-large pt-10 pb-5 pl-5`}>Лента заказов</h1>

      <div className={styles.content}>
        <Feed />
        <Orders />
      </div>
    </main>
  );
}
