import React, { useState, useContext, useEffect, FC } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import {
  LabelComponent,
  LabelFormComponent,
} from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";
import { ButtonComponent } from "../../../components/button.component";
import CheckSvg from "../../../../assets/svgs/check";
import { MainContainer } from "../../../components/main.component";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ErrorComponent } from "../../../components/error.component";
import { ErrorContext } from "../../../infrastructure/service/error/error.context";
import { SecondaryPageView } from "../../../components/utils/secondary.page.view.component";

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const ButtonContainer = styled.View`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
  height: 70px;
`;

interface SecurityScreenProps {
  navigation: any;
}

export const SecurityScreen: FC<SecurityScreenProps> = ({ navigation }) => {
  const { onChangePassword } = useContext(AuthContext);
  const { error, setError } = useContext(ErrorContext);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [oldPasswordError, setOldPasswordError] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [matchPassword, setMatchPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    setOldPasswordError(false);
    setNewPasswordError(false);
    setConfirmPasswordError(false);
    setMatchPassword(false);
    try {
      if (!oldPassword) {
        setOldPasswordError(true);
      }
      if (!newPassword) {
        setNewPasswordError(true);
      }
      if (!confirmPassword) {
        setConfirmPasswordError(true);
      }

      if (newPassword !== confirmPassword) {
        setConfirmPasswordError(true);
        setMatchPassword(true);
      }

      if (oldPassword && newPassword && confirmPassword) {
        const data = await onChangePassword!(oldPassword, newPassword);
        if (data!) {
          navigation.navigate("Home");
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError!("");
      }, 3000);
    }
  }, [error]);

  return (
    <SecondaryPageView
      navigation={navigation}
      buttonAction={onSubmit}
      buttonLoading={loading}
    >
      <>
        <Spacer variant="top.large" />
        <LabelFormComponent>Old Password</LabelFormComponent>
        <Spacer variant="top.small" />
        <InputComponent
          value={oldPassword}
          onChangeText={(text) => {
            if (!text) {
              setOldPasswordError!(true);
            }
            if (text && oldPasswordError) {
              setOldPasswordError!(false);
            }
            setOldPassword!(text);
          }}
          secure
          isError={oldPasswordError}
        />
        {oldPasswordError && <ErrorText>Password Required</ErrorText>}
        <Spacer variant="top.large" />
        <LabelFormComponent>New Password</LabelFormComponent>
        <Spacer variant="top.small" />
        <InputComponent
          value={newPassword}
          onChangeText={(text) => {
            if (!text) {
              setNewPasswordError!(true);
            }
            if (text && newPasswordError) {
              setNewPasswordError!(false);
            }
            setNewPassword!(text);
          }}
          secure
          isError={newPasswordError}
        />
        {newPasswordError && <ErrorText>Password Required</ErrorText>}
        <Spacer variant="top.medium" />
        <LabelComponent dateTitle={true}>
          Password must be at least 8 characters, contain at least 1 number, 1
          uppercase letter, 1 lowercase letter, and 1 special character
        </LabelComponent>
        <Spacer variant="top.xsmall" />
        <Spacer variant="top.large" />
        <LabelFormComponent>Confirm Password</LabelFormComponent>
        <Spacer variant="top.small" />
        <InputComponent
          value={confirmPassword}
          onChangeText={(text) => {
            if (!text) {
              setConfirmPasswordError!(true);
            }
            if (text && confirmPasswordError) {
              setConfirmPasswordError!(false);
            }
            setConfirmPassword!(text);
          }}
          secure
          isError={confirmPasswordError}
        />
        {confirmPasswordError && (
          <ErrorText>
            {matchPassword ? "Password does not match" : "Password Required"}
          </ErrorText>
        )}
        <Spacer variant="top.large" />
        <Spacer variant="top.large" />
      </>
    </SecondaryPageView>
  );
};
