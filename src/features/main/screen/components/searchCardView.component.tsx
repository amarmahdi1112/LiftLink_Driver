import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { CardComponent } from "../../../../components/utils/card.component";
import ProceedSvg from "../../../../../assets/svgs/proceed";
import GpsSvg from "../../../../../assets/svgs/gps";
// import { ServiceContext } from "../../../infrastructure/service/create_service/context/service.context";
import { Spacer } from "../../../../components/utils/spacer.component";
import { ValetContext } from "../../../../infrastructure/service/valet/context/valet.context";

const CardItemsContainer = styled.Pressable`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  padding-left: 40px;
  height: 100%;
`;

const CardHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 50px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 10px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.title};
`;

const LocationText = styled.Text`
  color: ${(props) => props.theme.colors.darkText.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.body};
`;

const CardBody = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 10px;
`;

const LocationInfoContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

interface SearchCardViewProps {
  data: any;
  title: string;
  address: string;
  country: string;
  city: string;
  key: string;
  onPress?: () => void;
}

export const SearchCardView: React.FC<SearchCardViewProps> = ({ data, title, address, country, city, key, onPress }) => {
  const [selected, setSelected] = useState(false);
  const { selectedDealership, setSelectedDealership } = useContext(ValetContext);

  const selectedDealershipFunc = async (data: any) => {
    if (selectedDealership === data) {
      setSelectedDealership!(null);
      return;
    }
    setSelectedDealership!(data);
  };

  useEffect(() => {
    if (selectedDealership === data) {
      setSelected(selected ? false : true);
    } else {
      setSelected(false);
    }
  }, [selectedDealership]);

  return (
    <>
      <CardComponent
        order={true}
        overrideChildren={true}
        size={{
          width: "100%",
          height: "180px",
        }}
        key={key}
      >
        <CardItemsContainer
          onPress={() => {
            selectedDealershipFunc(data);
            onPress!();
          }}
        >
          <CardHeader>
            <TextContainer>
              <Title>{title}</Title>
            </TextContainer>
            <ProceedSvg width={"50px"} height={"50px"} />
          </CardHeader>
          <CardBody>
            <GpsSvg width={"50px"} height={"50px"} />
            <LocationInfoContainer>
              <Title>{address}</Title>
              <LocationText>
                {country} {city}
              </LocationText>
            </LocationInfoContainer>
          </CardBody>
        </CardItemsContainer>
      </CardComponent>
      <Spacer variant="top.large" />
    </>
  );
};