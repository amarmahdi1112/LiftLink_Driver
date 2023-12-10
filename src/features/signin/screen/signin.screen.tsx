import React, { FC, useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import {
  LabelComponent,
  LabelFormComponent,
} from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { InputComponent } from "../../../components/input.component";
import { ConfirmationContext } from "../../../infrastructure/service/confirmation/context/confirmation.context";
import { OrdersContext } from "../../../infrastructure/service/orders/context/orders.context";
import { ValetContext } from "../../../infrastructure/service/valet/context/valet.context";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

interface SigninScreenProps {
  navigation: any;
}

export const SigninScreen: FC<SigninScreenProps> = ({ navigation }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
    resetAll,
    logOutCalled,
    setLogOutCalled,
    isAuthenticated,
  } = useContext(AuthContext);
  const { resetAllConfirmation } = useContext(ConfirmationContext);
  const { resetAllOrders } = useContext(OrdersContext);
  const { resetAllValet } = useContext(ValetContext);
  const { resetAllDriver } = useContext(DriverContext);
  const isFocused = navigation.isFocused();

  React.useEffect(() => {
    if (logOutCalled) {
      const logout = async () => {
        await AsyncStorage.clear();
        resetAll!();
        resetAllConfirmation!();
        resetAllOrders!();
        resetAllValet!();
        resetAllDriver!();
        setLogOutCalled!(false);
      };
      logout();
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Main");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Container>
        <Spacer variant="top.large" />
        <LabelComponent>Username</LabelComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={username}
          onChangeText={(text) => {
            if (text.length === 0) {
              setUsernameError!(true);
            }
            if (text.length > 0 && usernameError) {
              setUsernameError!(false);
            }
            setUsername!(text);
          }}
          isError={usernameError}
        />
        {usernameError && <ErrorText>Username required</ErrorText>}
        <Spacer variant="top.small" />
        <Spacer variant="top.small" />
        <LabelComponent>Password</LabelComponent>
        <Spacer variant="top.xsmall" />
        <InputComponent
          value={password}
          onChangeText={(text) => {
            if (text.length === 0) {
              setPasswordError!(true);
            }
            if (text.length > 0 && passwordError) {
              setPasswordError!(false);
            }
            setPassword!(text);
          }}
          secure
          isError={passwordError}
        />
        {passwordError && <ErrorText>Password Required</ErrorText>}
        <Spacer variant="top.xsmall" />
        <LabelFormComponent size="small">Forgot Password?</LabelFormComponent>
        <Spacer variant="top.large" />
        <Spacer variant="top.large" />
      </Container>
    </>
  );
};
