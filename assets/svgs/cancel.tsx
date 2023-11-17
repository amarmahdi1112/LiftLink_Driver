import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Circle cx={12.926} cy={12.074} r={10} stroke="#000" strokeWidth={1.5} />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m15.426 9.574-5 5m0-5 5 5"
    />
  </Svg>
);
export default SvgComponent;
