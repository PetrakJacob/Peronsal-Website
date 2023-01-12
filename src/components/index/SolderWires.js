import Circle from "./Circle";

export default function SolderWires(props) {
  return (
    <>
      {/* red black wires start*/}
      <svg width="100%" height="100%" style={{gridRow: props.position.red[0], gridColumn: props.position.red[1]}} >
        <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="red" strokeWidth="9" />
      </svg>
      <svg width="100%" height="100%" style={{ gridRow: props.position.black[0], gridColumn: props.position.black[1] }} >
        <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="black" strokeWidth="9" />
      </svg>
      {/* red black wires rest */}
      <svg width="100%" height="100%" style={{ gridRow: `${props.position.red[0] + 1} / ${props.row? props.row: 20}`, gridColumn: props.position.red[1] }} >
        <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="red" strokeWidth="9" />
      </svg>
      <svg width="100%" height="100%" style={{ gridRow: `${props.position.black[0] + 1} / ${props.row ? props.row : 20}`, gridColumn: props.position.black[1] }} >
        <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="black" strokeWidth="9" />
      </svg>
      {/* solder spots */}
      <Circle color="grey" row={props.position.red[0]} column={props.position.red[1]} />
      <Circle color="grey" row={props.position.black[0]} column={props.position.black[1]} />
    </>
  )
}