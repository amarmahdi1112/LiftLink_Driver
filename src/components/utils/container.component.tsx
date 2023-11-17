import React, { FC, PropsWithChildren } from "react";
import styled from "styled-components/native";

const StyledBody = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  position: relative;
  align-items: center;
  justify-content: flex-start;
`;

interface ContainerProps {
  styles?: any; // Replace 'any' with the type of your styles
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children,
  styles,
}) => {
  return <StyledBody style={styles}>{children}</StyledBody>;
};
