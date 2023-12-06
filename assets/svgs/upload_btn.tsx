import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={52}
    height={53}
    fill="none"
    {...props}
  >
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeWidth={3}
      d="M47.667 26.113c0 10.214 0 15.321-3.173 18.494S36.214 47.78 26 47.78s-15.32 0-18.494-3.173c-3.173-3.173-3.173-8.28-3.173-18.494 0-10.213 0-15.32 3.173-18.493C10.68 4.447 15.786 4.447 26 4.447"
    />
    <Path
      stroke="#2E2C2F"
      strokeLinecap="round"
      strokeOpacity={0.4}
      strokeWidth={3}
      d="M47.667 26.113c0 10.214 0 15.321-3.173 18.494S36.214 47.78 26 47.78s-15.32 0-18.494-3.173c-3.173-3.173-3.173-8.28-3.173-18.494 0-10.213 0-15.32 3.173-18.493C10.68 4.447 15.786 4.447 26 4.447"
    />
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m4.333 27.197 3.795-3.321a4.983 4.983 0 0 1 6.806.226l9.294 9.295a4.333 4.333 0 0 0 5.556.481l.646-.454a6.5 6.5 0 0 1 8.086.487l6.984 6.285"
    />
    <Path
      stroke="#2E2C2F"
      strokeLinecap="round"
      strokeOpacity={0.4}
      strokeWidth={1.5}
      d="m4.333 27.197 3.795-3.321a4.983 4.983 0 0 1 6.806.226l9.294 9.295a4.333 4.333 0 0 0 5.556.481l.646-.454a6.5 6.5 0 0 1 8.086.487l6.984 6.285"
    />
    <Path
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M36.833 4.447v19.5m0-19.5 6.5 6.5m-6.5-6.5-6.5 6.5"
    />
    <Path
      stroke="#2E2C2F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.4}
      strokeWidth={3}
      d="M36.833 4.447v19.5m0-19.5 6.5 6.5m-6.5-6.5-6.5 6.5"
    />
  </Svg>
)
export default SvgComponent
