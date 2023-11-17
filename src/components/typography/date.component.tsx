import React, { FC } from "react";
import styled from "styled-components/native";
import { format } from "date-fns";

const DateText = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.date};
  font-family: ${(props) => props.theme.fonts.title};
`;

interface DateComponentProps {
  date?: string;
}

export const DateComponent: FC<DateComponentProps> = ({ date = "" }) => {
  let formattedDate;
  if (date) {
    const dateObj = new Date(date);
    formattedDate = format(dateObj, "MMMM d, yyyy");
  }
  return <DateText>{formattedDate}</DateText>;
};
