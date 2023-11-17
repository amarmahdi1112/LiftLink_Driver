import React, {
  useState,
  useContext,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";
import { OrderConfirmationContext } from "../../../infrastructure/service/confirmation/context/order.confirmation.context";
import { LabelComponent } from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
// import { DriverProfileContext } from "../../../infrastructure/service/driver/context/driver.profile.context";
import { ButtonComponent } from "../../../components/button.component";
import ProceedSvg from "../../../../assets/svgs/proceed";
import { GET_USER_INFO_BY_ID } from "../../../infrastructure/service/query";
import { useLazyQuery } from "@apollo/client";
import { isObjEmpty } from "./main.screen";
import { format } from "date-fns";
import { OverlayComponent } from "../../../components/overlay.component";
import { OrdersContext } from "../../../infrastructure/service/orders/context/orders.context";
// import LogoSvg from "../../../../assets/svgs/logoLoadingIndicator";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";

const Container = styled.ScrollView`
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const InfoContainer = styled.View`
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding-top: 100px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

const PositionedImage = styled.Image`
  position: absolute;
  top: 50px;
  left: 50%;
  width: 80%;
  z-index: 9999;
  margin-left: -32%;
  resize-mode: contain;
`;

const HeaderTitleContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
`;

const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.View`
  width: 54px;
  height: 54px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

const AvatarImage = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 20px;
`;

const UserInfoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100px;
`;

const UserProfileContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Chip = styled.View`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 12px;
  padding-right: 12px;
  dipaly: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background: rgba(99, 163, 117, 0.36);
`;

interface OrderScreenProps {
  navigation: any;
  route: any;
}

export const OrderConfirmationScreen: FC<OrderScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    selectedOrder,
    setSelectedOrder,
    onConfirmOrder,
    onDeclineOrder,
    error,
  } = useContext(OrderConfirmationContext);
  const { profile } = useContext(DriverContext);
  const [getCustomerInfo, { data, error: customerInfoError }] = useLazyQuery(
    GET_USER_INFO_BY_ID,
    {
      variables: {
        userId: selectedOrder.customerId,
      },
    }
  );
  const { orders, setOrders, onRemoveOrder } = useContext(OrdersContext);
  const [customerInfos, setCustomerInfos] = useState({});
  const [customerInfoLoading, setCustomerInfoLoading] = useState(true);
  const [showDriverConfirmation, setShowDriverConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelConfirmationModal, setShowCancelConfirmationModal] =
    useState(false);
  const [showCancelSuccessModal, setShowCancelSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isObjEmpty(selectedOrder)) {
      console.log("selectedOrder", selectedOrder);
      getCustomerInfo();
    }
  }, [selectedOrder]);

  useEffect(() => {
    if (!isObjEmpty(data)) {
      setCustomerInfos(data.getUserInfoById);
      setCustomerInfoLoading(false);
    }
  }, [data]);

  const onDriverConfirm = async () => {
    setShowDriverConfirmation(false);
    setLoading(true);
    await onConfirmOrder(selectedOrder.assignId);
    setLoading(false);
    if (!error) {
      setShowSuccessModal(true);
      onRemoveOrder(selectedOrder.order.orderId);
    }
  };

  const onDriverReject = async () => {
    setShowDriverConfirmation(false);
    setLoading(true);
    await onDeclineOrder(selectedOrder.assignId);
    setLoading(false);
    if (!error) {
      setShowCancelSuccessModal(true);
      onRemoveOrder(selectedOrder.order.orderId);
    }
  };

  const onRejectConfirm = async () => {
    setShowCancelConfirmationModal(false);
    setLoading(true);
    await onDeclineOrder(selectedOrder.assignId);
    setLoading(false);
    if (!error) {
      setShowCancelSuccessModal(true);
      onRemoveOrder(selectedOrder.assignId);
    }
  };

  const onClose = async () => {
    setShowCancelSuccessModal(false);
    onRemoveOrder(selectedOrder.order.orderId);
    if (!error) navigation.navigate("Home");
  };

  const closeModals = () => {
    setShowSuccessModal(false);
    setShowCancelConfirmationModal(false);
    setShowCancelSuccessModal(false);
    setShowDriverConfirmation(false);
    setShowError(false);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      setShowError(true);
    }
  }, [error]);

  return (
    <>
      <Container>
        <HeaderTitleContainer></HeaderTitleContainer>
        <PositionedImage
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/ll-v2-4a68f.appspot.com/o/app_images%2Fgenesis-car-img.png?alt=media&token=2847ee38-d2c1-488f-b10a-8ff14ba3cdce",
          }}
        />
        <InfoContainer>
          <LabelComponent>Your Info</LabelComponent>
          <AvatarContainer>
            <UserProfileContainer>
              <Avatar>
                <AvatarImage
                  source={{
                    uri: profile.profilePicture.pictureLink,
                  }}
                />
              </Avatar>
              <Spacer variant="left.medium" />
              <UserInfoContainer>
                <LabelComponent>
                  {profile.firstName} {profile.lastName}
                </LabelComponent>
                <Spacer variant="top.small" />
                <Chip>
                  <LabelComponent
                    styles={{
                      fontSize: 12,
                    }}
                    title2={true}
                  >
                    {profile.accountType.toUpperCase()}
                  </LabelComponent>
                </Chip>
              </UserInfoContainer>
            </UserProfileContainer>
            <UserInfoContainer>
              <LabelComponent
                styles={{
                  fontSize: 12,
                }}
                title2={true}
              >
                UID 112233
              </LabelComponent>
              <Spacer variant="left.medium" />
              <LabelComponent
                styles={{
                  fontSize: 12,
                }}
                title2={true}
              >
                5 Reviews
              </LabelComponent>
            </UserInfoContainer>
          </AvatarContainer>
          {/* Customer Info */}
          <Spacer variant="top.large" />
          <LabelComponent>Customer Info</LabelComponent>
          {!customerInfoLoading && !isObjEmpty(customerInfos) && (
            <AvatarContainer>
              <UserProfileContainer>
                <Avatar>
                  <AvatarImage
                    source={{
                      uri: (customerInfos as any).profilePicture[0].pictureLink,
                    }}
                  />
                </Avatar>
                <Spacer variant="left.medium" />
                <UserInfoContainer>
                  <LabelComponent>
                    {(customerInfos as any).firstName}{" "}
                    {(customerInfos as any).lastName}
                  </LabelComponent>
                  <Spacer variant="top.small" />
                  <Chip>
                    <LabelComponent
                      styles={{
                        fontSize: 12,
                      }}
                      title2={true}
                    >
                      {(customerInfos as any).accountType.toUpperCase()}
                    </LabelComponent>
                  </Chip>
                </UserInfoContainer>
              </UserProfileContainer>
              <UserInfoContainer>
                <LabelComponent
                  styles={{
                    fontSize: 12,
                  }}
                  title2={true}
                >
                  UID 112233
                </LabelComponent>
                <Spacer variant="left.medium" />
                <LabelComponent
                  styles={{
                    fontSize: 12,
                  }}
                  title2={true}
                >
                  5 Reviews
                </LabelComponent>
              </UserInfoContainer>
            </AvatarContainer>
          )}
          <Spacer variant="top.medium" />
          <LabelComponent>Customer Location</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #{selectedOrder.order.pickupLocation}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Dealership Name</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #{selectedOrder.dealership.dealershipName}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Dealership Location</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #
            {selectedOrder.dealership.dealershipAddress +
              ", " +
              selectedOrder.dealership.dealershipCity +
              ", " +
              selectedOrder.dealership.dealershipState +
              ", " +
              selectedOrder.dealership.dealershipCountry +
              ", " +
              selectedOrder.dealership.dealershipZipCode}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Requested Date</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #
            {format(
              new Date(selectedOrder.order.orderDeliveryDate),
              "dd MMM, yyyy"
            )}
          </LabelComponent>
          <Spacer variant="top.large" />
          <ButtonComponent
            title="Next"
            onPress={() => setShowDriverConfirmation(true)}
          >
            <ProceedSvg isIcon={true} width={24} height={24} />
          </ButtonComponent>
        </InfoContainer>
      </Container>
      {showDriverConfirmation && (
        <OverlayComponent onCancel={closeModals} onConfirm={onDriverConfirm}>
          <LabelComponent title={true}>Confirm</LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent title2={true}>
            Are you sure you want to accept this order?
          </LabelComponent>
          <Spacer variant="top.large" />
          <ButtonComponent
            title="Reject"
            background={"#FF0000"}
            onPress={onDriverReject}
          >
            <ProceedSvg isIcon={true} width={24} height={24} />
          </ButtonComponent>
        </OverlayComponent>
      )}
      {showSuccessModal && (
        <OverlayComponent
          onConfirm={onClose}
          onCancel={closeModals}
          btnText={"Finish"}
        >
          <LabelComponent title={true}>Success!</LabelComponent>
          <LabelComponent title2={true}>
            Order accepted successfully.
          </LabelComponent>
        </OverlayComponent>
      )}
      {showCancelConfirmationModal && (
        <OverlayComponent
          onConfirm={onRejectConfirm}
          onCancel={closeModals}
          btnText={"I'm sure"}
        >
          <LabelComponent title={true}>Alert!</LabelComponent>
          <LabelComponent title2={true}>
            Are you sure you want to cancel this request?
          </LabelComponent>
        </OverlayComponent>
      )}
      {showCancelSuccessModal && (
        <OverlayComponent
          onConfirm={onClose}
          onCancel={onClose}
          btnText={"Finish"}
        >
          <LabelComponent title={true}>Success!</LabelComponent>
          <LabelComponent title2={true}>
            Request canceled successfully.
          </LabelComponent>
        </OverlayComponent>
      )}
      {showError && (
        <OverlayComponent
          onConfirm={closeModals}
          onCancel={onClose}
          btnText={"Return Home"}
        >
          <LabelComponent title={true}>Error!</LabelComponent>
          <LabelComponent title2={true}>{errorMessage}</LabelComponent>
        </OverlayComponent>
      )}
      {loading && (
        <OverlayComponent
          override={true}
          onCancel={onClose}
          onConfirm={onClose}
        >
          {/* <LogoSvg width={100} height={120} /> */}
          <Spacer variant="top.large" />
          <ActivityIndicator animating={true} color={"#FFFFFF"} />
        </OverlayComponent>
      )}
    </>
  );
};
