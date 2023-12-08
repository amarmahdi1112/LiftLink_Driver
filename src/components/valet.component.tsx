import React, { FC, PropsWithChildren, useContext } from "react";
import styled from "styled-components/native";
import { LabelComponent } from "./typography";
import { Pressable } from "react-native";
import { AvatarComponent } from "./utils/avatar.component";
import BackIcon from "../../assets/svgs/back";
import { DriverContext } from "../infrastructure/service/driver/context/driver.context";

const Container = styled.ScrollView`
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: transparent;
`;

const PositionedImage = styled.Image`
  position: absolute;
  top: 50px;
  left: 50%;
  width: 80%;
  z-index: 9999;
  margin-left: -32%;
  resize-mode: contain;
`;

const HeaderTitleContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
`;

const FixedBackgroundImg = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export const ValetContainer: FC<PropsWithChildren<any>> = ({
  children,
  navigation,
}) => {
  const { profile } = useContext(DriverContext);
  return (
    <>
      <FixedBackgroundImg
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/app_images%2Fbg.png?alt=media&token=f23391ee-4b4e-4760-94e0-38fe99f64019",
        }}
      />
      <Container>
        <HeaderTitleContainer>
          <Pressable onPress={() => navigation.goBack()}>
            <BackIcon width={32} height={32} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Settings")}>
            <AvatarComponent imageUrl={profile.profilePicture[0].pictureLink} />
          </Pressable>
        </HeaderTitleContainer>
        <PositionedImage
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/app_images%2Fgenesis-car-img.png?alt=media&token=2847ee38-d2c1-488f-b10a-8ff14ba3cdce",
          }}
        />
        {children}
      </Container>
    </>
  );
};
