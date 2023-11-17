import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none">
    <Path
      stroke="#fff"
      strokeWidth={1.5}
      d="M5.833 35c0-13.75 0-20.624 4.272-24.895C14.376 5.833 21.25 5.833 35 5.833c13.75 0 20.624 0 24.895 4.272C64.167 14.376 64.167 21.25 64.167 35c0 13.75 0 20.624-4.272 24.895C55.624 64.167 48.75 64.167 35 64.167c-13.75 0-20.624 0-24.895-4.272C5.833 55.624 5.833 48.75 5.833 35Z"
    />
    <Circle cx={35} cy={35} r={11.667} stroke="#fff" strokeWidth={1.5} />
  </Svg>
)
export default SvgComponent
