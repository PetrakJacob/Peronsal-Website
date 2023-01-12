import Image from 'next/image'
import styles from './Intro.module.css'
import { ComBase } from './ComBase';
import SolderWires from "./SolderWires.js";
import Screen from "./Screen.js";



export default function Intro() {
  
  // make title depending if afternoon or not
  let timeHours = new Date()
  let titleText = ""
  titleText = timeHours > 11 ? "g_ood afternoon! " : "g_ood morning! "
  titleText += "I'm Jacob Petrak and welcome to my website ;)"

  return (
    <section>
      
      <ComBase row={16} topGap = {true}/>
      <Image src="/media/images/batteryHolder.svg" width="100" height="50" alt="battery holder" className={styles.battery}/>
      <Screen row="6/14" column="3/13" titleText={titleText}/>
      <SolderWires position={{red: [15, 4], black: [15, 5]}}/>
    </section>
  )
}