import React, { useEffect, useRef, useState, useCallback} from "react";
import Loading from './Loading'
import InfiniteViewer from "react-infinite-viewer";
import { useKeycon } from "react-keycon";
import StickyNote from './StickyNote'
import styles from './WhiteBoard.module.css'
import Image from 'next/image'
import io from 'Socket.IO-client'
let socket;

export default function WhiteBoard() {

  // refs
  const infiniteViewerRef = useRef(0);
  const infoSticky = useRef()
  const initiateOnce = useRef(true)
  const notePlaceholder = useRef(1)
  const sendCreateNote = useRef(false)
  const sendJsonObj = useRef([])

  // states
  const [zoomOffset, setZoomOffset] = useState(["50%", "50%"]);
  const [zoom, setZoom] = useState(1);
  const [backgroundFocus, setBackgroundFocus] = useState(true);
  const [noteList, setNoteList] = useState([])
  const [loadingTrue, setLoadingTrue] = useState(true);
  // isKeydown
  const { isKeydown: isKeydownShift } = useKeycon({ keys: "shift" });
  const { isKeydown: isKeydownAlt } = useKeycon({ keys: "alt" });
  const { isKeydown: isKeydownMeta } = useKeycon({ keys: "meta" });

  // use effect
  useEffect(() => {
    if (initiateOnce.current) {
      socketInitializer()
      infoSticky.current.style.left = `${innerWidth/2 - 400}px`
      infoSticky.current.style.top = `${innerHeight / 2 - 400}px`

      initiateOnce.current = false;
    } else {
      initiateOnce.current = true;
    }
  }, []);

  useEffect(() => {
    if (sendCreateNote.current) {
      sendCreateNote.current = false;
      let thisId = notePlaceholder.current;
      socket.on('resProperId', properId => {
        socket.off('resProperId');
        let counter = -1
        let chosenObj;
        while (true) {
          if (noteList.at(counter)._id == thisId) {
            chosenObj = noteList.at(counter);
            chosenObj._id = properId;
            setNoteList([...noteList.slice(0, counter - 1), chosenObj, ...noteList.slice(counter - 1, -1)]);
            break
          } else {
            counter--;
          }
        }
      })
      socket.emit('create-sticky', sendJsonObj.current);
    }
  }, [noteList]);

  // functions
  const matrixToArray = str => {
    return str.match(/(-?[0-9\.]+)/g);
  }
  const createNote = () => {
    // get x and y pos of stickynote
    let computedArr = matrixToArray(getComputedStyle(document.querySelector(`.viewport`)).transform)
    sendJsonObj.current = JSON.stringify(
      [((-computedArr[4] + 50) / zoom) + ((innerWidth / 2) / zoom) + ((175 / zoom)), ((-computedArr[5] + 50) / zoom) + ((innerHeight / 2) / zoom) + ((175 / zoom))]
    );    
    notePlaceholder.current = notePlaceholder.current + 1;
    // set current note
    sendCreateNote.current = true;
    setNoteList(
    () => [...noteList, {
      c: 3, t: "type some text", T: "Title",
      x: ((-computedArr[4] + 50) / zoom) + ((innerWidth / 2) / zoom) + ((175 / zoom)),
      y: ((-computedArr[5] + 50) / zoom) + ((innerHeight / 2) / zoom) + ((175 / zoom)),
      w: 350, h: 350, _id: notePlaceholder.current
    }]) 
  }
  const deleteNote = (deleteId) => {
    socket.emit("deleteById", JSON.stringify(deleteId))
    setNoteList(noteList.filter(el => el._id !== deleteId))
    }
  const updateVal = (updateArr) => {
    socket.emit('updateVal', JSON.stringify(updateArr))
  }

  // socket.io
  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()
    socket.on('resCreate-sticky', newJsonStickyObj => {
      let newStickyObj = JSON.parse(newJsonStickyObj)
      setNoteList((noteList) => [...noteList, { c: 3, t: "type some text", T: "Title", x: newStickyObj.x, y: newStickyObj.y, w: 350, h: 350, _id: newStickyObj._id}])
    })
    socket.on("resDeleteById", (JsondeleteId) => {
      let deleteId = JSON.parse(JsondeleteId)
      setNoteList((noteList) => noteList.filter(el => el._id != deleteId))
    })
    socket.on('resUpdateVal', jsonUpdArr => {
      let updArr = JSON.parse(jsonUpdArr);
      setNoteList((noteList) => {
        let x = noteList.map(stickynote => {
          if (updArr[0][0] != stickynote._id) {
            return stickynote
          } else {
            updArr.map(property => {
              stickynote[property[1]] = property[2]
            })
            return stickynote
          }
        })
        return x;
      })
    })
    socket.on('resPreloadStickies', jsonSticky => {
      setLoadingTrue(false)
      setNoteList(JSON.parse(jsonSticky))
    })
  }
  return (
    <>
    {loadingTrue ? <Loading/> : ""}
    <div className={styles.app} style={{display: loadingTrue ? "none" : "inline"}}>
      <button className={styles.stickynoteAdd} onClick={createNote}><Image src={"/media/images/stickynoteAdd.svg"} width="100" height="100" alt="add sticky note button" className={styles.icon} /></button>
      <InfiniteViewer
        ref={infiniteViewerRef}
        className={`${styles.viewer}`}
        useWheelScroll={true}
        useScroll={true}
        zoom={zoom}
        zoomRange={[0.2, 12]}
        // useAutoZoom={true}
        zoomOffsetX={"50%"}
        zoomOffsetY={"50%"}
        useMouseDrag={backgroundFocus}
        usePinch={!backgroundFocus}
        wheelPinchKey="alt"
        onPinch={(e) => {
          setZoom(e.zoom);
        }}
      >
      <div
        className="viewport"
        style={{
          pointerEvents: "auto",
          // background: "rgba(0,0,0,0.5)",
          // width: `${100 }vw`,
          // height: `${100}vh`
        }}
      >
        <div className={styles.target} ref={infoSticky} >
        <div className={styles.header}></div>
          <div className={styles.body}><strong>Welcome</strong><br/>Hello and welcome to the infinite white board for idea making 
            <br /><br /><strong>How?</strong><br /> click the <strong>bottom right</strong> to create a stickynote and just<br /> <strong>drag and pinch</strong> to move, its that simple
            <br/><br/><strong>Beta</strong><br/>When you change the zoom from default, the sticky note wont place in centre :(</div>
          </div>
        {noteList.map((noteInfo) => (<StickyNote key={noteInfo._id} _id={noteInfo._id} isKeydownAlt={isKeydownAlt} isKeydownShift={isKeydownShift} 
          isKeydownMeta={isKeydownMeta} setBackgroundFocus={setBackgroundFocus} zoom={zoom}
          c={noteInfo.c} x={noteInfo.x} y={noteInfo.y} w={noteInfo.w} h={noteInfo.h} T={noteInfo.T} t={noteInfo.t} deleteNote={deleteNote} updateVal={updateVal}/>)
        )}
        </div>
      </InfiniteViewer>
    </div>
    </>
  );
}
