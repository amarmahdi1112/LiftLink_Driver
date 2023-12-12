import React from "react";
import styled from "styled-components/native";
import { LabelComponent } from "../../../components/typography";
import { MainContainer } from "../../../components/main.component";
import { Spacer } from "../../../components/utils/spacer.component";

interface TermsProps {
  navigation: any;
}

const Container = styled.ScrollView`
  flex: 1;
  padding-left: 30px;
  padding-right: 30px;
  text-align: flex-start;
`;

export const TermsScreen: React.FC<TermsProps> = ({ navigation }) => {
  return (
    <MainContainer
      navigation={navigation}
      secondaryPage={true}
      showSecondaryAvatar={true}
    >
      <Spacer variant="top.large" />
      <Container>
        <LabelComponent title2={true}>
          Welcome to LiftLink Driver! By offering valet services through our
          application, you agree to the following terms and conditions:
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          1. Eligibility: To use LiftLink Driver, you must be at least 18 years
          old and possess a valid driver's license.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          2. User Conduct: Agree to use LiftLink Driver solely for lawful and
          professional valet purposes, complying with all applicable laws and
          regulations. Do not engage in any activity that disrupts the operation
          of the application or its valet services.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          3. User Accounts: Create an account with accurate information to
          access LiftLink Driver. Safeguard your account details and take
          responsibility for all activities conducted under your account.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          4. Safety: Uphold safety standards by ensuring you possess a valid
          driver's license, insurance, and a safe vehicle. Follow safety
          protocols and guidelines during valet services.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          5. Vehicle Inspection: Before and after each valet service, conduct a
          thorough inspection of the vehicle, including capturing images from
          four angles (front, right, back, left). Report gas level, mileage, and
          note any defects for transparency.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          6. Liability: LiftLink Driver is not liable for any damages or
          injuries occurring during valet services arranged through the
          application.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          7. Termination: LiftLink reserves the right to terminate any driver's
          account if they violate these terms of service or engage in any
          illegal activity.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          8. Changes to Terms of Service: We may update these terms of service
          at any time without notice by posting revised terms on our website or
          within the LiftLink Driver application.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          By providing valet services through LiftLink Driver, you acknowledge
          that you have read and agree to abide by these terms of service.
        </LabelComponent>
      </Container>
    </MainContainer>
  );
};
