import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#EAE6E5"
      strokeWidth={1.5}
      d="M2.5 12c0-4.714 0-7.071 1.464-8.536C5.43 2 7.786 2 12.5 2c4.714 0 7.071 0 8.535 1.464C22.5 4.93 22.5 7.286 22.5 12c0 4.714 0 7.071-1.465 8.535C19.572 22 17.214 22 12.5 22s-7.071 0-8.536-1.465C2.5 19.072 2.5 16.714 2.5 12Z"
    />
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9 12.5 2 2 5-5"
    />
  </Svg>
)
export default SvgComponent
