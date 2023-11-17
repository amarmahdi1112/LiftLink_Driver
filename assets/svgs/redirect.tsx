import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgComponent = (props: any) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none">
    <Path
      stroke="#313638"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m10.833 9.667 7.5-7.5m0 0H13.88m4.453 0V6.62"
    />
    <Path
      stroke="#313638"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M18.333 10.5c0 3.928 0 5.893-1.22 7.113-1.22 1.22-3.185 1.22-7.113 1.22-3.928 0-5.893 0-7.113-1.22-1.22-1.22-1.22-3.185-1.22-7.113 0-3.928 0-5.893 1.22-7.113 1.22-1.22 3.185-1.22 7.113-1.22"
    />
  </Svg>
)
export default SvgComponent
