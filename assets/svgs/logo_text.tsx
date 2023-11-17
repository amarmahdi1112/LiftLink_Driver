import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path scale={props.scale || 1}
      fill="#EAE6E5"
      d="M5.3 10H.116V1.6h.54v7.896H5.3V10Zm1.857-7.728a.543.543 0 0 1-.552-.552c0-.312.24-.54.552-.54.312 0 .54.228.54.54a.533.533 0 0 1-.54.552ZM7.42 10h-.528V3.64h.528V10Zm3.096 0H9.99V4.108H8.693V3.64H9.99v-.888c0-1.14.576-1.752 1.656-1.752h1.332v.468h-1.332c-.732 0-1.128.444-1.128 1.284v.888h3.156V1.468h.528V3.64h1.872v.468h-1.872v4.14c0 .84.396 1.284 1.116 1.284h.648V10h-.648c-1.068 0-1.644-.612-1.644-1.752v-4.14h-3.156V10Zm12.748 0H17.54V1.6h1.44v7.104h4.284V10Zm1.974-7.212a.907.907 0 0 1-.912-.924c0-.516.396-.912.912-.912a.89.89 0 0 1 .912.912c0 .516-.384.924-.912.924ZM25.947 10H24.53V3.64h1.416V10Zm3.01 0H27.54V3.64h1.14l.12.936c.396-.66 1.2-1.128 2.148-1.128 1.356 0 2.244.912 2.244 2.34V10h-1.416V5.86c0-.708-.468-1.176-1.26-1.176-.924 0-1.548.636-1.56 1.464V10Zm7.181 0h-1.416V1h1.416v5.4l2.712-2.76h1.728l-2.304 2.292L40.89 10h-1.644L37.29 6.916l-1.152 1.152V10Z"
    />
  </Svg>
)
export default SvgComponent
