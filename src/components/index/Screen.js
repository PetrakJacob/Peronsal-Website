import styles from "./Screen.module.css";
import { useState, useEffect, useRef } from "react";

export default function Screen(props) {


  const [title, setTitle] = useState("");
  const dataFetchedRef = useRef(false);


  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    let num = 0;
    let messageLength = props.titleText.length - 1
    let textInput = setInterval(() => {
      if (num < messageLength) {
        setTitle(title => title + props.titleText[num])
        num++
      } else clearInterval(textInput);
    }, 40);
  }, []);

  return (
    <div className={styles.container} style={{gridRow: props.row, gridColumn: props.column}}>
      <h1 className={styles.screenText}>{title}</h1>
    </div>
  )
}