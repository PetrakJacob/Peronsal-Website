import { ComBase } from './ComBase';
import SolderWires from "./SolderWires.js";
import SkillLed from './SkillLed.js'
import SkillScreen from './SkillScreen'

export default function Skills() {
  return (
    <section style={{ gridTemplateRows: "repeat(23, 6.25vh)"}}>
      <ComBase row={20} TopGap={false} />
      <SolderWires position={{ red: [19, 8], black: [19, 9] }} row={24}/>
      <SkillScreen row={2} column="5/11" titleText="Strengths"/>
      <SkillLed row={4} text="initiative" score={5}/>
      <SkillLed row={7} text="hard working" score={5} />
      <SkillLed row={10} text="innovation" score={5} />
      <SkillLed row={13} text="communication" score={4} />
      <SkillLed row={16} text="integrity" score={5} />




    </section>
  )
}