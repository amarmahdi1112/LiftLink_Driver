/* eslint-disable react/prop-types */
import React, { FC, PropsWithChildren } from "react";
// import { Button } from "react-native-paper";
// import { Image } from "react-native";
import { Button, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "./utils/spacer.component";
import { ActivityIndicator } from "react-native-paper";

const StyledButton = styled(TouchableOpacity)<{ background?: string }>`
  background-color: ${(props) =>
    props.background
      ? props.background
      : props.theme.colors.formColors.primary};
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  border-width: 0;
  height: ${(props) => props.theme.buttonSizes.xl.height};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

const StyledButtonText = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-family: ${(props) => props.theme.fonts.title2};
  font-size: ${(props) => props.theme.fontSizes.buttonTitle};
`;

const HorizontalLine = styled.View`
  height: 60%;
  border-right-width: 1px;
  border-right-color: white;
  border-style: solid;
`;

interface ButtonComponentProps {
  title?: string;
  background?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: any;
}

export const ButtonComponent: FC<PropsWithChildren<ButtonComponentProps>> = ({
  children,
  title = "",
  background,
  ...props
}) => {
  return (
    <StyledButton {...props} background={background}>
      {title && <StyledButtonText>{title}</StyledButtonText>}
      <Spacer variant={"left.large"} />
      <HorizontalLine />
      <Spacer variant={"left.large"} />
      { props.loading &&
        <ActivityIndicator size="small" color="#fff" />
      }
      { !props.loading && (children)}
    </StyledButton>
  );
};