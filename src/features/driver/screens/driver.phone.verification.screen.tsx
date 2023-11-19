import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { LabelFormComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";
// import {
//   FirebaseRecaptchaBanner,
//   FirebaseRecaptchaVerifier,
//   FirebaseRecaptcha,
//   FirebaseRecaptchaVerifierModal,
// } from "expo-firebase-recaptcha";
import { fbApp, fbAuth, fbOtp } from "../../../../firebase-config";
// import auth from "@react-native-firebase/auth"
import { ButtonComponent } from "../../../components/button.component";
import RedirectIcon from "../../../../assets/svgs/redirect";
import {
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
// import { OverlayComponent } from "../../../components/overlay.component";
import { Keyboard } from "react-native";
import { DriverContext, screens } from "../../../infrastructure/service/driver/context/driver.context";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const ButtonContainer = styled.View`
  margin-top: 300px;
  margin-bottom: 20px;
`;

const PositionedButtonComponent = styled(ButtonComponent)`
  position: absolute;
  bottom: 250px;
  width: 100%;
`;

interface DriverPhoneVerificationScreenProps {
  navigation: any;
}

export const DriverPhoneVerificationScreen: FC<
  DriverPhoneVerificationScreenProps
> = ({ navigation }) => {
  const { phone, setPhone, phoneError, setPhoneError, updatePhoneMutation } =
    useContext(AuthContext);
  const { setScreen } = useContext(DriverContext);
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [message, showMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showCodeVerification, setShowCodeVerification] = useState(false);

  useEffect(() => {
    if (verificationId) {
      setShowCodeVerification(true);
    }
  }, [verificationId]);

  return (
    <>
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={fbApp.options}
        title="Prove you are human!"
        cancelLabel="Close"
        // containerStyle={{
        //   width: "100%",
        //   height: "100%",
        //   marginTop: "70%",
        // }}
      /> */}
      {!showCodeVerification && (
        <Container>
          <Spacer variant="top.large" />
          <LabelFormComponent size={"100%"}>Phone</LabelFormComponent>
          <Spacer variant="top.xsmall" />
          <InputComponent
            value={phone}
            onChangeText={(text) => {
              if (text.length === 0) {
                setPhoneError!(true);
              }
              if (text.length > 0 && phoneError) {
                setPhoneError!(false);
              }
              setPhone!(text);
            }}
            isError={phoneError}
            placeholder="+1 999 999 9999"
            autofocus
            autocompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
          {phoneError && <ErrorText>Phone required</ErrorText>}
          {/* {message ? (
            <ErrorText>{message}</ErrorText>
          ) : (
            <FirebaseRecaptchaBanner />
          )} */}
          <Spacer variant="top.small" />
          <Spacer variant="top.small" />
          <ButtonContainer>
            <PositionedButtonComponent
              title="Next"
              onPress={async () => {
                Keyboard.dismiss();
                await fbOtp(phone as any, recaptchaVerifier).then((verificationId) => {
                  setVerificationId(verificationId as any);
                });
              }}
              icon={<RedirectIcon width={24} height={24} />}
            />
          </ButtonContainer>
        </Container>
      )}
      {showCodeVerification && (
        <Container>
          <Spacer variant="top.large" />
          <LabelFormComponent size={"100%"}>Code</LabelFormComponent>
          <Spacer variant="top.xsmall" />
          <InputComponent
            value={verificationCode}
            onChangeText={(text) => {
              setVerificationCode(text);
            }}
            placeholder="123456"
            autofocus
            autocompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
          {/* {message ? (
            <ErrorText>{message}</ErrorText>
          ) : (
            <FirebaseRecaptchaBanner />
          )} */}
          <Spacer variant="top.small" />
          <Spacer variant="top.small" />
          <ButtonContainer>
            <PositionedButtonComponent
              title="Next"
              onPress={async () => {
                Keyboard.dismiss();
                const credential = PhoneAuthProvider.credential(
                  verificationId as any,
                  verificationCode
                );
                await signInWithCredential(fbAuth, credential)
                  .then(async (result: any) => {
                    await updatePhoneMutation!(phone as any);
                    setScreen(screens.names);
                  })
                  .catch((error: any) => {
                    showMessage(error.message);
                  });
              }}
              icon={<RedirectIcon width={24} height={24} />}
            />
          </ButtonContainer>
        </Container>
      )}
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
    </>
  );
};
