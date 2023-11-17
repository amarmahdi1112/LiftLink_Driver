import React, { useState, useContext, useEffect, FC } from "react";
import styled from "styled-components/native";
import { Alert, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { AuthContext } from "../../infrastructure/service/authentication/context/auth.context";
import { MainContainer } from "../../components/main.component";
import { SigninScreen } from "./screen/signin.screen";
import { LabelComponent } from "../../components/typography";
import { ButtonComponent } from "../../components/button.component";
import LogOutIcon from "../../../assets/svgs/logout";
import { Spacer } from "../../components/utils/spacer.component";
import { SignupScreen } from "./screen/signup.screen";
import { isObjEmpty } from "../main/screen/main.screen";

const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
`;

const LabelContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.View`
  padding-top: 20px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
`;

interface AuthScreenProps {
  navigation: any;
}

export const AuthScreen: FC<AuthScreenProps> = ({ navigation }) => {
  const {
    user,
    loading,
    error,
    setError,
    isAuthenticated,
    onLogin,
    screen,
    setScreen,
    username,
    password,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
    email,
    emailError,
    setEmailError,
    onSignup,
  } = useContext(AuthContext);
  const [loadingState, setLoadingState] = useState(true);

  const handleLogin = async () => {
    try {
      await onLogin!(username as any, password as any);
    } catch (error) {
      setError!(error);
    }
  };

  useEffect(() => {
    console.log("user from auth screen>>>>>>>>>>>>>", user);
    if (!isObjEmpty(user)) {
      navigation.navigate("MainNavigation");
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      setLoadingState(false);
    }
    if (error) {
      setLoadingState(false);
    }
    if (usernameError || passwordError) {
      setLoadingState(false);
    }
    if (loading) {
      setLoadingState(true);
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      Alert.alert("Alert!", "Failed to login. Please try again.");
      setLoadingState(false);
    }
  }, [error]);

  return (
    <MainContainer navigation={navigation} showLogo={true} showGreetings={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <ScrollView>
          <LabelContainer>
            <LabelComponent title={true}>
              {screen === "signin" ? "Sign In" : "Sign Up"}
            </LabelComponent>
            <Pressable
              onPress={() => {
                setScreen!(screen === "signin" ? "signup" : "signin");
              }}
            >
              <LabelComponent dateTitle={true}>
                {screen === "signin" ? "Sign Up" : "Sign In"}
              </LabelComponent>
            </Pressable>
          </LabelContainer>
          <Spacer variant={"top.large"} />
          {screen === "signin" && <SigninScreen navigation={navigation} />}
          {screen === "signup" && <SignupScreen navigation={navigation} />}
        </ScrollView>
      </KeyboardAvoidingView>
      {screen === "signin" && (
        <ButtonContainer>
          <ButtonComponent
            title="Sign In"
            onPress={async () => {
              if (username === "") setUsernameError!(true);
              if (password === "") setPasswordError!(true);
              if (!usernameError && !passwordError && username && password)
                await handleLogin();
            }}
            loading={loadingState}
          >
            <LogOutIcon width={24} height={24} />
          </ButtonComponent>
        </ButtonContainer>
      )}
      {screen === "signup" && (
        <ButtonContainer>
          <ButtonComponent
            title="Sign Up"
            onPress={async () => {
              if (username === "") setUsernameError!(true);
              if (password === "") setPasswordError!(true);
              if (email === "") setEmailError!(true);
              if (
                !usernameError &&
                !passwordError &&
                !emailError &&
                username &&
                password &&
                email
              )
                await onSignup!(username, password, email);
            }}
          >
            <LogOutIcon width={24} height={24} />
          </ButtonComponent>
        </ButtonContainer>
      )}
    </MainContainer>
  );
};
