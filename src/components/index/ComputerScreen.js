import ClickableIcon from './ClickableIcon'
import styles from './ComputerScreen.module.css'
import Image from 'next/image'
import { useState, useEffect, useRef } from "react";

export default function ComputerScreen() {
  
  const [text, setText] = useState("1. press the exit button (top right) to get out 2. press one of the files on the desktop to take a look at something else");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");
  // [[row, column]...]
  const [iconPlacement, setIconPlacement] = useState([["3/7", "3/5"], ["3/7", "7/9"], ["3/7", "11/13"], ["8/12", "3/5"], ["8/12", "7/9"], ["8/12", "11/13"]]);

  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setUrl(window.location.origin + '/project_ideas/')

    setInterval(() => {
      if (window.innerWidth < 500) {
        setIconPlacement([["3/6", "3/8"], ["3/6", "8/13"], ["6/9", "3/8"], ["6/9", "8/13"], ["9/12", "3/8"], ["9/12", "8/13"]])
      }
      if (window.innerWidth > 500) {
        setIconPlacement([["3/7", "3/5"], ["3/7", "7/9"], ["3/7", "11/13"], ["8/12", "3/5"], ["8/12", "7/9"], ["8/12", "11/13"]])
      }
    });

    setInterval(() => {
      let t = new Date()
      setTime(t.toLocaleTimeString())
    }, 1000);
  }, []);

  const exitClicked = () => {
    document.querySelectorAll("[class*='popupContainer']")[0].style.display = "none";
    document.querySelectorAll("[class*='popuptxt']")[0].style.display = "none";
    document.querySelectorAll("[class*='header']")[0].style.display = "none";
  } 
  const showElements = () => {
    document.querySelectorAll("[class*='popupContainer']")[0].style.display = "block";
    document.querySelectorAll("[class*='popuptxt']")[0].style.display = "block";
    document.querySelectorAll("[class*='header']")[0].style.display = "flex";
  }

  return (
    <>
      <div className={styles.screenBody}></div>
      <div className={styles.footer}>
        <p className={styles.clock}>{time}</p>
      </div>
      <div className={styles.border}></div>

      <div className={styles.popupContainer}>
        <p className={styles.popuptxt}>{text}</p>
      </div>
      <div className={styles.header}>
        <button className={styles.exitBtn} onClick={exitClicked}>
          <Image src="/media/images/redCross.svg" width="100" height="100" alt="red cross" className={styles.crossImg} />
        </button>
      </div>
      
      
      
      <ClickableIcon src="/media/images/folderIcon.svg" alt="document icon" iconDescription="instructions" row={iconPlacement[0][0]} column={iconPlacement[0][1]} 
        setText={setText} showElements={showElements} message="1. press the exit button (top right) to get out 2. press one of the files on the desktop to take a look at something else"/>

      <ClickableIcon src="/media/images/folderIcon.svg" alt="document icon" iconDescription="about me" row={iconPlacement[1][0]} column={iconPlacement[1][1]}
      setText={setText} showElements={showElements} message="Hey my name is Jacob Petrak, I'm a highschool student studying for software engineering! " />

      <ClickableIcon src="/media/images/folderIcon.svg" alt="document icon" iconDescription="interests" row={iconPlacement[2][0]} column={iconPlacement[2][1]} 
      setText={setText} showElements={showElements} message="I'm interested in technology, bike riding and also a little in gaming :). "/>

      <ClickableIcon src="/media/images/folderIcon.svg" alt="document icon" iconDescription="goals" row={iconPlacement[3][0]} column={iconPlacement[3][1]}
        setText={setText} showElements={showElements} message="1. get hired for part time work by the end of next term / 31st March. This will be done by creating a resume and setting up a profile by halfway of the term / 20th Feb and reaching out after school exams and assignments 2. get Drivers lisence and complete 10 hours by the end of next school holidays. Receive liscence by the end of school term / 16th April by reading the 'Your keys to driving in Queensland book' and finishing the online quiz. Do 1 hour per day on the holidays apart from saturday and sunday."/>

      <ClickableIcon src="/media/images/worldIcon.svg" alt="document icon" iconDescription="go to Project ideas" row={iconPlacement[4][0]} column={iconPlacement[4][1]}
        link={url}/> 

      <ClickableIcon src="/media/images/worldIcon.svg" alt="document icon" iconDescription="go to Project github" row={iconPlacement[5][0]} column={iconPlacement[5][1]}
        link={"https://github.com/PetrakJacob"} /> 
    </>
  )
}