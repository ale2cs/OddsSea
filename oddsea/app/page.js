import Image from "next/image";
import styles from "./page.module.css";
import Markets from "@/components/markets";
import Lines from "@/components/lines";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>This is the home page!</h1>
      <Markets />
      <Lines />
    </main>
  );
}
