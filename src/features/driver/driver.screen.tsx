/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, FC } from "react";
import { useIsFocused } from "@react-navigation/native";
import { MainContainer } from "../../components/main.component";
import { DriverProfileScreen } from "./screens/driver.profile.screen";
import { ImageContainerProvider } from "./utils/imageObjectContainer";
import { DriverContext, screens } from "../../infrastructure/service/driver/context/driver.context";
import { DriverPhoneVerificationScreen } from "./screens/driver.phone.verification.screen";
import { DriverInfoScreen } from "./screens/driver.info.screen";
// import LogoLoadingIndicator from "../../../assets/svgs/logoLoadingIndicator";
import styled from "styled-components/native";
import { isObjEmpty } from "../main/screen/main.screen";
import { LabelComponent } from "../../components/typography";
import { ButtonComponent } from "../../components/button.component";
import LogOutIcon from "../../../assets/svgs/logout";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const LoaderContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50px, -50px);
  z-index: 2;
  justify-content: center;
  align-items: center;
`;

const LabelContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
`;

const ButtonContainer = styled.View`
  padding-top: 20px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: 20px;
`;

interface DriverScreenProps {
  children: any;
  navigation: any;
}

export const DriverScreen: FC<DriverScreenProps> = ({ children, navigation }) => {
  const { screen, setScreen, profile, updateNames } = useContext(DriverContext);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const checker = () => {
    if (!profile.isVerified) {
      setScreen(screens.phoneVerification);
      return;
    }
    if (!profile.firstName || !profile.lastName) {
      setScreen(screens.names);
      return;
    }
    if (isObjEmpty(profile.profilePicture)) {
      setScreen(screens.profile);
      return;
    }
  };

  useEffect(() => {
    if (isFocused) {
      checker();
    }
    setLoading(false);
  }, [isFocused]);

  return (
    <ImageContainerProvider>
      <MainContainer navigation={navigation} showAvatar={false} showLogo={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
        >
          <ScrollView>
            <LabelContainer>
              <LabelComponent title2={true}>
                Enter the required information mentioned down below.
              </LabelComponent>
            </LabelContainer>
            {loading && (
              <LoaderContainer>
                {/* <LogoLoadingIndicator width={100} height={100} /> */}
              </LoaderContainer>
            )}
            {!loading && (
              <>
                {screen === screens.phoneVerification && (
                  <DriverPhoneVerificationScreen navigation={navigation} />
                )}
                {screen === screens.names && (
                  <DriverInfoScreen navigation={navigation} />
                )}
                {screen === screens.profile && (
                  <DriverProfileScreen navigation={navigation} />
                )}
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </MainContainer>
      {screen === "names" && (
        <ButtonContainer>
          <ButtonComponent
            title="Next"
            onPress={async () => {
              const updateName = await updateNames();
              if (updateName) {
                if (isObjEmpty(profile.profilePicture))
                  setScreen(screens.profile);
                else navigation.navigate("Home");
              } else {
                Alert.alert(
                  "Alert!",
                  "Failed to update names. Please try again."
                );
              }
            }}
          >
            <LogOutIcon width={24} height={24} />
          </ButtonComponent>
        </ButtonContainer>
      )}
    </ImageContainerProvider>
  );
};
