import { ComBase } from "./ComBase";
import ComputerScreen from "./ComputerScreen";
import SolderWires from "./SolderWires.js";


export default function Computer() {
  return (
    <section>
      <ComBase row={16} TopGap = {false}/>
      <ComputerScreen/>
      <SolderWires position={{ red: [15, 6], black: [15, 7] }} />
    </section>
  )
}