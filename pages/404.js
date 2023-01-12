import Image from 'next/image'
import styles from '../src/components/index/Intro.module.css'
import { ComBase } from '../src/components/index/ComBase.js'
import Screen from "../src/components/index/Screen.js";



export default function Fun404() {

  return (
    <section>

      <ComBase row={16} topGap={true} />
      <Image src="/media/images/batteryHolder.svg" width="100" height="50" alt="battery holder" className={styles.battery} />
      <Screen row="6/14" column="3/13" titleText={"4_04 - page not found (try retyping the url)"} />
    </section>
  )
}