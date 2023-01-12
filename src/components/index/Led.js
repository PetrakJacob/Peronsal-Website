export default function Led(props) {
  return (
    <div style={{ gridRow: `${props.row + 1} / ${props.row + 3}`, gridColumn: props.column}}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="70%" height="70%" x="15%" y="15%" fill="#868686"/>
        <defs>
          <radialGradient id="g">
            <stop stopColor="#fff" offset="1" />
          </radialGradient>
          <filter id="sofGlow" width="300%" height="300%" x="-100%" y="-100%">
            <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />
          </filter>
        </defs>

        <circle cx="50%" cy="50%" r="15%" fill={props.on ? "#FAF2Df" : "#4a4a4a"} />
        <circle cx="50%" cy="50%" r="16%" fill={props.on ? "white" : "rgba(0,0,0,0)"} filter={props.on ? "url(#sofGlow)" : ""} />
      </svg>
    </div>
  )
} 