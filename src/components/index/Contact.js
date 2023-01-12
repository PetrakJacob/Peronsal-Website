import {ComBase} from './ComBase'
import SkillScreen from './SkillScreen'
import Image from 'next/image'
import styles from './Contact.module.css'
import Circle from './Circle.js'

export default function Contact() {

  const emailLaunch = () => {
    try {
      window.location = "mailto:petrakjacob@gmail.com";
    } catch (error) {
      console.error(error);
    }
  }
  const gitLaunch = () => {
    try {
      window.location.assign("https://www.linkedin.com/in/jacob-petrak-0a167a261")
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <section style = {{ gridTemplateRows: "repeat(27, 6.25vh)" }} >
      <ComBase row={16} topGap={false} />
      {/* connecting wire */}
      <svg width="100%" height="100%" style={{ gridRow: "5/8", gridColumn: "4/11" }} >
        <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="orange" strokeWidth="9" />
      </svg>
      <svg width="100%" height="100%" style={{ gridRow: "9/12", gridColumn: "4/11" }} >
        <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="orange" strokeWidth="9" />
      </svg>
      <SkillScreen row={2} column="5/11" titleText="Contact" />
      <SkillScreen row="5/8" column="3/7" titleText="email" />
      <SkillScreen row="9/12" column="3/7" titleText="Linktin " />
      {/* button bases */}
      <Image src="/media/images/buttonBase.svg" width="100" height="100" alt="button base" style={{ gridRow: "5/8", gridColumn: "8/13" }} className={styles.batteryBase}/>
      <Image src="/media/images/buttonBase.svg" width="100" height="100" alt="button base" style={{ gridRow: "9/12", gridColumn: "8/13" }} className={styles.batteryBase} />
      {/* red buttons */}
      <svg style={{ gridRow: "5/8", gridColumn: "8/13" }} width="100%" height="100%" onClick={emailLaunch}>
        <circle cx="50%" cy="50%" r="20%" fill="#a55353" className={styles.redCircle}/>
      </svg>
      <svg style={{ gridRow: "9/12", gridColumn: "8/13" }} width="100%" height="100%" onClick={gitLaunch}>
        <circle cx="50%" cy="50%" r="20%" fill="#a55353" className={styles.redCircle} />
      </svg>
      {/*  */}
      <Image src="/media/images/antenna.svg" width="50" height="30" alt="atenna" style={{ gridRow: "15/26", gridColumn: "2/8" }} className={styles.batteryBase} />
      <Image src="/media/images/antenna.svg" width="50" height="30" alt="atenna" style={{ gridRow: "15/26", gridColumn: "8/14" }} className={styles.batteryBase} />


    </section>
  )
}