// import LogoSvg from "../../assets/svgs/logoLoadingIndicator";
import styled from "styled-components/native";
import React, { FC } from "react";

const LoadingContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 200px;
`;

export const LoadingComponent: FC = () => {
  return (
    <LoadingContainer>
      {/* <LogoSvg width={100} height={120} /> */}
    </LoadingContainer>
  );
};
