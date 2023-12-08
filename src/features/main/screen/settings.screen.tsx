import React, { useState, useEffect, useContext } from "react";
import { MainContainer } from "../../../components/main.component";
import { AvatarComponent } from "../../../components/utils/avatar.component";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";
import { Spacer } from "../../../components/utils/spacer.component";
import styled from "styled-components/native";
import LockSvg from "../../../../assets/svgs/lock";
import { LabelComponent } from "../../../components/typography";
import ProceedSvg from "../../../../assets/svgs/proceed";
import HistorySvg from "../../../../assets/svgs/history";
import TermsSvg from "../../../../assets/svgs/terms";
import LogoutSvg from "../../../../assets/svgs/logout";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfirmationContext } from "../../../infrastructure/service/confirmation/context/confirmation.context";
import { AuthContext } from "../../../infrastructure/service/authentication/context/auth.context";
import { OrdersContext } from "../../../infrastructure/service/orders/context/orders.context";
import { ValetContext } from "../../../infrastructure/service/valet/context/valet.context";

interface SettingsProps {
  navigation: any;
}

const Container = styled.ScrollView`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
`;

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 30px;
`;

const ListLabelContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.ui.disabled};
`;

export const SettingsScreen: React.FC<SettingsProps> = ({ navigation }) => {
  const { profile } = useContext(DriverContext);
  const { onLogout } = useContext(AuthContext);

  return (
    <MainContainer navigation={navigation} secondaryPage={true} showSecondaryAvatar={true}>
      <Spacer variant="top.large" />
      <Container>
        <Pressable
          onPress={() => {
            navigation.navigate("ProfileSettings");
          }}
        >
          <AvatarComponent
            imageUrl={profile?.profilePicture[0].pictureLink}
            height={72}
            width={72}
            showGreetings={true}
            fullName={`${profile?.firstName} ${profile?.lastName}`}
            fullNameStyle={{
              color: "black",
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
            }}
            greetingMessage="Your Profile"
            greetingStyle={{
              color: "black",
              fontSize: 16,
              textAlign: "center",
            }}
            spacer={true}
          />
        </Pressable>
        <Spacer variant="top.large" />
        <Spacer variant="top.large" />
        <ListItem>
          <ListLabelContainer>
            <HistorySvg />
            <LabelComponent>History</LabelComponent>
          </ListLabelContainer>
          <ProceedSvg color={"#1C274C"} />
        </ListItem>
        <Spacer variant="top.large" />
        <Spacer variant="top.small" />
        <ListItem 
          onPress={() => {
            navigation.navigate("Security");
          }}
        >
          <ListLabelContainer>
            <LockSvg />
            <LabelComponent>Security</LabelComponent>
          </ListLabelContainer>
          <ProceedSvg color={"#1C274C"} />
        </ListItem>
        <Spacer variant="top.large" />
        <Spacer variant="top.small" />
        <ListItem
          onPress={() => {
            navigation.navigate("Terms");
          }}
        >
          <ListLabelContainer>
            <TermsSvg />
            <LabelComponent>Terms of Service</LabelComponent>
          </ListLabelContainer>
        </ListItem>
        <Spacer variant="top.large" />
        <Spacer variant="top.small" />
        <ListItem
          onPress={async () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Auth" }],
            });
          }}
        >
          <ListLabelContainer>
            <LogoutSvg />
            <LabelComponent>Logout</LabelComponent>
          </ListLabelContainer>
        </ListItem>
      </Container>
    </MainContainer>
  );
};
