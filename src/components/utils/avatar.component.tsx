import React, { FC } from "react";
import styled from "styled-components/native";
import { ImageBackground } from "react-native";

const Avatar = styled.View<{ width?: number; height?: number }>`
  width: ${(props) => props.width ?? 54}px;
  height: ${(props) => props.height ?? 54}px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${(props) => props.theme.space[3]};
`;

const GreetingContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const GreetingsText = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.date};
`;

const LogoSubText = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

interface AvatarComponentProps {
  showGreetings?: boolean;
  imageUrl?: string;
  fullName?: string;
  width?: number;
  height?: number;
}

export const AvatarComponent: FC<AvatarComponentProps> = ({
  showGreetings = false,
  imageUrl = "",
  fullName = "",
  width,
  height,
}) => {
  return (
    <AvatarContainer>
      <Avatar width={width} height={height}>
        <ImageBackground
          source={{
            uri: imageUrl,
          }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
            overflow: "hidden",
          }}
          resizeMode="cover"
        />
      </Avatar>
      {showGreetings && (
        <>
          <GreetingContainer>
            <GreetingsText>Hello,</GreetingsText>
            <LogoSubText>{fullName}</LogoSubText>
          </GreetingContainer>
        </>
      )}
    </AvatarContainer>
  );
};
