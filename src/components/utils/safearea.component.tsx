import React, { FC } from "react";
import styled from "styled-components/native";
import { StatusBar, Platform, View } from "react-native";

const SafeArea = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  background-color: ${(props) => props.theme.colors.darkUI.primary};
`;

interface SafeAreaProps {
  children: React.ReactNode;
}

export const SafeAreaComponent: FC<SafeAreaProps> = ({ children }) => {
  StatusBar.setBarStyle("dark-content", true);
  return <SafeArea>{children}</SafeArea>;
};
