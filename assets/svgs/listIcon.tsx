import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
const SvgComponent = (props: any) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none">
    <Circle cx={10.629} cy={10.903} r={8.333} stroke="#63A375" />
    <Path
      stroke="#63A375"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7.712 11.32 1.667 1.666 4.167-4.166"
    />
  </Svg>
)
export default SvgComponent
