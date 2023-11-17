import React from "react";
import { TextInput } from "react-native-paper";
import styled from "styled-components/native";

// add a placeholder prop to the styled component
const StyledTextInput = styled(TextInput)`
  width: 100%;
  background-color: ${(props: any) => props.theme.colors.bg.primary};
  color: ${(props: any) => props.theme.colors.darkText.inverse};
  font-size: ${(props: any) => props.theme.fontSizes.body};
  font-family: ${(props: any) => props.theme.fonts.title};
  border-radius: ${(props: any) => props.theme.borderRadiuses[3]};
  border: 1px solid ${(props: any) => props.theme.colors.formColors.border};
`;

export const MultilineInputComponent = ({ ...props }) => {
  return (
    <StyledTextInput
      multiline={true}
      numberOfLines={5}
      mode="flat"
      activeUnderlineColor="transparent"
      selectionColor="black"
      underlineColor="transparent"
      textColor="black"
      cursorColor="black"
      placeholder="Type here..."
      {...props}
    />
  );
};
