import React, { FC } from "react";
import { space } from "../../infrastructure/theme/spacing";
import styled from "styled-components/native";

const TopSpacerView = styled.View<{ size: string }>`
  margin-top: ${(props) => props.size};
`;

const BottomSpacerView = styled.View<{ size: string }>`
  margin-bottom: ${(props) => props.size};
`;

const LeftSpacerView = styled.View<{ size: string }>`
  margin-left: ${(props) => props.size};
`;

const RightSpacerView = styled.View<{ size: string }>`
  margin-right: ${(props) => props.size};
`;

interface SpacerProps {
  variant: string;
}

export const Spacer: FC<SpacerProps> = ({ variant }) => {
  let size: string;

  switch (variant) {
    case "top.xsmall":
      size = space[1];
      break;
    case "top.small":
      size = space[2];
      break;
    case "top.medium":
      size = space[3];
      break;
    case "top.large":
      size = space[4];
      break;
    case "bottom.small":
      size = space[2];
      break;
    case "bottom.medium":
      size = space[3];
      break;
    case "bottom.large":
      size = space[4];
      break;
    case "left.small":
      size = space[2];
      break;
    case "left.medium":
      size = space[3];
      break;
    case "left.large":
      size = space[4];
      break;
    case "right.small":
      size = space[2];
      break;
    case "right.medium":
      size = space[3];
      break;
    case "right.large":
      size = "right.large";
      break;
    default:
      size = space[2];
      break;
  }

  return (
    <>
      {variant.includes("top") && <TopSpacerView size={size} />}
      {variant.includes("bottom") && <BottomSpacerView size={size} />}
      {variant.includes("left") && <LeftSpacerView size={size} />}
      {variant.includes("right") && <RightSpacerView size={size} />}
    </>
  );
};
