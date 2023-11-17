import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#EAE6E5"
      strokeWidth={1.5}
      d="M2.574 12.84c0-4.715 0-7.072 1.464-8.536 1.465-1.465 3.822-1.465 8.536-1.465 4.714 0 7.071 0 8.536 1.465 1.464 1.464 1.464 3.821 1.464 8.535s0 7.071-1.465 8.536c-1.464 1.464-3.821 1.464-8.535 1.464s-7.071 0-8.536-1.464c-1.464-1.465-1.464-3.822-1.464-8.536Z"
    />
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9.074 13.34 2 2 5-5"
    />
  </Svg>
)
export default SvgComponent
