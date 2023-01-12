import SkillScreen from './SkillScreen'
import Led from './Led'

export default function SkillLed(props) {

  let ledInfo = [["3/5", false], ["5/7", false], ["7/9", false], ["9/11", false], ["11/13", false]]
  for (let i = 0; i < props.score; i++) {
    ledInfo[i][1] = true
  }
  return (
    <>
    <SkillScreen titleText={props.text} row={props.row}/>
      {ledInfo.map(info => <Led row={props.row} column={info[0]} on={info[1]} key={info}/>)}
    </>
  )
}