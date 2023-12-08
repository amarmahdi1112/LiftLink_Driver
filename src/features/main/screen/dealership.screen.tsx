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
import { ErrorComponent } from "../../../components/error.component";
import { ErrorContext } from "../../../infrastructure/service/error/error.context";

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

interface DealershipScreenProps {
  navigation: any;
}

export const DealershipScreen: React.FC<DealershipScreenProps> = ({
  navigation,
}) => {
  const [dealershipSelected, setdealershipSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dealerships, setDealerships] = useState<any[]>([]);
  const [dselectd, setDselected] = useState<any>({});
  const { error } = useContext(ErrorContext);
  const {
    onSearchDealership,
    searchResults,
    onRequestMembership,
    selectedDealership,
    setSelectedDealership,
  } = useContext(ValetContext);

  useEffect(() => {
    if (!isObjEmpty(selectedDealership)) {
      setDselected(selectedDealership);
      setdealershipSelected(true);
    }
  }, [selectedDealership]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      debouncedFindDealerships(searchTerm);
    }
  }, [searchTerm]);

  const debouncedFindDealerships = useCallback(
    debounce(async (searchTerm: any) => {
      await onSearchDealership(searchTerm);
    }, 500),
    []
  );

  useEffect(() => {
    if (!isObjEmpty(searchResults)) {
      setDealerships(searchResults);
    }
  }, [searchResults]);

  const onCancel = () => {
    setSelectedDealership!(null);
    setDselected({});
    setdealershipSelected(false);
  };

  const onConfirm = async () => {
    await onRequestMembership(dselectd.dealershipName);
    onCancel();
  };

  return (
    <Container>
      <SearchBarContainer>
        <InputComponent
          placeholder={"Search..."}
          onChangeText={async (text) => {
            console.log(text);
            setSearchTerm(text);
          }}
        />
      </SearchBarContainer>
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
      <Spacer variant="top.large" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <CardsContainer horizontal={false}>
          {dealerships.map((item) => (
            <>
              <SearchCardView
                title={item.dealershipName}
                address={item.dealershipAddress}
                city={item.dealershipCity}
                country={item.dealershipCountry}
                data={item}
                key={item.dealershipId}
                onPress={() => {
                  console.log(item);
                }}
              />
            </>
          ))}
          <Spacer variant="top.large" />
          <Spacer variant="top.large" />
          <Spacer variant="top.large" />
        </CardsContainer>
      </KeyboardAvoidingView>
      <ButtonContainer>
        <ButtonItemContainer>
          <ButtonComponent
            title="Back"
            background={theme.colors.ui.secondary}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <BackSvg width={24} height={24} />
          </ButtonComponent>
        </ButtonItemContainer>
        <ButtonItemContainer>
          <ButtonComponent
            title="Requests"
            background={theme.colors.ui.secondary}
            onPress={() => {
              navigation.navigate("PendingRequests");
            }}
          >
            <EyeSvg color={theme.colors.bg.primary} width={24} height={24} />
          </ButtonComponent>
        </ButtonItemContainer>
      </ButtonContainer>
      {dealershipSelected && (
        <OverlayComponent onCancel={onCancel} onConfirm={onConfirm}>
          <LabelComponent title={true}>Selected Dealership</LabelComponent>
          <LabelComponent title2={true}>
            {dselectd.dealershipName}
          </LabelComponent>
          <LabelComponent title2={true}>
            {dselectd.dealershipAddress}
          </LabelComponent>
          <LabelComponent title2={true}>
            {dselectd.dealershipCity}
          </LabelComponent>
          <LabelComponent title2={true}>
            {dselectd.dealershipCountry}
          </LabelComponent>
        </OverlayComponent>
      )}
      {error && <ErrorComponent errorMessage={error} />}
    </Container>
  );
};
