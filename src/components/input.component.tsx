/* eslint-disable react/prop-types */
import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import React, { FC, PropsWithChildren } from "react";
import { theme } from "../infrastructure/theme";
import { KeyboardTypeOptions } from "react-native";

const InputField = styled.TextInput<{ isError?: boolean; height?: string }>`
  background-color: ${(props: any) => props.theme.colors.bg.primary};
  border-radius: ${(props) => props.theme.borderRadiuses[3]};
  border-width: 1px;
  border-color: ${(props: any) =>
    !props.isError
      ? props.theme.colors.formColors.border
      : props.theme.colors.formColors.error};
  width: 100%;
  height: ${(props) => props.height || "60px"};
  max-height: ${(props) => props.height || "60px"};
  padding-left: 20px;
`;

interface InputComponentProps {
  secure?: boolean;
  value?: string;
  onChangeText?: (text: any) => void;
  isError?: boolean;
  placeholder?: string;
  autofocus?: boolean;
  autocompleteType?: string;
  keyboardType?: KeyboardTypeOptions;
  textContentType?: string;
}

export const InputComponent: FC<PropsWithChildren<InputComponentProps>> = ({
  ...props
}) => {
  return (
    <InputField
      selectionColor="black"
      cursorColor="black"
      placeholderTextColor={theme.colors.formColors.border}
      secureTextEntry={props.secure}
      onChangeText={props.onChangeText}
      value={props.value}
      isError={props.isError}
      placeholder={props.placeholder}
      autoFocus={props.autofocus}
    />
  );
};
