import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <span className={styles.circle}></span>
        <span className={styles.circle}></span>
        <span className={styles.circle}></span>
        <span className={styles.circle}></span>
      </div>
    </div>
  )
} 