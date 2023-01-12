import Circle from "./Circle.js";

export function ComBase(props) {
  let rows = props.row
  const gridAboveBoard = props.topGap? 2 : 1;
  return (
    <>
      {/* green circuit board base */}
      <div style={{ gridRow: `${gridAboveBoard} / ${rows}`, gridColumn: "2/14", backgroundColor: "#30705f", borderRadius: "20px",}}></div>
      {/* cut holes */}
      <Circle color="#ad7a37" row={gridAboveBoard} column={2}/>
      <Circle color="#ad7a37" row={rows - 1} column={2} />
      <Circle color="#ad7a37" row={gridAboveBoard} column={13} />
      <Circle color="#ad7a37" row={rows - 1} column={13} />
    </> 
  )
}