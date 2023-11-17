import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#EAE6E5"
      strokeWidth={1.5}
      d="M2.167 13c0-4.085 0-6.128 1.269-7.397 1.269-1.27 3.312-1.27 7.397-1.27h4.333c4.086 0 6.129 0 7.398 1.27 1.27 1.269 1.27 3.312 1.27 7.397v2.167c0 4.085 0 6.128-1.27 7.397-1.27 1.27-3.312 1.27-7.398 1.27h-4.333c-4.085 0-6.128 0-7.397-1.27-1.27-1.269-1.27-3.312-1.27-7.397V13Z"
    />
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M7.583 4.333V2.708M18.416 4.333V2.708"
    />
    <Circle
      cx={17.875}
      cy={17.875}
      r={1.625}
      stroke="#EAE6E5"
      strokeWidth={1.5}
    />
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M2.708 9.75h20.584"
    />
  </Svg>
)
export default SvgComponent
