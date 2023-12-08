import React, { FC, useContext } from "react";
import { LabelComponent } from "../../../components/typography/label.component";
import { Spacer } from "../../../components/utils/spacer.component";
import styled from "styled-components/native";
import {
  ValetContext,
} from "../../../infrastructure/service/valet/context/valet.context";
import { format } from "date-fns";
import { ValetContainer } from "../../../components/valet.component";

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

const InfoContainer = styled.View`
  flex-direction: column;
  width: 100%;
  padding: 20px;
  margin-top: 100px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

interface PendingRequestDetailsProps {
  navigation: any;
}

export const PendingRequestDetails: FC<PendingRequestDetailsProps> = ({
  navigation,
}) => {
  const { selectedPendingConfirmation } = useContext(ValetContext);

  return (
    <ValetContainer navigation={navigation}>
      <InfoContainer>
        <>
          <Spacer variant="top.large" />
          <LabelComponent title={true}>Dealership Info</LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Dealership Name</LabelComponent>
          <Spacer variant="top.small" />
          <LabelComponent title2={true}>
            # {selectedPendingConfirmation.dealership.dealershipName}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Dealership Address</LabelComponent>
          <Spacer variant="top.small" />
          <LabelComponent title2={true}>
            # {selectedPendingConfirmation.dealership.dealershipAddress}
          </LabelComponent>
          <Spacer variant="top.large" />
          <LabelComponent>Request Date</LabelComponent>
          <Spacer variant="top.small" />
          <LabelComponent title2={true}>
            # {format(
              new Date(selectedPendingConfirmation.confirmationDate),
              "dd MMM yyyy, hh:mm a"
            )}
          </LabelComponent>
          <Spacer variant="top.large" />
        </>
      </InfoContainer>
    </ValetContainer>
  );
};
