/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, FC } from "react";
import { useIsFocused } from "@react-navigation/native";
import { MainContainer } from "../../components/main.component";
import { DriverProfileScreen } from "./screens/driver.profile.screen";
import {
  ImageContainerContext,
} from "../../infrastructure/service/driver/context/utils/imageObjectContainer";
import {
  DriverContext,
  screens,
} from "../../infrastructure/service/driver/context/driver.context";
import { DriverPhoneVerificationScreen } from "./screens/driver.phone.verification.screen";
import { DriverInfoScreen } from "./screens/driver.info.screen";
// import LogoLoadingIndicator from "../../../assets/svgs/logoLoadingIndicator";
import styled from "styled-components/native";
import { isObjEmpty } from "../main/screen/main.screen";
import { LabelComponent } from "../../components/typography";
import { ButtonComponent } from "../../components/button.component";
import ProceedSvg from "../../../assets/svgs/proceed";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ErrorContext } from "../../infrastructure/service/error/error.context";
import { AuthContext } from "../../infrastructure/service/authentication/context/auth.context";
import { ErrorComponent } from "../../components/error.component";
import { DriverLicenseScreen } from "./screens/driver.licence.screen";

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

export const DriverScreen: FC<DriverScreenProps> = ({
  children,
  navigation,
}) => {
  const { screen, setScreen, profile, onGetUserData } = useContext(DriverContext);
  const { updateNames, firstName, lastName, addLicense } =
    useContext(AuthContext);
  const { error, setError } = useContext(ErrorContext);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const { backImage, frontImage, expirationDate, licenseNumber, licenseState } = useContext(ImageContainerContext);

  const checker = () => {
    if (!profile.isVerified) {
      setScreen(screens.license);
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
    navigation.navigate("Home");
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      await addLicense!({
        licenseImageBack: backImage as any,
        licenseImageFront: frontImage as any,
        licenseExpiration: expirationDate,
        licenseState: licenseState,
        licenseNumber: licenseNumber,
      });
      console.log("license added")
      await onGetUserData();
      console.log(profile)
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      checker();
    }
    setLoading(false);
  }, [isFocused]);

  return (
    <>
      <MainContainer navigation={navigation} showAvatar={false} showLogo={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%", height: "100%" }}
        >
          <ScrollView
            style={{
              height: "100%",
            }}
          >
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
                {screen === screens.license && (
                  <DriverLicenseScreen navigation={navigation} />
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
              if (!firstName || !lastName) {
                setError("Please enter your names");
                return;
              }
              const updateName = await updateNames!(firstName, lastName);
              if (updateName) {
                checker();
              } else {
                setError("Something went wrong");
              }
            }}
          >
            <ProceedSvg width={24} height={24} />
          </ButtonComponent>
        </ButtonContainer>
      )}
      {screen === "license" && (
        <ButtonContainer>
          <ButtonComponent
            loading={loading}
            title="Next"
            onPress={async () => {
              if (
                frontImage !== null && typeof frontImage !== "undefined" &&
                backImage !== null && typeof backImage !== "undefined"
              ) {
                await handleUpload();
                checker();
              } else {
                setError("Please upload a profile picture.");
                setLoading(false);
              }
            }}
          >
            <ProceedSvg width={23} height={23} />
          </ButtonComponent>
        </ButtonContainer>
      )}

      {error && <ErrorComponent errorMessage={error} />}
    </>
  );
};
