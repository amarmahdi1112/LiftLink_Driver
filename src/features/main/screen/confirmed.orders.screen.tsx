import React, { useContext, useState, useEffect, useRef } from "react";
import {
  OrderConfirmationContext,
  OrderConfirmationContextProps,
} from "../../../infrastructure/service/confirmation/context/order.confirmation.context";
import styled from "styled-components/native";
import { CardComponent } from "../../../components/utils/card.component";
import { colors } from "../../../infrastructure/theme/colors";
import { LabelComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import { ValetContext } from "../../../infrastructure/service/valet/context/valet.context";
import { ActivityIndicator } from "react-native-paper";
import { OverlayComponent } from "../../../components/overlay.component";
// import LogoSvg from "../../../../assets/svgs/logoLoadingIndicator";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainContainer } from "../../../components/main.component";

interface HomeProps {
  showAvatar?: boolean;
  ref?: any;
}

const HomeContainer = styled.ScrollView<HomeProps>`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
`;

const Image = styled.Image`
  resize-mode: contain;
  width: 100%;
`;

const NoOrderContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 200px;
`;

const NoOrderImg = styled.Image`
  resize-mode: contain;
`;

interface OrderProps {
  backgroundColor?: string;
}

const OrderContainer = styled(CardComponent)<OrderProps>`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;
`;

interface TopSpacerProps {
  none?: boolean;
}

const TopSpacer = styled.View<TopSpacerProps>`
  margin-top: ${(props: any) => (props.none ? "120" : "20")}px;
`;

const LoadingContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 200px;
`;

interface ConfirmedOrdersScreenProps {
  navigation: StackNavigationProp<any>; // Replace 'any' with the type of your navigation
}

export const ConfirmedOrdersScreen: React.FC<ConfirmedOrdersScreenProps> = ({
  navigation,
}) => {
  const {
    confirmedOrders,
    onGetConfirmedOrders,
    error,
    loading,
    incrementPage,
  }: OrderConfirmationContextProps = useContext(OrderConfirmationContext);
  const { setSelectedValet } = useContext(ValetContext);
  const [isEndReached, setIsEndReached] = useState(false);
  const scrollViewRef = useRef();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onGetConfirmedOrders();
  }, []);

  useEffect(() => {
    if (
      error &&
      typeof error === "string" &&
      error !== "No assigned orders found"
    ) {
      setErrorMessage(error);
      setShowError(true);
    }
  }, [error]);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEnd =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    setIsEndReached(isEnd);
  };

  const handleContentSizeChange = (contentWidth: any, contentHeight: any) => {
    const isEnd =
      (scrollViewRef.current as any).getScrollResponder().getScrollableNode()
        .offsetHeight <= contentHeight;
    setIsEndReached(isEnd);
  };

  const handleEndReached = () => {
    if (isEndReached) {
      onGetConfirmedOrders();
      incrementPage();
    }
  };

  return (
    <>
      <MainContainer
        showAvatar={true}
        secondaryPage={true}
        navigation={navigation}
      >
        <HomeContainer
          ref={scrollViewRef}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          onScrollEndDrag={handleEndReached}
        >
          {confirmedOrders.length === 0 && !loading && (
            <NoOrderContainer>
              <NoOrderImg
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/app_images%2FemptyIndicator.png?alt=media&token=fb225083-eac2-403d-b4fe-00f23823426d",
                }}
                resizeMode="contain"
              />
              <Spacer variant="top.large" />
              <LabelComponent title={true}>No order(s)</LabelComponent>
              <Spacer variant="top.medium" />
              <LabelComponent
                styles={{
                  textAlign: "center",
                  width: "80%",
                }}
              >
                You can view an order in your order list after it has been
                added.
              </LabelComponent>
            </NoOrderContainer>
          )}
          {confirmedOrders.length > 0 && (
            <TopSpacer none={confirmedOrders.length !== 0}>
              <LabelComponent title={true}>Confirmed Order(s)</LabelComponent>
              {confirmedOrders.map((item) => (
                <>
                  <OrderContainer
                    backgroundColor={colors.bg.secondary}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    order={true}
                    data={item}
                    onPress={() => {
                      console.log(item, "item");
                      setSelectedValet(item);
                      navigation.navigate("Valet");
                    }}
                    key={item.assignId}
                  >
                    <Image
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/app_images%2FemptyIndicator.png?alt=media&token=fb225083-eac2-403d-b4fe-00f23823426d",
                      }}
                      resizeMode="contain"
                    />
                  </OrderContainer>
                </>
              ))}
            </TopSpacer>
          )}
          {/* {showError && (
            <OverlayComponent
              onConfirm={closeModals}
              onCancel={onClose}
              btnText={"Return Home"}
            >
              <LabelComponent title2={true}>{errorMessage}</LabelComponent>
            </OverlayComponent>
          )} */}
          {loading && (
            <LoadingContainer>
              {/* <LogoSvg width={100} height={120} /> */}
            </LoadingContainer>
          )}
        </HomeContainer>
      </MainContainer>
    </>
  );
};
