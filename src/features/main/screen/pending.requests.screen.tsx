import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components/native";
import { InputComponent } from "../../../components/input.component";
import { isObjEmpty } from "../../main/screen/main.screen";
import debounce from "lodash/debounce";
import { SearchCardView } from "./components/searchCardView.component";
import { OverlayComponent } from "../../../components/overlay.component";
import { LabelComponent } from "../../../components/typography";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Spacer } from "../../../components/utils/spacer.component";
import { ValetContext } from "../../../infrastructure/service/valet/context/valet.context";
import { ButtonComponent } from "../../../components/button.component";
import { theme } from "../../../infrastructure/theme";
import BackSvg from "../../../../assets/svgs/back";
import EyeSvg from "../../../../assets/svgs/eye";
import { SecondaryPageView } from "../../../components/utils/secondary.page.view.component";
import RedirectIcon from "../../../../assets/svgs/redirect";
import { format } from "date-fns";
import { ErrorContext } from "../../../infrastructure/service/error/error.context";
import { ErrorComponent } from "../../../components/error.component";

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CardsContainer = styled.ScrollView`
  flex-direction: column;
  position: absolute;
  left: 0px;
  padding: 20px;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
`;

const SearchBarContainer = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: 20px;
  position: absolute;
  top: 0px;
  z-index: 1;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.title};
`;

const ButtonContainer = styled.View`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
  z-index: 2;
  background-color: transparent;
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  bottom: 0px;
`;

const ButtonItemContainer = styled.View`
  width: 49%;
`;

const RequestContainer = styled.View<any>`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: ${"300"}px;
`;

const ListCard = styled.View`
  width: 100%;
  height: 100px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  background-color: #fff;
  shadow-color: #2e2c2f;
  shadow-offset: 2px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 20px;
  elevation: 5;
`;

const ListContainer = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const ListComponent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CarDescription = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

interface PendingRequestsScreenProps {
  navigation: any;
}

export const PendingRequestsScreen: React.FC<PendingRequestsScreenProps> = ({
  navigation,
}) => {
  const {
    onGetPendingConfirmation,
    pendingConfirmations,
    setSelectedPendingConfirmation,
  } = useContext(ValetContext);
  const [confirmation, setConfirmation] = useState<any>();
  const today = new Date();
  const { error } = useContext(ErrorContext);

  useEffect(() => {
    const getdata = async () => {
      await onGetPendingConfirmation();
    };
    getdata();
  }, []);

  useEffect(() => {
    if (error) {
      console.log("error", error);
    }
  }, [error]);

  const isSameDay = (d1: any, d2: any) =>
    format(d1, "yyyy-MM-dd") === format(d2, "yyyy-MM-dd");

  return (
    <SecondaryPageView navigation={navigation} showActionButton={false}>
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
      <LabelComponent>Pending Requests</LabelComponent>
      <Spacer variant="top.large" />
      {pendingConfirmations.map((item: any) => {
        return (
          <ListContainer
            key={item.confirmationId}
            onPress={() => {
              setSelectedPendingConfirmation!(item);
              navigation.navigate("PendingRequestDetails");
            }}
          >
            <ListCard key={item.confirmationId}>
              <ListComponent key={item.confirmationId}>
                <CarDescription key={item.confirmationId}>
                  <LabelComponent key={item.confirmationId}>
                    {item.dealership.dealershipName}
                  </LabelComponent>
                  <LabelComponent title2={true} key={"item.confirmationId"}>
                    {isSameDay(new Date(item.confirmationDate), today)
                      ? "Today"
                      : format(new Date(item.confirmationDate), "MMM dd, yyyy")}
                  </LabelComponent>
                </CarDescription>
                <RedirectIcon width={24} height={24} />
              </ListComponent>
            </ListCard>
          </ListContainer>
        );
      })}
      {error && <ErrorComponent errorMessage={error} />}
    </SecondaryPageView>
  );
};
