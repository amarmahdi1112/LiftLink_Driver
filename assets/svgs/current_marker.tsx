import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#63A375"
      stroke="#63A375"
      strokeWidth={2.438}
      d="M8.125 13.836C8.125 7.99 13.218 3.25 19.5 3.25s11.375 4.74 11.375 10.586c0 5.801-3.63 12.57-9.295 14.99a5.323 5.323 0 0 1-4.16 0c-5.665-2.42-9.295-9.189-9.295-14.99Z"
    />
    <Path fill="#D9D9D9" d="M23.5 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    <Path
      stroke="#2E2C2F"
      strokeLinecap="round"
      strokeWidth={2.438}
      d="M34.06 25.188c1.082.979 1.69 2.082 1.69 3.25 0 4.038-7.275 7.312-16.25 7.312S3.25 32.476 3.25 28.437c0-1.167.608-2.27 1.69-3.25"
    />
  </Svg>
)
export default SvgComponent
