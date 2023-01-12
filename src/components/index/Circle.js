export default function Circle(props) {
  return (
    <svg width="100%" height="100%" style={{ gridRow: props.row, gridColumn: props.column }}>
      <circle cx="50%" cy="50%" r="25%" fill={props.color} />
    </svg>
  )
}