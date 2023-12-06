/* eslint-disable react/prop-types */
import React, { FC, useContext } from "react";
import { ButtonComponent } from "../button.component";
import styled from "styled-components/native";
import { Platform, KeyboardAvoidingView } from "react-native";
import { MainContainer } from "../main.component";
import CheckSvg from "../../../assets/svgs/check";
import { ErrorContext } from "../../infrastructure/service/error/error.context";
import { ErrorComponent } from "../error.component";

const ScrollViewContainer = styled.ScrollView`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
`;

const ButtonContainer = styled.View`
  padding-top: 20px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
`;

interface PageProps {
  children?: any;
  navigation: any;
  buttonAction?: any;
  buttonLoading?: boolean;
}

export const SecondaryPageView: FC<PageProps> = ({ children, navigation, buttonAction, buttonLoading }) => {
  const { error } = useContext(ErrorContext);
  return (
    <MainContainer navigation={navigation} secondaryPage={true} showSecondaryAvatar={true}>
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
        >
          <ScrollViewContainer>
            {children}
          </ScrollViewContainer>
        </KeyboardAvoidingView>
        <ButtonContainer>
          <ButtonComponent
            title="Save Changes"
            onPress={buttonAction}
            loading={buttonLoading}
          >
            <CheckSvg />
          </ButtonComponent>
        </ButtonContainer>
        {error && (
          <ErrorComponent errorMessage={error} />
        )}
      </>
    </MainContainer>
  );
};
