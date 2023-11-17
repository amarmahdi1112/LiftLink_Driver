import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DestinationIcon = (props: any) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none">
    <Path
      stroke="#fff"
      strokeWidth={1.625}
      d="M5.417 9.724c0-3.897 3.395-7.057 7.583-7.057 4.188 0 7.583 3.16 7.583 7.057 0 3.867-2.42 8.38-6.196 9.994a3.549 3.549 0 0 1-2.774 0c-3.776-1.614-6.196-6.127-6.196-9.994Z"
    />
    <Path
      stroke="#fff"
      strokeWidth={1.625}
      d="M15.167 10.25a2.167 2.167 0 1 1-4.334 0 2.167 2.167 0 0 1 4.334 0Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.625}
      d="M22.707 17.292c.72.652 1.126 1.388 1.126 2.166 0 2.693-4.85 4.875-10.833 4.875-5.983 0-10.834-2.182-10.834-4.875 0-.778.406-1.514 1.127-2.166"
    />
  </Svg>
)
export default DestinationIcon;
