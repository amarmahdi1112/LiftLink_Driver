import React, { useState, useContext, useEffect, FC } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import {
  LabelComponent,
  LabelFormComponent,
} from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";
import { ButtonComponent } from "../../../components/button.component";
import LogOutIcon from "../../../../assets/svgs/logout";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const LabelContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface SignupScreenProps {
  navigation: any;
}

export const SignupScreen: FC<SignupScreenProps> = ({ navigation }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
    email,
    setEmail,
    emailError,
    setEmailError,
  } = useContext(AuthContext);

  return (
    <>
      <Container>
        <Spacer variant="top.large" />
        <LabelFormComponent size={"100%"}>Username</LabelFormComponent>
        <Spacer variant="top.small" />
        <InputComponent
          value={username}
          onChangeText={(text) => {
            if (!text) {
              setUsernameError!(true);
            }
            if (text && usernameError) {
              setUsernameError!(false);
            }
            setUsername!(text);
          }}
          isError={usernameError}
        />
        {usernameError && <ErrorText>Username required</ErrorText>}
        <Spacer variant="top.medium" />
        <LabelFormComponent size={"100%"}>Email</LabelFormComponent>
        <Spacer variant="top.small" />
        <InputComponent
          value={email}
          onChangeText={(text) => {
            if (!text) {
              setEmailError!(true);
            }
            if (text && emailError) {
              setEmailError!(false);
            }
            setEmail!(text);
          }}
          isError={emailError}
        />
        {emailError && <ErrorText>Email required</ErrorText>}
        <Spacer variant="top.medium" />
        <LabelFormComponent>Password</LabelFormComponent>
        <Spacer variant="top.small" />
        <InputComponent
          value={password}
          onChangeText={(text) => {
            if (!text) {
              setPasswordError!(true);
            }
            if (text && passwordError) {
              setPasswordError!(false);
            }
            setPassword!(text);
          }}
          secure
          isError={passwordError}
        />
        {passwordError && <ErrorText>Password Required</ErrorText>}
        <Spacer variant="top.xsmall" />
      </Container>
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
    </>
  );
};
