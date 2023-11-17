import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { ButtonComponent } from "../../../components/button.component";
import { LabelComponent } from "../../../components/typography";
import { Spacer } from "../../../components/utils/spacer.component";
import ProceedSvg from "../../../../assets/svgs/proceed";
import { OverlayComponent } from "../../../components/overlay.component";
import { ConfirmationContext } from "../../../infrastructure/service/confirmation/context/confirmation.context";
import { format } from "date-fns";
import { DriverContext } from "../../../infrastructure/service/driver/context/driver.context";
import { StackNavigationProp } from "@react-navigation/stack";

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

interface ConfirmationScreenProps {
  navigation: StackNavigationProp<any>; // Replace 'any' with the type of your navigation
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  navigation,
}) => {
  const { profile } = useContext(DriverContext);
  const { confirmation, acceptRequest, rejectRequest } =
    useContext(ConfirmationContext);
  const [date, setDate] = useState(new Date());
  const [showDriverConfirmation, setShowDriverConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelConfirmationModal, setShowCancelConfirmationModal] =
    useState(false);
  const [showCancelSuccessModal, setShowCancelSuccessModal] = useState(false);

  const onDriverReject = () => {
    setShowDriverConfirmation(false);
    setShowCancelConfirmationModal(true);
  };

  const onRejectConfirm = async () => {
    setShowCancelConfirmationModal(false);
    if (!rejectRequest) {
      return;
    }
    const { data, error } = await rejectRequest({
      variables: {
        confirmationId: confirmation.confirmationId,
      },
    });
    if (error) {
      console.log("error", error);
      return;
    }
    setShowCancelSuccessModal(true);
  };

  const onDriverConfirm = async () => {
    setShowDriverConfirmation(false);
    if (!acceptRequest) {
      return;
    }
    const { data, error } = await acceptRequest({
      variables: {
        confirmationId: confirmation.confirmationId,
      },
    });
    if (error) {
      console.log("error", error);
      return;
    }
    setShowSuccessModal(true);
  };

  const closeModals = () => {
    setShowSuccessModal(false);
    setShowCancelConfirmationModal(false);
    setShowCancelSuccessModal(false);
    setShowDriverConfirmation(false);
  };

  const onClose = () => {
    navigation.navigate("Home");
    closeModals();
  };

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
          <LabelComponent>Primary Information</LabelComponent>
          <Spacer variant="top.medium" />
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
                    Pending Order
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
          <Spacer variant="top.medium" />
          <LabelComponent>Dealership Name</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #{confirmation.dealership.dealershipName}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Dealership Location</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #
            {confirmation.dealership.dealershipAddress +
              ", " +
              confirmation.dealership.dealershipCity +
              ", " +
              confirmation.dealership.dealershipState +
              ", " +
              confirmation.dealership.dealershipCountry +
              ", " +
              confirmation.dealership.dealershipZipCode}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Requested at</LabelComponent>
          <Spacer variant="top.medium" />
          <LabelComponent title2={true}>
            #{format(new Date(confirmation.confirmationDate), "dd MMM, yyyy")}
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
            Are you sure you want to accept this dealership?
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
            Request accepted successfully.
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
    </>
  );
};
