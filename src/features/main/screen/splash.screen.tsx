import React, { FC, useContext, useEffect, useState } from "react";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";
import styled from "styled-components/native";
import { LabelComponent } from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { ButtonComponent } from "../../../components/button.component";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { Alert } from "react-native";
import { isObjEmpty } from "./main.screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const CarImg = styled.Image`
  width: 164%;
  margin-left: -60%;
  object-fit: contain;
  background-color: black;
  z-index: 1;
`;

const OverlayImg = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: black;
  position: absolute;
  z-index: 2;
  opacity: 0.5;
`;

const ForegroundOverlay = styled.View`
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  z-index: 3;
  opacity: 0.7;
`;

const LabelContainer = styled.View`
  position: absolute;
  z-index: 4;
  bottom: 0;
  left: 0;
  padding: 20px;
`;

interface SplashProps {
  navigation: any;
}

export const Splash: FC<SplashProps> = ({ navigation }) => {
  // const {
  //   isAuthenticated,
  //   loading: authLoading,
  //   err,
  // } = useContext(AuthContext);
  const { profile, loading, onGetUserData, errorDriver } =
    useContext(DriverContext);

  useEffect(() => {
    const fetchData = async () => {
      await onGetUserData();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isObjEmpty(profile)) {
        setTimeout(() => {
          if (profile.accountType !== "driver") {
            AsyncStorage.clear();
            navigation.navigate("Auth");
            return;
          }
          navigation.navigate("MainNavigation");
        }, 2000);
      }
      if (errorDriver) {
        setTimeout(() => {
          navigation.navigate("Auth");
        }, 2000);
      }
    }
  }, [loading]);

  return (
    <Container>
      <OverlayImg
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/app_images%2Fsplashbackground.png?alt=media&token=97c88261-5f90-4c1b-b032-cb7642c34182",
        }}
      />
      <LabelContainer>
        <LabelComponent
          title1={true}
          inverted={true}
          styles={{
            fontSize: 20,
            fontWeight: "bold",
            lineHeight: 48,
          }}
        >
          Enhance the Luxury Revolution.
        </LabelComponent>
        <Spacer variant="top.medium" />
        <LabelComponent
          title2={true}
          inverted={true}
          styles={{
            fontSize: 12,
            textShadowColor: "rgba(0, 0, 0, 0.25)",
          }}
        >
          Indulge your vehicle with the care it deserves. Use Lift Link to
          schedule repairs, maintenance, and more from our team of certified
          experts devoted to their craft.
        </LabelComponent>
        <Spacer variant="top.large" />
        <Spacer variant="top.large" />
        {/* <ButtonComponent
          title="Get Started"
          onPress={async () => await handleGetStarted()}
        /> */}
      </LabelContainer>
    </Container>
  );
};
