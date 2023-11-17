import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#EAE6E5"
      strokeWidth={2.197}
      d="M29.298 18c0 6.472-5.247 11.72-11.72 11.72C11.108 29.72 5.86 24.471 5.86 18c0-6.473 5.247-11.72 11.719-11.72 6.472 0 11.72 5.247 11.72 11.72Z"
    />
    <Path
      stroke="#EAE6E5"
      strokeWidth={2.197}
      d="M21.974 18a4.395 4.395 0 1 1-8.79 0 4.395 4.395 0 0 1 8.79 0Z"
    />
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeWidth={2.197}
      d="M2.93 18h2.93M29.298 18h2.93M17.579 6.28V3.35M17.579 32.65v-2.93"
    />
  </Svg>
);
export default SvgComponent;
