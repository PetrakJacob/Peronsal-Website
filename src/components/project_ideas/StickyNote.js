import Moveable from "react-moveable";
import styles from './StickyNote.module.css'
import { useEffect, useState, useRef} from 'react'
import Image from 'next/image'


export default function StickyNote(props) {

  // states
  const [target, setTarget] = useState();
  const [bodyTxt, setBodyTxt] = useState(props.t);
  const [titleTxt, setTitleTxt] = useState(props.T);
  // refs
  const colNum = useRef(props.c)
  
  // use effect
  useEffect(() => {
    setTarget(document.querySelector(`.targ${props._id}`));
  }, []);

  // color change
  useEffect(() => {
    colNum.current = props.c
    if (props.c == 0) {
      let iconEl = document.querySelector(`.targ${props._id} [class*="header"] [class*="pallete"] [class*="icon"]`)
      iconEl.style.filter = "invert(1)";
      iconEl.style.WebkitTransform = "invert(1)";
    } else if (props.c == 1) {
      let iconEl = document.querySelector(`.targ${props._id} [class*="header"] [class*="pallete"] [class*="icon"]`)
      iconEl.style.filter = "invert(0)";
      iconEl.style.WebkitTransform = "invert(0)";
    }
    document.querySelector(`.targ${props._id}`).style.backgroundColor = colors[props.c]
  }, [props.c]);

  // text change 
  useEffect(() => {
    setBodyTxt(props.t)
  }, [props.t]);

  // title change
  useEffect(() => {
    setTitleTxt(props.T)
  }, [props.T]);

  // x / y change
  useEffect(() => {
    let targ = document.querySelector(`.targ${props._id}`)
    targ.style.cssText += "transform:  translate(0px, 0px) ;"
    document.querySelector(`.container${props._id}`).style.cssText = `transform: translate(${props.x}px, ${props.y}px)!important`;
    // change in isze resets the box so it doesnt get displaced
    let ogWidth = getComputedStyle(targ).getPropertyValue('width').match(/\d+/)[0];
    targ.style.width = `${+ogWidth - 1}px`
    targ.style.width = `${+ogWidth}px`
  }, [props.x, props.y]);

  // width / height change
  useEffect(() => {
    let targ = document.querySelector(`.targ${props._id}`)
    targ.style.width = `${props.w}px!important`
    targ.style.height = `${props.h}px!important`
    document.querySelector(`.targ${props._id} [class*="header"] [class*="pallete"]`)
  }, [props.w, props.h]);

  // functions
  let colors = ["#2364aa", "#3da5d9", "#73bfb8", "#fec601", "#ea7317"]

  const changeCol = () => {
    let iconEl = document.querySelector(`.targ${props._id} [class*="header"] [class*="pallete"] [class*="icon"]`);
    iconEl.style.filter = "invert(1)";
    colNum.current == 4 ? colNum.current = 0 : colNum.current = colNum.current + 1;

    if (colNum.current === 0) {
      iconEl.style.filter = "invert(1)";
      iconEl.style.WebkitTransform = "invert(1)";
    } else {
      iconEl.style.filter = "invert(0)";
      iconEl.style.WebkitTransform = "invert(0)";
    }
    props.updateVal([[props._id, 'c', colNum.current]])
    target.style.backgroundColor = colors[colNum.current]
  }

  const deleteThisNote = () => {
    props.setBackgroundFocus(true)
    props.deleteNote(props._id)
  }

  const matrixToArray = str => {
    return str.match(/(-?[0-9\.]+)/g);
  }

  const bodyChg = (e) => {
    setBodyTxt(e.target.value)
    props.updateVal([[props._id, 't', e.target.value]])
  }

  const titleChg = (e) => {
    setTitleTxt(e.target.value)
    props.updateVal([[props._id, 'T', e.target.value]])
  }

  // return jsx
  return (
    <div className={`container${props._id}`} style={{ }}> 
      <div className={`${styles.target} targ${props._id}`} style={{ width: props.w, height: props.h}}>
        <div className={styles.header}>
          <button className={styles.pallete} onTouchStart={changeCol} onClick={changeCol}><Image src={"/media/images/pallete.svg"} width="100" height="100" alt="colour pallete" className={styles.icon} /></button>
          <textarea className={styles.greyBack} onTouchStart={event => event.target.focus()} onClick={event => event.target.focus()} onChange={titleChg} value={titleTxt}/>
          <button className={styles.bin} onClick={deleteThisNote} onTouchStart={deleteThisNote}><Image src={"/media/images/bin.svg"} width="100" height="100" alt="colour pallete" className={styles.icon} /></button>
        </div>
        <textarea className={styles.body} onTouchStart={event => event.target.focus()} onClick={event => event.target.focus()} onChange={bodyChg} value={bodyTxt}/>
      </div>
      <Moveable
        target={target}
        draggable={true}
        origin={false}
        edge={false}
        zoom={1 / props.zoom}
        useResizeObserver = {true}
        resizable={{
          renderDirections: props.isKeydownMeta ? false : ["nw", "ne", "se", "sw"]
        }}
        keepRatio={props.isKeydownShift}
        onDragStart={e => {
          props.setBackgroundFocus(false)
        }}
        onDragEnd={e => {
          props.setBackgroundFocus(true)
          
          let xyArr = matrixToArray(getComputedStyle(e.target).getPropertyValue('transform'));
          if (xyArr) {
            props.updateVal([[props._id, 'x', props.x + +xyArr[4]], [props._id, 'y', props.y + +xyArr[5]]])
          }
          console.log(props.x + +xyArr[4], props.y + +xyArr[5]);
        }}
        onBeforeResize={(e) => {
          e.setFixedDirection(
            props.isKeydownAlt ? [0, 0] : e.startFixedDirection
          );
        }}
        onResizeEnd={(e) => {
          console.log(e.lastEvent.width);
          console.log(e.target.style.width);
          let xyArr = matrixToArray(getComputedStyle(e.target).getPropertyValue('transform'));
          if (+xyArr[4] != 0 && +xyArr[5] != 0) {
            props.updateVal([[props._id, 'x', props.x + +xyArr[4]], [props._id, 'y', props.y + +xyArr[5]], [props._id, 'w', e.lastEvent.width], [props._id, 'h', e.lastEvent.height]])
          } else {
            props.updateVal([[props._id, 'w', e.lastEvent.width], [props._id, 'h', e.lastEvent.height]])
          }
        }}
        onRender={(e) => {
          e.target.style.cssText += e.cssText;
        }}
      />
    </div>
  )
}
