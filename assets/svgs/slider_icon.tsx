import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#2E2C2F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.5 12h8m0 0-3-3m3 3-3 3"
    />
    <Path
      stroke="#2E2C2F"
      strokeWidth={1.5}
      d="M2.5 12c0-4.714 0-7.071 1.464-8.536C5.43 2 7.786 2 12.5 2c4.714 0 7.071 0 8.535 1.464C22.5 4.93 22.5 7.286 22.5 12c0 4.714 0 7.071-1.465 8.535C19.572 22 17.214 22 12.5 22s-7.071 0-8.536-1.465C2.5 19.072 2.5 16.714 2.5 12Z"
    />
  </Svg>
)
export default SvgComponent
