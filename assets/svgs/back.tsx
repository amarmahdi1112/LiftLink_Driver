import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m18 12-4 4 4 4"
    />
    <Path
      stroke="#EAE6E5"
      strokeWidth={1.5}
      d="M2.667 16c0-6.285 0-9.428 1.952-11.38C6.572 2.666 9.715 2.666 16 2.666s9.428 0 11.38 1.952C29.334 6.572 29.334 9.715 29.334 16s0 9.428-1.952 11.38c-1.953 1.953-5.096 1.953-11.381 1.953s-9.428 0-11.38-1.952C2.666 25.428 2.666 22.285 2.666 16Z"
    />
  </Svg>
);
export default SvgComponent;
