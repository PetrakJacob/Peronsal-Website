import styles from "./Back.module.css";
import StickyNote from './StickyNote.js'
import InfiniteViewer from "react-infinite-viewer";
import React from "react";

export default function Background() {
  const inf1 = React.createRef();
  return (
    <>
        <div style={{ backgroundColor: "#eee" }}>
          <InfiniteViewer 
            useAutoZoom
            usePinch
            useWheelScroll
            ref={inf1} 
            className={styles.viewer}>
            <div className={styles.stickyNote}>
              AA
            </div>
            <StickyNote/>
          </InfiniteViewer>
        </div>

    </>
  );
}