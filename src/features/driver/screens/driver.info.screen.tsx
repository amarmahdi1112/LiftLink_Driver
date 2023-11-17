import React, { FC, useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { LabelFormComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";

const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 60px;
`;

const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.ui.error};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

interface DriverInfoScreenProps {
  navigation: any;
}

export const DriverInfoScreen: FC<DriverInfoScreenProps> = ({ navigation }) => {
  const {
    firstName,
    setfirstName,
    firstNameError,
    setfirstNameError,
    lastName,
    setlastName,
    lastNameError,
    setlastNameError,
  } = useContext(AuthContext);

  return (
    <>
      <Container>
        <Spacer variant="top.large" />
        <LabelFormComponent size={"100%"}>First Name</LabelFormComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={firstName}
          onChangeText={(text: any) => {
            if (text.length === 0) {
              setfirstNameError!(true);
            }
            if (text.length > 0 && firstNameError) {
              setfirstNameError!(false);
            }
            setfirstName!(text);
          }}
          isError={firstNameError}
        />
        {firstNameError && <ErrorText>First name required</ErrorText>}
        <Spacer variant="top.large" />
        <LabelFormComponent>Last Name</LabelFormComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={lastName}
          onChangeText={(text) => {
            if (text.length === 0) {
              setlastNameError!(true);
            }
            if (text.length > 0 && lastNameError) {
              setlastNameError!(false);
            }
            setlastName!(text);
          }}
          isError={lastNameError}
        />
        {lastNameError && <ErrorText>Last name required</ErrorText>}
      </Container>
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
    </>
  );
};
