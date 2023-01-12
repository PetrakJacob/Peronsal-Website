import styles from "./SkillScreen.module.css";

export default function Screen(props) {

  return (
    <div className={styles.container} style={{ gridRow: props.row, gridColumn: props.column}}>
      <h1 className={styles.screenText}>{props.titleText}</h1>
    </div>
  )
}