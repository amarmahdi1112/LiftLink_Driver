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
    <MainContainer navigation={navigation} secondaryPage={true} showSecondaryAvatar={true}>
      <Spacer variant="top.large" />
      <Container>
        <LabelComponent title2={true}>
          Welcome to Liftlink application! By using our services, you agree to
          the following terms and conditions:
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          1. Eligibility: You must be at least 18 years old and possess a valid
          driver's license to use Liftlink application as a driver. Passengers
          must be at least 16 years old.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          2. User Conduct: You agree to use Liftlink application only for lawful
          purposes and in compliance with all applicable laws and regulations.
          You will not engage in any activity that interferes with or disrupts
          the operation of the application or the services provided by it.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          3. User Accounts: To use Liftlink application, you must create an
          account by providing accurate and complete information about yourself.
          You are responsible for maintaining the confidentiality of your
          account information, including your password, and for all activities
          that occur under your account.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          4. Payment: Passengers will be charged based on the distance traveled
          and other factors such as time of day, demand, etc.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          5. Safety: We take safety seriously and expect all users to do the
          same. Drivers must have a valid driver's license, insurance, and a
          safe vehicle. Passengers should always wear seat belts and behave
          appropriately during rides.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          6. Liability: We are not responsible for any damages or injuries that
          occur during rides arranged through Liftlink application.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          7. Termination: We reserve the right to terminate any user's account
          at any time if they violate these terms of service or engage in any
          illegal activity.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          8. Changes to Terms of Service: We may modify these terms of service
          at any time without notice by posting updated terms on our website or
          within the Liftlink application itself.
        </LabelComponent>
        <Spacer variant="top.large" />
        <LabelComponent title2={true}>
          By using Liftlink application, you acknowledge that you have read
          these terms of service and agree to abide by them while using our
          services.
        </LabelComponent>
        <Spacer variant="top.large" />
      </Container>
    </MainContainer>
  );
};
