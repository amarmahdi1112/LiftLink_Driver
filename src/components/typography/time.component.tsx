import React from "react";
import styled from "styled-components/native";
import { format } from "date-fns";

const TimeText = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.date};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const TimeComponent = ({ time = "" }) => {
  let formattedTime;
  if (time) {
    const TimeObj = new Date(time);
    formattedTime = format(TimeObj, "H:mma");
  }
  return <TimeText>{formattedTime}</TimeText>;
};
