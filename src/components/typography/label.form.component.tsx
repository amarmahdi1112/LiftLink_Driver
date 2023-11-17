/* eslint-disable react/prop-types */
import React, { FC, PropsWithChildren } from "react";
import styled from "styled-components/native";

interface Props {
  size?: number | string;
}

const FormLabel = styled.Text<Props>`
  color: #2e2c2f;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.28px;
`;

export const LabelFormComponent: FC<PropsWithChildren<Props>> = ({
  children,
  size,
}) => {
  return <FormLabel size={size}>{children}</FormLabel>;
};
