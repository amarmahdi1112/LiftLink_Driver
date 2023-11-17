import React, { useContext, useEffect, useState } from "react";
import {
  DriverContext,
  DriverContextProps,
} from "../../../infrastructure/service/driver/context/driver.context";
// import LogoSvg from "../../../../assets/svgs/logoLoadingIndicator";
import styled from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";

export const isObjEmpty = (obj: any): boolean => {
  return typeof obj === "undefined" || obj === null
    ? true
    : Object.keys(obj).length === 0
    ? true
    : false;
};

const ScreenCenteredView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const LogoContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 200px;
  position: absolute;
`;

const FixedBackground = styled.ImageBackground`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface MainScreenProps {
  navigation: StackNavigationProp<any>; // Replace 'any' with the type of your navigation
}

export const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const {
    profile,
    loading: userContextLoading,
    onGetUserData,
  }: DriverContextProps = useContext(DriverContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isObjEmpty(profile)) {
        await onGetUserData();
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!loading) {
      changePage();
    }
  }, [loading, profile]);

  const changePage = () => {
    if (!profile.isVerified || isObjEmpty(profile.profilePicture)) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <ScreenCenteredView>
      <FixedBackground
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/app_images%2FbackgroundPatterns.png?alt=media&token=ae22b591-86c1-4a10-b1d9-dae0e1075eba",
        }}
      >
        <LogoContainer>{/* <LogoSvg /> */}</LogoContainer>
      </FixedBackground>
    </ScreenCenteredView>
  );
};
