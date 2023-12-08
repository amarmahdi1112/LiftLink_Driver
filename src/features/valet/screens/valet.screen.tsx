/* eslint-disable react/prop-types */
import React, { FC, useContext, useEffect } from "react";
import { MainContainer } from "../../../components/main.component";
import styled from "styled-components/native";
import {
  ValetContext,
  ValetStatus,
} from "../../../infrastructure/service/valet/context/valet.context";
import { ValetLoanerScreen } from "./valet.loaner.screen";
import { ValetInfoScreen } from "./valet.info.screen";
import { ValetContainer } from "../../../components/valet.component";
import { ImageContainerProvider } from "../utils/imageObjectContainer";
import { isObjEmpty } from "../../main/screen/main.screen";

const InfoContainer = styled.View`
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

interface ValetScreenProps {
  navigation: any;
}

export const ValetScreen: FC<ValetScreenProps> = ({ navigation }) => {
  const { screen, setUserType, startedValet } = useContext(ValetContext);
  useEffect(() => {
    if (!isObjEmpty(startedValet)) {
      if (
        startedValet.valetStatus ===
        ValetStatus.DEALERSHIP_TO_CUSTOMER_COMPLETED.valueOf()
      ) {
        setUserType("customer");
      }
    }
  }, []);
  return (
    <ImageContainerProvider>
      <>
        {screen === "details" && (
          <ValetContainer navigation={navigation}>
            <InfoContainer>
              <ValetInfoScreen navigation={navigation} />
            </InfoContainer>
          </ValetContainer>
        )}
        {screen === "loaner" && (
          <MainContainer
            showAvatar={true}
            secondaryPage={true}
            navigation={navigation}
          >
            <ValetLoanerScreen navigation={navigation} />
          </MainContainer>
        )}
      </>
    </ImageContainerProvider>
  );
};
