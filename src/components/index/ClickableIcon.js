import styles from './ClickableIcon.module.css'
import Image from 'next/image'

export default function ClickableIcon(props) {
  const iconClicked = () => {
    if (props.link) {
      window.location.href = props.link;

    } else {
      props.setText(props.message)
      props.showElements()
    }
  }
  return (
    <div className={styles.container} style={{gridColumn: props.column, gridRow: props.row}} onClick={iconClicked}>
      <Image src={props.src} width="100" height="100" alt={props.alt} className={styles.icon} />
      <h3 className={styles.iconDescription}>{props.iconDescription}</h3>
    </div>
  )
}