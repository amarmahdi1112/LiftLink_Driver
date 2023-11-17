import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const PickupIcon = (props: any) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none">
    <Path
      stroke="#fff"
      strokeWidth={1.5}
      d="M4 10.643C4 6.146 7.582 2.5 12 2.5s8 3.646 8 8.143c0 4.462-2.553 9.67-6.537 11.531a3.45 3.45 0 0 1-2.926 0C6.553 20.312 4 15.105 4 10.644Z"
    />
    <Circle cx={12} cy={10.5} r={3} stroke="#fff" strokeWidth={1.5} />
  </Svg>
)
export default PickupIcon
