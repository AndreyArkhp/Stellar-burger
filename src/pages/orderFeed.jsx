import styles from "./orderFeed.module.css";
import Feed from "../components/Feed/Feed";

export function OrderFeedPage({orders}) {
  return (
    <main className={styles.main}>
      <Feed orders={orders} />
    </main>
  );
}
