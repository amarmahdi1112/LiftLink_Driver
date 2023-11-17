import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#2E2C2F"
      strokeLinecap="round"
      strokeWidth={2.04}
      d="M25.667 16.333V14c0-4.4 0-6.6-1.367-7.967s-3.567-1.367-7.967-1.367h-4.666c-4.4 0-6.6 0-7.967 1.367S2.333 9.6 2.333 14v2.333c0 4.4 0 6.6 1.367 7.967 1.367 1.366 3.567 1.366 7.967 1.366h4.666M8.167 4.667v-1.75M19.833 4.667v-1.75"
    />
    <Circle cx={21} cy={21} r={3.5} stroke="#63A375" strokeWidth={1.5} />
    <Path
      stroke="#63A375"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m23.917 23.916 1.75 1.75"
    />
    <Path
      stroke="#2E2C2F"
      strokeLinecap="round"
      strokeWidth={2.04}
      d="M2.917 10.5h22.166"
    />
  </Svg>
)
export default SvgComponent
