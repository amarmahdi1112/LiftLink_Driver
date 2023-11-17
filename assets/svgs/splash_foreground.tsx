import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";
import { theme } from "./../../src/infrastructure/theme";
import { Asset } from 'expo-asset';

// const imageAsset = Asset.fromModule(require('./../imgs/pattern2.png'));
// imageAsset.downloadAsync();


const SvgComponent = (props: any) => (
  <Svg
    fill="none"
    width="100%" // Set width to 100% to fit the container
    height="100%" // Set height to 100% to fit the container
    viewBox={`0 0 ${theme.screenSizes.original.width} ${theme.screenSizes.original.height}`}
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M0 812h812v375H0z"
      transform="rotate(-90 0 812)"
    />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="matrix(.00054 0 0 .00026 -.286 0)" />
      </Pattern>
      <Image
        id="b"
        width={theme.screenSizes.original.width}
        height={theme.screenSizes.original.height}
      />
    </Defs>
  </Svg>
);

export default SvgComponent;

