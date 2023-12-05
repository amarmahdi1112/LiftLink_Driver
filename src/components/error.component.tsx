import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components/native";
import { LabelComponent } from "./typography";
import ErrorSvg from "../../assets/svgs/error";
import { Animated } from "react-native";

interface ErrorProps {
  errorMessage: any;
  show: boolean;
}

const ErrorContainer = styled.View`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 1000;
`;

const ErrorTextContatiner = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  background-color: ${(props) => props.theme.colors.bg.error};
`;

export const ErrorComponent: FC<PropsWithChildren<ErrorProps>> = ({
  children,
  errorMessage,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    if (errorMessage !== "") {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [errorMessage]);


  return (
    <ErrorContainer>
      <ErrorTextContatiner>
        <ErrorSvg />
        <LabelComponent>{errorMessage}</LabelComponent>
      </ErrorTextContatiner>
    </ErrorContainer>
  );
}