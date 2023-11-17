import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G
      stroke="#EAE6E5"
      strokeLinecap="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path d="M12.224 6.388c1.45.008 2.235.072 2.747.585.586.585.586 1.528.586 3.414v.666c0 1.886 0 2.829-.586 3.415-.586.585-1.528.585-3.414.585H6.224c-1.886 0-2.829 0-3.415-.585-.585-.586-.585-1.529-.585-3.415v-.666c0-1.886 0-2.829.585-3.414.513-.513 1.298-.577 2.748-.585" />
      <Path
        strokeLinejoin="round"
        d="M8.89 10.387V1.72m0 0 2 2.333m-2-2.333-2 2.333"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={16} height={16} x={0.89} y={0.387} fill="#fff" rx={5} />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
