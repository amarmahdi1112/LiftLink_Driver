import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M8.5 16c0 2.828 0 4.243.879 5.121.878.879 2.293.879 5.121.879h1c2.828 0 4.243 0 5.121-.879.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121C19.743 2 18.328 2 15.5 2h-1c-2.828 0-4.243 0-5.121.879C8.5 3.757 8.5 5.172 8.5 8"
    />
    <Path
      stroke="#EAE6E5"
      strokeWidth={1.5}
      d="M8.5 19.5c-2.357 0-3.536 0-4.268-.732C3.5 18.035 3.5 16.857 3.5 14.5v-5c0-2.357 0-3.536.732-4.268C4.964 4.5 6.143 4.5 8.5 4.5"
    />
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.5 12h9m0 0L13 14.5m2.5-2.5L13 9.5"
    />
  </Svg>
);
export default SvgComponent;
