import React, { useState } from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";

const SvgComponent = (props: any) => {
  return (
    <View>
      <Svg style={StyleSheet.absoluteFill}>
        <Circle
          cx="200px"
          cy="200px"
          r="90px"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1%"
          fill="transparent"
          strokeDasharray={[0, 1000]}
        />
      </Svg>
    </View>
  );
};

export default SvgComponent;
