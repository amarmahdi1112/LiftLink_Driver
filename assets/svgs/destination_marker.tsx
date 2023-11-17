import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#63A375"
      fillRule="evenodd"
      d="M19.5 3.25c-7.18 0-13 5.925-13 13.233 0 7.25 4.15 15.712 10.623 18.738a5.606 5.606 0 0 0 4.754 0C28.351 32.195 32.5 23.734 32.5 16.483c0-7.308-5.82-13.233-13-13.233Zm0 17.875a4.875 4.875 0 1 0 0-9.75 4.875 4.875 0 0 0 0 9.75Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
